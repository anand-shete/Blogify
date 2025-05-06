require("dotenv").config();

const Redis = require("ioredis");
let redis;

try {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === "true" ? {} : null,
  });

  redis.on("connect", () => console.log("Redis connected successfully"));
  redis.on("error", () => console.log("Redis connection error", error));
} catch (error) {   
  console.log("Failed to initalize Redis: ", error);
}

module.exports = { redis };
