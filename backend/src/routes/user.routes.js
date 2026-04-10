const { Router } = require("express");
const {
  checkAuth,
  generateSignedUrl,
  signup,
  signin,
  logout,
  authStatus,
  googleOAuth,
  googleOAuthCallback,
  getAllBlogsOfUser
} = require("../controllers/user.controller");

const router = Router();

router.post("/check", checkAuth);
router.post("/generate-signed-url", generateSignedUrl);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/auth/status", authStatus);
router.get("/auth/google", googleOAuth);
router.get("/auth/google/callback", googleOAuthCallback);
router.get("/:userId/blogs", getAllBlogsOfUser);

module.exports = router;
