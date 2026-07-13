const User = require("../models/user.model");
const Blog = require("../models/blog.model");
const sanitizeHtml = require("sanitize-html");
const { putObjectForBlog } = require("../config/aws");
const { redis } = require("../config/redis");
const { IMPROVE_BLOG_PROMPT } = require("../utils/prompt.utils");
const { groq } = require("../utils/index.utils");

const generateSignedUrlForBlogs = async (req, res) => {
  try {
    const type = req.body.type;
    const url = await putObjectForBlog(type);
    if (!url) return res.status(500).json({ message: "Error generating Signed URL" });

    return res.status(201).json({ message: "Generated Pre-signed URL", url });
  } catch (error) {
    return res.status(500).json({ message: "Error generating Signed URL" });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, content, _id: userId, coverImageURL } = req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "height", "width"],
      },
    });

    const { _id } = await User.findById(userId).select("_id").lean();
    if (!_id) return res.status(404).json({ message: "User doesn't exists" });

    await Blog.create({
      title,
      content: sanitizedContent,
      createdBy: _id,
      coverImageURL: coverImageURL ?? undefined,
    });

    // update the cache
    redis.del("blogs");
    return res.status(201).json({ message: "Blog Added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
};

const editBlogs = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) return res.status(400).json({ message: "Params not sent properly" });

    const { title, content, _id: userId, coverImageURL } = req.body;
    if (!title || !content || !userId)
      return res.status(400).json({ message: "All fields are required" });

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "height", "width"],
      },
    });

    const user = await User.findById(userId).select("_id").lean();
    if (!user) return res.status(404).json({ message: "User doesn't exists" });

    await Blog.updateOne(
      { _id: blogId },
      {
        title,
        content: sanitizedContent,
        createdBy: user._id,
        coverImageURL,
      },
    );

    redis.del("blogs");
    return res.status(200).json({ message: "Blog Modified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({ message: "Params not sent properly" });
    }

    await Blog.deleteOne({ _id: blogId });
    return res.status(200).json({ message: "Blog Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
};

const improveContent = async (req, res) => {
  try {
    const { content, title } = req.body;
    if (!content) {
      return res.status(400).json({ message: "No content receicved" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: IMPROVE_BLOG_PROMPT },
        { role: "user", content: `Blog Title: ${title}\n\nBlog Content:\n${content}` },
      ],
      temperature: 0.3,
      top_p: 0.9,
    });

    const result = response.choices[0]?.message?.content;

    return res.status(200).json({
      message: "successful",
      content: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messsage: "Failed to improve text using AI",
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy")
      .populate("comments.createdBy");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Blog not found" });
  }
};

const getPaginatedBlogs = async (req, res) => {
  try {
    const rawPage = req.query?.page;
    const rawLimit = req.query?.limit;

    const page = Number.parseInt(rawPage ?? "1", 10);
    const limit = Number.parseInt(rawLimit ?? "6", 10);

    if (!Number.isFinite(page) || page < 1) {
      return res.status(400).json({ message: "Invalid 'page' query param" });
    }
    if (!Number.isFinite(limit) || limit < 1) {
      return res.status(400).json({ message: "Invalid 'limit' query param" });
    }

    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    const [blogs, totalItems] = await Promise.all([
      Blog.find({})
        .sort({ createdAt: -1 })
        .select("title content coverImageURL")
        .skip(skip)
        .limit(safeLimit)
        .lean(),
      Blog.countDocuments({}),
    ]);

    const totalPages = Math.ceil(totalItems / safeLimit) || 0;
    if (totalPages > 0 && page > totalPages) {
      return res.status(200).json({
        blogs: [],
        meta: { page, limit: safeLimit, totalPages, totalItems },
      });
    }

    return res.status(200).json({
      blogs,
      meta: { page, limit: safeLimit, totalPages, totalItems },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting blogs" });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, createdBy } = req.body;
    if (!content || !createdBy) return res.status(400).json({ message: "All fields are required" });

    const blogId = req.params?.blogId;
    if (!blogId) return res.status(404).json({ message: "Params not passed" });

    const blog = await Blog.findById(blogId).select("comments").lean();
    if (!blog) return res.status(404).json({ message: "Blog Not Found" });

    await Blog.updateOne({ _id: blogId }, { $push: { comments: { content, blogId, createdBy } } });

    const updated = await Blog.findById(blogId)
      .select("comments")
      .lean()
      .populate("comments.createdBy");
    const reversed = updated.comments.reverse();

    return res.status(200).json({ message: "Comment added successfully ", comments: reversed });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Adding Comment" });
  }
};

module.exports = {
  addBlog,
  addComment,
  deleteBlogs,
  editBlogs,
  generateSignedUrlForBlogs,
  getBlog,
  getPaginatedBlogs,
  improveContent,
};
