const Blog = require("../models/blog.model");
const { redis } = require("../config/redis");

const healthCheck = async (req, res) => {
  return res.status(200).json({ message: "Blogify API Health check passed 🚀" });
};

const getLandingPageBlogs = async (req, res) => {
  try {
    const cachedBlogs = await redis.get("blogs");
    if (cachedBlogs) {
      return res.status(200).json({ blogs: JSON.parse(cachedBlogs) });
    }

    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3).lean();
    await redis.set("blogs", JSON.stringify(blogs), { expiration: { type: "EX", value: 600 } });

    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting all Blogs" });
  }
};

module.exports = { getLandingPageBlogs, healthCheck };
