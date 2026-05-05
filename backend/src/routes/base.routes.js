const { Router } = require("express");
const { getLandingPageBlogs, healthCheck } = require("../controllers/base.controller");

const router = Router();

router.get("/health", healthCheck);
router.get("/blogs", getLandingPageBlogs);

module.exports = router;
