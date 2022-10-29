const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utilities/mailsender");
const { createAuthTokens } = require("../utilities/tokenHelper");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, phone, dob, name } = req.body;
    const alreadyExists = await User.findOne({ email: email });
    if (alreadyExists)
      return res
        .status(400)
        .send({ status: "fail", msg: "email already exists!" });

    //sending verification email
    let emailToken = jwt.sign(
      {
        email,
        name,
        password,
        phone,
        dob,
        // this whole object is payload
      },
      process.env.EMAIL_VERIFY_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const url = `${process.env.CLIENT_ADDRESS2}/auth/verify-email/${emailToken}`;

    const textmsg = `Hi, ${email} Click on the given link to confirm your email ${url}`;

    const htmlmsg = `<div>
                            <h1>
                                Hi, ${name}<br> Click on the given link to confirm your email
                            </h1>
                            <h1>
                                Link is valid for only 24 hours <a href=${url}>Click here to verify your email</a>
                            </h1>
                        </div>`;

    await sendMail({
      to_email: email,
      subject_email: "Verify Your Email",
      text_email: textmsg,
      html_email: htmlmsg,
    });

    return res.status(200).send({
      status: "success",
      msg: "A mail has been sent to your registered emailId ! Please open your emailid to veify.",
    });
  } catch (e) {
    return res.status(400).send({ status: "fail", msg: e.message });
  }
};

module.exports.verifyEmail = async (req, res) => {
  try {
    const emailToken = req.params.emailToken;

    const { email, username, password, phone, dob, name } = jwt.verify(
      emailToken,
      process.env.EMAIL_VERIFY_TOKEN_SECRET
    );
    // if the token is generated using the secret given, it will return the entire payload

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      const [token, refreshToken] = await createAuthTokens({
        user: {
          _id: alreadyUser._id,
          email: alreadyUser.email,
          name: alreadyUser.name,
          isVerified: alreadyUser.isVerified,
          dob: alreadyUser.dob,
          enrolledEvents: alreadyUser.enrolledEvents,
          isAdmin: alreadyUser.isAdmin,
        },
        secret: process.env.ACCESS_TOKEN_SECRET,
        secret2: process.env.REFRESH_TOKEN_SECRET + alreadyUser.password,
      });
      res.cookie("refresh_token", refreshToken, {
        maxAge: 86_400_000,
        httpOnly: true,
      });

      res.header("refresh-token", refreshToken);
      res.header("auth-token", token).send({
        status: "success",
        payload: {
          user: {
            _id: alreadyUser._id,
            email: alreadyUser.email,
            name: alreadyUser.name,
            isVerified: alreadyUser.isVerified,
            dob: alreadyUser.dob,
            enrolledEvents: alreadyUser.enrolledEvents,
            isAdmin: alreadyUser.isAdmin,
            accessToken: token,
            refreshToken: refreshToken,
          },
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const makeUser = new User({
      username: username,
      email: email,
      isVerified: true,
      phone: phone,
      dob: dob,
      name: name,
      password: hashedPassword,
    });
    const savedUser = await makeUser.save();
    const [token, refreshToken] = await createAuthTokens({
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        isVerified: savedUser.isVerified,
        dob: savedUser.dob,
        enrolledEvents: savedUser.enrolledEvents,
        isAdmin: savedUser.isAdmin,
      },
      secret: process.env.ACCESS_TOKEN_SECRET,
      secret2: process.env.REFRESH_TOKEN_SECRET + savedUser.password,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 86_400_000,
      httpOnly: true,
    });

    res.header("refresh-token", refreshToken);
    res.header("auth-token", token).send({
      status: "success",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        isVerified: savedUser.isVerified,
        dob: savedUser.dob,
        enrolledEvents: savedUser.enrolledEvents,
        isAdmin: savedUser.isAdmin,
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
  } catch (e) {
    return res.status(400).send({ status: "fail", msg: e.message });
  }
};

module.exports.refreshAuth = async (req, res) => {
  try {
    var refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res
        .status(401)
        .send({ status: "Fail", msg: "Unauthorize acecsss" });
    const { _id } = jwt.decode(refreshToken);
    if (!_id)
      return res
        .status(401)
        .send({ status: "Fail", msg: "Unauthorize acecsss" });

    const userInDb = await User.findById(_id);
    if (!userInDb)
      return res
        .status(401)
        .send({ status: "Fail", msg: "Unauthorize acecsss" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET + userInDb.password
    );
    const [newToken, newRefreshToken] = await createAuthTokens({
      user: {
        _id: userInDb._id,
        email: userInDb.email,
        name: userInDb.name,
        isVerified: userInDb.isVerified,
        dob: userInDb.dob,
        enrolledEvents: userInDb.enrolledEvents,
        isAdmin: userInDb.isAdmin,
      },
      secret: process.env.ACCESS_TOKEN_SECRET,
      secret2: process.env.REFRESH_TOKEN_SECRET + userInDb.password,
    });

    res.cookie("refresh_token", newRefreshToken, {
      maxAge: 86_400_000,
      httpOnly: true,
    });

    res.header("refresh-token", newRefreshToken);
    res.header("auth-token", newToken).send({
      status: "success",
      payload: {
        user: {
          _id: userInDb._id,
          email: userInDb.email,
          name: userInDb.name,
          isVerified: userInDb.isVerified,
          dob: userInDb.dob,
          enrolledEvents: userInDb.enrolledEvents,
          isAdmin: userInDb.isAdmin,
          accessToken: newToken,
          refreshToken: newRefreshToken,
        },
      },
    });
  } catch (error) {
    res.status(401).send({ status: "Fail", error, msg: "Unauthorise Access!" });
  }
};
module.exports.login = async (req, res) => {
  try {
    const user = req.body;
    var userInDb = await User.findOne({ email: user.email });
    if (!userInDb)
      return res
        .status(400)
        .send({ status: "fail", msg: "username or password is wrong" });

    if (userInDb)
      var validPass = await bcrypt.compare(user.password, userInDb.password);
    if (!validPass)
      return res
        .status(400)
        .send({ status: "fail", msg: "username or password is wrong" });

    const [token, refreshToken] = await createAuthTokens({
      user: {
        _id: userInDb._id,
        email: userInDb.email,
        name: userInDb.name,
        isVerified: userInDb.isVerified,
        dob: userInDb.dob,
        enrolledEvents: userInDb.enrolledEvents,
        isAdmin: userInDb.isAdmin,
      },
      secret: process.env.ACCESS_TOKEN_SECRET,
      secret2: process.env.REFRESH_TOKEN_SECRET + userInDb.password,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 86_400_000,
      httpOnly: true,
    });

    res.header("refresh-token", refreshToken);
    res.header("auth-token", token).send({
      status: "success",
      user: {
        _id: userInDb._id,
        email: userInDb.email,
        name: userInDb.name,
        isVerified: userInDb.isVerified,
        dob: userInDb.dob,
        enrolledEvents: userInDb.enrolledEvents,
        isAdmin: userInDb.isAdmin,
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    res.status(401).send({
      status: "Fail",
      msg: "Something wrong happened from our side plz mail us",
      error: error,
    });
  }
};

module.exports.logOut = function (req, res, next) {
  try {
    res.clearCookie("refresh_token");
    res.send({ status: "Success", msg: "LogedOut Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Fail",
      msg: error,
    });
  }
};
