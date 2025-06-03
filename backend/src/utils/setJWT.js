const setJWT = async (res, token) => {
  if (process.env.NODE_ENV === "production") {
    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
      path: "/",
      sameSite: "none",
      domain:"blogify.anandshete.online"
    });
  } else {
    res.status(200).cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      path: "/",
    });
  }
};

module.exports = { setJWT };
// To prevent CSRF attacks during OAuth, pros use a state parameter:When initiating the OAuth flow, generate a random state value, store it in a cookie, and pass it to Google:
