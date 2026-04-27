const { Router } = require("express");
const {
  checkEmailExists,
  generateSignedUrl,
  signupUser,
  loginUser,
  logout,
  authStatus,
  googleOAuth,
  googleOAuthCallback,
  getAllBlogsOfUser,
} = require("../controllers/user.controller");
const { loginLimiter } = require("../middlewares/rateLimiters");

const router = Router();

router.post("/signed-url", generateSignedUrl); // y
router.post("/signup", signupUser); //y
router.post("/login", loginLimiter, loginUser); //y
router.get("/logout", logout);
router.post("/auth/check-email", checkEmailExists); //y
router.get("/auth/status", authStatus);
router.get("/auth/google", googleOAuth);
router.get("/auth/google/callback", googleOAuthCallback);
router.get("/:userId/blogs", getAllBlogsOfUser);

module.exports = router;
