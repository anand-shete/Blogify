const setJWT = async (res, token) => {
  if (process.env.MODE === "production") {
    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
      path: "/",
      sameSite: "lax",
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
