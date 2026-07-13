const { google } = require("googleapis");
const Groq = require("groq-sdk");

const getGoogleOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = { getGoogleOAuthClient, groq };
