const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports.isLoggedIn = async (req, res, next) => {
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
        req.user = await User.findById(userId);
        next();
      }
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (
    req.user.position === 1 ||
    req.user.position === 2 ||
    req.user.position === 3
  ) {
    next();
  } else {
    return res.status(404).send({ msg: "User not authorized !" });
  }
};

module.exports.isAuthor = async (req, res, next) => {
  if (req.user._id === req.body.userId || req.user.position === 1) {
    next();
  } else {
    return res.status(404).send({ msg: "User not authorized !" });
  }
};
