const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const { redis } = require("../utils/redis");

router.get("/blogs", async (req, res) => {
  try {
    const cachedBlogs = await redis.get("landing_blogs");
    if (cachedBlogs) return res.status(200).json({ blogs: JSON.parse(cachedBlogs) });

    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10);
    await redis.set("landing_blogs", JSON.stringify(blogs), "EX", 60 * 5);
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting all Blogs" });
  }
});

module.exports = router;
