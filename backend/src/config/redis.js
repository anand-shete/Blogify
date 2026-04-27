const { createClient } = require("redis");

const redis = createClient({ url: process.env.REDIS_URI });

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", err => console.log("Redis client error", err));

const startRedis = async () => {
  try {
    await redis.connect();
  } catch (error) {
    console.log("Failed to initialize redis connection", error);
    process.exit(1);
  }
};

startRedis();

module.exports = { redis };
