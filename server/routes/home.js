const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { isLoggedIn } = require("../middleware");

router.route("/home").get(isLoggedIn, homeController.homeStats);

module.exports = router;
