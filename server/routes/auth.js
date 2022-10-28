const express = require("express");
const passport = require("passport");
const router = express.Router();

const { isLoggedIn, catchAsync } = require("../middleware");
const authController = require("../controllers/authController");

router
  .route("/register")
  // .get(authController.registerGet) // form to register handled in react
  .post(catchAsync(authController.registerPost)); //  registering in db

router
  .route("/verify-email/:emailToken")
  .get(catchAsync(authController.verifyEmailGet)); // verify and add user to DB

router
  .route("/login")
  // .get(authController.loginGet) //login form handled in react
  .post(
    passport.authenticate("local", { failureFlash: false }),
    authController.loginPost
  ); // login post using passport

router
    .route("/logout")
    .get(isLoggedIn, authController.logOut);
module.exports = router;
