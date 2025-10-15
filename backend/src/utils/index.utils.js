const { google } = require("googleapis");

const getGoogleOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

const setJWT = async (res, token) => {
  if (process.env.NODE_ENV === "production") {
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
    });
  } else {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
  }
};

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 15,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production",
};

module.exports = { getGoogleOAuthClient, setJWT, cookieOptions };
