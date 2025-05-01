const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");


router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting all Blogs" });
  }
});

module.exports = router;
