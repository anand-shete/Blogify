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
const {
  loginLimiter,
  signupLimiter,
  checkEmailLimiter,
  signedUrlRateLimiter,
} = require("../middlewares/rateLimiters");

const router = Router();

router.post("/signed-url", signedUrlRateLimiter, generateSignedUrl);
router.post("/signup", signupLimiter, signupUser);
router.post("/login", loginLimiter, loginUser);
router.get("/logout", logout);
router.post("/auth/check-email", checkEmailLimiter, checkEmailExists);
router.get("/auth/status", authStatus);
router.get("/auth/google", googleOAuth);
router.get("/auth/google/callback", googleOAuthCallback);
router.get("/:userId/blogs", getAllBlogsOfUser);

module.exports = router;
