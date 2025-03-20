require("dotenv").config();
const express = require("express");
const cors = require("cors");
const baseRoute = require("./routes/root");
const UserRoute = require("./routes/user");
const BlogRoute = require("./routes/blog");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

(async () => {
  await connectDB();
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", baseRoute);
  app.use("/api/user", UserRoute);
  app.use("/api/blog", BlogRoute);

  try {
    app.listen(PORT, () => console.log(`🚀 Server started on PORT:${PORT}`));
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
})();
