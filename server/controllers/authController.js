const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utilities/mailsender");

module.exports.register = async (req, res) => {
  try {
    const { email, password, phone, dob, name } = req.body;
    const alreadyExists = await User.findOne({ email: email });
    if (alreadyExists)
      return res
        .status(400)
        .send({ status: "fail", msg: "Email already exists!" });

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
    console.log("vefigy starts ...");
    const emailToken = req.params.emailToken;
    const { email, password, phone, dob, name } = jwt.verify(
      emailToken,
      process.env.EMAIL_VERIFY_TOKEN_SECRET
    );
    // if the token is generated using the secret given, it will return the entire payload
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      const token = jwt.sign(
        { userId: alreadyUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      return res.status(200).send({
        status: "success",
        user: {
          _id: alreadyUser._id,
          email: alreadyUser.email,
          name: alreadyUser.name,
          isVerified: alreadyUser.isVerified,
          dob: alreadyUser.dob,
          enrolledEvents: alreadyUser.enrolledEvents,
          position: alreadyUser.position,
          token,
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email: email,
      isVerified: true,
      phone: phone,
      dob: dob,
      name: name,
      password: hashedPassword,
      position: 0, // to create user
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    return res.status(200).send({
      status: "success",
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        isVerified: newUser.isVerified,
        dob: newUser.dob,
        enrolledEvents: newUser.enrolledEvents,
        position: newUser.position,
        token,
      },
    });
  } catch (e) {
    return res.status(400).send({ status: "fail", msg: e.message });
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
    if (userInDb) {
      const validPass = await bcrypt.compare(user.password, userInDb.password);
      if (!validPass) {
        return res
          .status(400)
          .send({ status: "fail", msg: "username or password is wrong" });
      }
    }
    const token = jwt.sign({ userId: userInDb._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(200).send({
      status: "success",
      user: {
        _id: userInDb._id,
        email: userInDb.email,
        name: userInDb.name,
        isVerified: userInDb.isVerified,
        dob: userInDb.dob,
        enrolledEvents: userInDb.enrolledEvents,
        position: userInDb.position,
        token,
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
