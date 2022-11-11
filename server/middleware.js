const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports.isLoggedIn = async (req, res, next) => {
  console.log("isloggedIn middleware");
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader.startsWith("Bearer") || !token) {
    res.status(401).send({ msg: "Authentication Invalid" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).send({ msg: "Authentication Invalid" });
      } else {
        const userId = payload.userId;
        const user = await User.findById(userId);
        req.user = user;
        // console.log("res = ", res, req.user);
        next();
      }
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  console.log("isadmin middlware");
  console.log(req.user.position);
  if (
    req.user.position === 1 ||
    req.user.position === 2 ||
    req.user.position === 3
  ) {
    console.log("inside if ");
    next();
  } else {
    return res.status(404).send({ msg: "User not authorized !" });
  }
};

module.exports.isAuthor = async (req, res, next) => {
  console.log("author middleware");
  if (req.user.position > 0 || req.user._id.toString() === req.params.userId) {
    next();
  } else {
    return res.status(404).send({ msg: "User not authorized !" });
  }
};
