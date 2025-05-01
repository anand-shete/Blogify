const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const sanitizeHtml = require("sanitize-html");

router.post("/blog/add", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId)
      return res.status(400).json({ message: "All fields are required" });

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: ["h1", "h2", "p", "span", "br", "b", "i", "ul", "ol", "li", "a", "img"],
      allowedAttributes: { "*": ["style"], a: ["href"], img: ["src"] },
    });

    await Blog.create({
      title,
      content: sanitizedContent,
      createdBy: userId,
      coverImageURL: req.file?.location,
    });
    return res.status(201).json({ message: "Blog Added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
});

router.post("/improve-text", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "No text receicved" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(`Paraphrase this text:${text}`);
    console.log(result);
    // return result.response.text();
    // return res.status(200).json({ result });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to improve text using AI" });
  }
});

router.get("/blogs/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    if (!userId) return res.status(404).json({ message: "User not found" });

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const blogs = await Blog.find({ createdBy: userId }).sort({ createdAt: 1 }).lean();

    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate();
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Blog not found" });
  }
});

router.post("/comment/:blogId", async (req, res) => {
  try {
    const { content } = req.body;

    const blogId = req.params?.blogId;
    if (!blogId) return res.status(404).json({ message: "Blog not found" });

    const { createdBy } = await Blog.findById(blogId).select("createdBy").lean();

    await Blog.updateOne(
      { _id: blogId },
      {
        $push: {
          comments: { content, blogId, createdBy },
        },
      }
    );

    const commentArr = [{ content, blogId, createdBy }];
    return res.status(200).json({ message: "Comment added successfully ", commentArr });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Adding Comment" });
  }
});
module.exports = router;
