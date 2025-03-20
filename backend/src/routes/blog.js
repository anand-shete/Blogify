const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const multer = require("multer");
const multerS3 = require("multer-s3");
const sanitizeHtml = require("sanitize-html");
const { s3Client } = require("../config/aws");

const blogCoverImageUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // auto sets the correct contentType
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filename = `uploads/users/${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

router.post(
  "/add-blog",
  blogCoverImageUpload.single("blogCoverImage"),
  async (req, res) => {
    try {
      const { title, content, userId } = req.body;
      if (!title || !content || !userId)
        return res.status(400).json({ message: "All fields are required" });

      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: [
          "h1",
          "h2",
          "p",
          "span",
          "br",
          "b",
          "i",
          "ul",
          "ol",
          "li",
          "a",
          "img",
        ],
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
  }
);

router.get("/all-blogs/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    if (!userId) return res.status(404).json({ message: "User not found" });

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const blogs = await Blog.find({ createdBy: userId })
      .sort({ createdAt: 1 })
      .lean();

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

router.post("/add-comment/:blogId", async (req, res) => {
  try {
    const { content } = req.body;

    const blogId = req.params?.blogId;
    if (!blogId) return res.status(404).json({ message: "Blog not found" });

    const { createdBy } = await Blog.findById(blogId)
      .select("createdBy")
      .lean();

    await Blog.updateOne(
      { _id: blogId },
      {
        $push: {
          comments: { content, blogId, createdBy },
        },
      }
    );

    const commentArr = [{ content, blogId, createdBy }];
    return res
      .status(200)
      .json({ message: "Comment added successfully ", commentArr });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Adding Comment" });
  }
});
module.exports = router;
