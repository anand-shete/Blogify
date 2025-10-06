require("dotenv").config();
const express = require("express");
const cors = require("cors");
const baseRoute = require("./routes/base.routes");
const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.routes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
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

    let redisClient = createClient();
    redisClient.connect().catch(console.error);
    let redisStore = new RedisStore({ client: redisClient, prefix: "blogify:", ttl: 86400 });

    // pass cookie options
    app.use(
      session({
        store: redisStore,
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
          secure: process.env.NODE_ENV === "production",
        },
      })
    );

    app.get("/", async (req, res) => {
      return res.status(200).json({ message: "Blogify API Health check passed 🚀" });
    });

    app.use("/api/v1", baseRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/blog", blogRoute);
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
