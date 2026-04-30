const rateLimit = require("express-rate-limit");

/*
for i in {1..11}; do 
  curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anand@gmail.com", "password":"123"}'
  echo ""
done
*/

const defaultOpts = {
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10, // 10 req per IP per window (15 mins)
  ...defaultOpts,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  ...defaultOpts,
});

const checkEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  ...defaultOpts,
});

const signedUrlRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  ...defaultOpts,
});

module.exports = { loginLimiter, signupLimiter, checkEmailLimiter, signedUrlRateLimiter };
