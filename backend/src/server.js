require("dotenv").config();
const express = require("express");
const cors = require("cors");
const baseRoute = require("./routes/baseRoute");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const PORT = Number(process.env.PORT) || 3000;

(async () => {
  await connectDB();

  // configure CORS
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
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile: ", profile);
        return done(null, profile);
      }
    )
  );

  app.get("/", async (req, res) => {
    return res.status(200).json({ message: "API Health check passed 🚀" });
  });

  app.use("/api/v1", baseRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/blog", blogRoute);

  try {
    app.listen(PORT, () => console.log(`🚀 Server started on PORT:${PORT}`));
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
})();
