const express = require("express");
const {
  generateSignedUrlForBlogs,
  addBlog,
  addComment,
  deleteBlogs,
  editBlogs,
  getBlog,
  improveContent,
  getAllBlogs,
} = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/signed-url", generateSignedUrlForBlogs);
router.post("/add", addBlog);
router.post("/improve", improveContent);
router.get("/:id", getBlog);
router.post("/edit/:blogId", editBlogs);
router.delete("/delete/:blogId", deleteBlogs);
router.post("/comment/add/:blogId", addComment);

module.exports = router;
