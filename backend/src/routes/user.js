const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { generateUserToken, validateToken } = require("../services/auth");
const { s3Client } = require("../config/aws");
const { verify } = require("jsonwebtoken");

// only multer can parse the incoming multipart/form-data
const profileImageUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filename = `uploads/users/${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

router.get("/", (req, res) => {
  return res.status(200).json({ message: "User Route health check passed" });
});

router.get("/simple-auth", async (req, res) => {
  const token = req.cookies?.["token"];
  if (!token) return res.status(200).end();

  const user = validateToken(token);
  if (user) return res.status(200).json(user);
});

router.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies?.["token"];
    if (!token) return res.status(404).json({ message: "Login First" });

    const user = validateToken(token);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Authenticating User" });
  }
});

router.post(
  "/signup",
  profileImageUpload.single("profileImageURL"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are requried" });
      }

      const check = await User.countDocuments({ email }).lean();
      if (check) {
        return res.status(409).json({ message: "Account already exists" });
      }

      await User.create({ name, email, password });
      return res.status(201).json({ message: "Account created succcessfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error creating Account" });
    }
  }
);

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

module.exports = router;
