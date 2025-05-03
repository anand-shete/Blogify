const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const { generateUserToken, validateToken } = require("../services/auth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const passport = require("passport");
const { putObjectForProfile } = require("../config/aws");
const { setJWT } = require("../utils/setJWT");

router.post("/check", async (req, res) => {
  const { email } = req.body;

  const user = await User.countDocuments({ email }).lean();
  if (user) return res.status(200).json(true);

  return res.status(200).json(false);
});

router.get("/generateSignedUrl", async (req, res) => {
  try {
    const url = await putObjectForProfile();
    if (!url) return res.status(500).json({ message: "Error generating Signed URL" });
    return res.status(201).json({ message: "Generated Pre-signed URL", url });
  } catch (error) {
    return res.status(500).json({ message: "Error generating Signed URL" });
  }
});

router.post("/signup", async (req, res) => {
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
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).status({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account not found" });

    if (user.authProvider === "google") return res.status(403);
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = generateUserToken(user);
    if (!token) {
      return res.status(400).json({ message: "Error generating Token" });
    }

    if (process.env.MODE === "production") {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60,
          path: "/",
          sameSite: "lax",
        })
        .json({ message: "User Login succcess" });
    } else {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
          path: "/",
        })
        .json({ message: "User Login success" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login error" });
  }
});

router.get("/logout", (req, res) => {
  return res.status(200).clearCookie("token").end();
});

router.get("/auth/status", async (req, res) => {
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
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback/",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/user/signup`,
  }),
  async (req, res) => {
    console.log("req", req);

    try {
      const { name, email, picture } = req.user._json;

      const user = await User.countDocuments({ email });
      const token = generateUserToken({ name, email, profileImageURL: picture, role: "user" });
      // If first time login, create User and store in database
      if (!user) {
        await User.create({
          name,
          email,
          profileImageURL: picture,
          authProvider: google,
        });
        await setJWT(res, token);
        return res.redirect(`${process.env.FRONTEND_URL}/user/dashboard`);
      }
      // else set cookie and normal Login
      await setJWT(res, token);
      return res.redirect(`${process.env.FRONTEND_URL}/user/dashboard`);
    } catch (error) {
      console.log("error", error);
      return res.redirect(`${process.env.FRONTEND_URL}/user/login?error`);
    }
  }
);

module.exports = router;
