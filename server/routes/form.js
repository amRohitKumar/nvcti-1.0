const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const User = require("../models/user");
const { isLoggedIn, isAuthor } = require("../middleware");
const catchAsync = require("../utilities/catchAsync");

router.route("/getform/:formId").get(
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const {formId} = req.params;
    // await 
  })
);

router.route("/submit").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    console.log(req.body);
    const {
      category,
      unit,
      name,
      uniqueId,
      institute,
      gender,
      address,
      email,
      mobile,
      sourceOfFunding,
      projectTitle,
      projectObjective,
      origin,
      methodology,
      outcome,
      timeOfCompletion,
      mentor,
      members,
    } = req.body;
    const newForm = new Form({
      category,
      unit,
      name,
      uniqueId,
      institute,
      gender,
      address,
      contact: { email, mobile },
      sourceOfFunding,
      projectTitle,
      projectObjective,
      ideaOfProject: { origin, methodology, outcome },
      timeOfCompletion,
      mentor,
      members,
    });
    await newForm.save();
    res.status(200).send({ msg: "Form submitted successfully !" });
  })
);

module.exports = router;
