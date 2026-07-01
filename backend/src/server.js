require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const baseRoute = require("./routes/base.routes");
const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.routes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { redis } = require("./config/redis");

const app = express();
const PORT = Number(process.env.PORT);

const startServer = async () => {
  try {
    await connectDB();

    app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:4173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      }),
    );
    app.set("trust proxy", 1); // trust first reverse proxy (nginx)
    app.use(express.urlencoded({ limit: "10mb", extended: true }));
    app.use(express.json({ limit: "10mb" }));
    app.use(cookieParser());

    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            upgradeInsecureRequests: [],
          },
        },
        strictTransportSecurity: false,
        crossOriginResourcePolicy: { policy: "same-origin" },
        crossOriginOpenerPolicy: { policy: "same-origin" },
        xContentTypeOptions: true,
        xPermittedCrossDomainPolicies: true,
        xFrameOptions: { action: "deny" },
      }),
    );

    const redisStore = new RedisStore({ client: redis, prefix: "blogify:" });
    app.use(
      session({
        store: redisStore,
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 1000 * 60 * 15, // connect-redis uses this as TTL
        },
      }),
    );

    app.use("/api/v1", baseRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/blog", blogRoute);

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
