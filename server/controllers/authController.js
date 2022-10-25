const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utilities/mailsender');

module.exports.registerGet = (req, res) => {
    return res.render('auth/register');
};

module.exports.registerPost = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // console.log(username, password);

        const alreadyExists = await User.findOne({ email: email });
        // console.log(alreadyExists);
        if (alreadyExists) {
            console.log("A user with the given mail already exists");
            return res.redirect('/auth/register');
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            console.log("A user with the given username already exists");
            return res.redirect('/auth/register');
        }

        //sending verification email
        let emailToken = jwt.sign(
            {
                email, username, password
                // this whole object is payload
            }, process.env.EMAIL_VERIFY_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );
        // console.log(emailToken);

        const url = `${process.env.CLIENT_ADDRESS2}/auth/verify-email/${emailToken}`;

        const textmsg = `Hi, ${email} Click on the given link to confirm your email ${url}`;


        const htmlmsg = `<div>
                            <h1>
                                Hi, ${email}<br> Click on the given link to confirm your email
                            </h1>
                            <h1>
                                Link is valid for only 24 hours <a href=${url}>Click here to verify your email</a>
                            </h1>
                        </div>`;

        await sendMail({ to_email: email, subject_email: "Verify Your Email", text_email: textmsg, html_email: htmlmsg });

        return res.render('auth/verify');
    }
    catch (e) {
        // req.flash('error', e.message);
        console.log(e.message);
        return res.redirect('/auth/register');
    }
};


module.exports.verifyEmailGet = async (req, res) => {

    try {
        const emailToken = req.params.emailToken;
        // console.log(emailToken);

        const { email, username, password } = jwt.verify(emailToken, process.env.EMAIL_VERIFY_TOKEN_SECRET);
        // if the token is generated using the secret given, it will return the entire payload

        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            console.log("ALREADY VERIFIED");
            return res.redirect('/auth/login');
        }

        const makeUser = new User({ username, email, isVerified: true });
        const result = await User.register(makeUser, password); // auto saved

        req.login(result, err => { // login after registering
            if (err) return next(err);
            // req.flash('success', 'Welcome to CampIt!');
            return res.redirect('/home');
        })
    }
    catch (e) {
        console.log(e.message);
        return res.redirect('/auth/register');
    }
};


module.exports.loginGet = (req, res) => {
    return res.render('auth/login');
};

module.exports.loginPost = (req, res) => {
    // req.flash('success', `Welcome back ${req.user.username}`);
    res.redirect('/home');
};

module.exports.logOut = function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
};