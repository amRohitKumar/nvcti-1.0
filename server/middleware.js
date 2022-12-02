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
  const id = req.user.id;
  const currUser = await User.findById(id);
  if (currUser.isAdmin === true) return next();
  return res.status(400).send({msg: "Not authorized !"});
};
