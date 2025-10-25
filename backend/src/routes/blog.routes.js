const express = require("express");
const {
  generateSignedUrlForBlogs,
  addBlog,
  addComment,
  deleteBlogs,
  editBlogs,
  getAllBlogsOfUser,
  getBlog,
  improveContent,
} = require("../controllers/blog.controller");
const router = express.Router();

router.post("/generate-signed-url", generateSignedUrlForBlogs);
router.post("/add", addBlog);
router.post("/edit/:blogId", editBlogs);
router.delete("/delete/:blogId", deleteBlogs);
router.post("/improve", improveContent);
router.get("/getBlogs/:userId", getAllBlogsOfUser);
router.get("/:id", getBlog);
router.post("/comment/add/:blogId", addComment);

module.exports = router;
