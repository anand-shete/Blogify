const setJWT = async (res, token) => {
  if (process.env.NODE_ENV === "production") {
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
      path: "/",
      sameSite: "none",
    });
  } else {
    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60,
    });
  }
};

module.exports = { setJWT };
