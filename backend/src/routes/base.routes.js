const { Router } = require("express");
const { getAllBlogs, healthCheck } = require("../controllers/base.controller");

const router = Router();

router.get("/", healthCheck);
router.get("/blogs", getAllBlogs);

module.exports = router;
