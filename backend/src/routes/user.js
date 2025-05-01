const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const { generateUserToken, validateToken } = require("../services/auth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const passport = require("passport");
const { putObjectForProfile } = require("../config/aws");

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
        .json({ message: "User Sign In succcess" });
    } else {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
          path: "/",
        })
        .json({ message: "User Sign In success" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login error" });
  }
});

router.get("/logout", (req, res) => {
  return res.status(200).clearCookie("token").end();
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

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

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    try {
      console.log("user", req.user);
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "User Login failed" });
    }
  }
);

module.exports = router;
