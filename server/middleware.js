const User = require('./models/user');
const jwt = require('jsonwebtoken')

const isLoggedIn = async (req, res, next) => {
    const token = req.header('auth-token');
    // console.log(token)
    if (!token) return res.status(401).send({ message: "something went wrong :(" });
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var user = await User.findById(payload._id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: "unathoried access" });
    }
}
module.exports.isLoggedIn = isLoggedIn;



module.exports.isAdmin = async (req, res) => {
    const id = req.user.id;
    const currUser = await User.findById(id);
    if (currUser.isAdmin === true) return 1;
    return 0;
}   