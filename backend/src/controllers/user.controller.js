const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { setJWT } = require("../utils/setJWT");
const { putObjectForProfile } = require("../config/aws");
const { generateUserToken, validateToken } = require("../services/auth");

const checkAuth = async (req, res) => {
  const { email } = req.body;

  const user = await User.countDocuments({ email }).lean();
  if (user) return res.status(200).json(true);

  return res.status(200).json(false);
};

const generateSignedUrl = async (req, res) => {
  try {
    const url = await putObjectForProfile();
    if (!url) return res.status(500).json({ message: "Error generating Signed URL" });
    return res.status(201).json({ message: "Generated Pre-signed URL", url });
  } catch (error) {
    return res.status(500).json({ message: "Error generating Signed URL" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImageURL } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
    }

    const check = await User.countDocuments({ email }).lean();
    if (check) {
      return res.status(409).json({ message: "Account already exists" });
    }

    await User.create({ name, email, password, profileImageURL });
    return res.status(201).json({ message: "Account created succcessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating Account" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).status({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account not found" });

    if (user.authProvider === "google") {
      return res.status(403).json({
        message: "We found a Google account linked to this email. Please use Google sign-in.",
      });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = generateUserToken(user);
    if (!token) {
      return res.status(400).json({ message: "Error generating Token" });
    }
    await setJWT(res, token);

    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login error" });
  }
};

const logout = (req, res) => {
  return res.status(200).clearCookie("token").json({ message: "Logged out successfully" });
};

const authStatus = async (req, res) => {
  try {
    const token = req.cookies?.["token"];
    if (!token) return res.status(401).json({ message: "Login First" });

    const user = validateToken(token);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Authenticating User" });
  }
};

// client requests to backend
const googleOAuth = (req, res) => {
  try {
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid profile email",
      access_type: "offline", // Required for refresh token
      prompt: "consent", // Always ask to re-authenticate (dev only)
    };

    const stringParams = new URLSearchParams(params).toString();

    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringParams}`);
  } catch (error) {
    console.log("Error generating OAuth", error);
    return res.status(500).json({ message: "Error generating Google Auth URl" });
  }
};

const googleOAuthCallback = async (req, res) => {
  const code = req.query?.code;
  const error = req.query?.error;
  if (error) {
    return res.redirect(`${process.env.FRONTEND_URL}/user/login?OAuthError`);
  }

  // exchange code for tokens
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  if (!response.data.id_token) {
    return res.redirect(`${process.env.FRONTEND_URL}/user/login?OAuthError`);
  }
  const { id_token, access_token } = response.data;

  // Decode the id_token (JWT) to get user info
  const googleUser = jwt.decode(id_token);
  const { name, email, picture } = googleUser;

  // check if user exists in database and create if doesn't
  const check = await User.countDocuments({ name, email, authProvider: "google" }).lean();

  if (!check) {
    await User.create({
      name,
      email,
      profileImageURL: picture,
      role: "user",
      authProvider: "google",
    });
  }

  const user = await User.findOne({ name, email, authProvider: "google" }).lean();

  // create your own auth tokens for login
  const token = generateUserToken(user);
  if (!token) {
    return res.status(500).json({ message: "Error generaing token" });
  }

  await setJWT(res, token);

  // redirect to client instead of sending json response
  return res.status(302).redirect(`${process.env.FRONTEND_URL}/user/dashboard`);
};

module.exports = {
  checkAuth,
  generateSignedUrl,
  signup,
  signin,
  logout,
  authStatus,
  googleOAuth,
  googleOAuthCallback,
};
