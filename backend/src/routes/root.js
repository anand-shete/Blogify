const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.get("/health", async (req, res) => {
  return res.status(200).json({ message: "Health check passed" });
});

router.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting all Blogs" });
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

module.exports = router;

/*
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Use an env variable for the key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Adjust model name as needed

async function generateResponse(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

generateResponse("What’s the weather like today?").then(console.log).catch(console.error);
*/
