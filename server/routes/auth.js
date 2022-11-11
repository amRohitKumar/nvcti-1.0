const express = require("express");
const passport = require("passport");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const authController = require("../controllers/authController");

router
  .route("/register")
  // .get(authController.registerGet) // form to register handled in react
  .post(authController.register); //  registering in db

router.route("/registermentor").post(authController.registerMentor);

router.route("/verify-email/:emailToken").get(authController.verifyEmail); // verify and add user to DB

router.route("/login").post(authController.login);
router.route("/getuser").get(authController.getUser);

module.exports = router;
