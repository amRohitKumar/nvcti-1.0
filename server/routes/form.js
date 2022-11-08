const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const User = require("../models/user");
const Evaluator = require("../models/evaluator")
const { isLoggedIn, isAuthor } = require("../middleware");
const catchAsync = require("../utilities/catchAsync");

router.route("/getform/:formId").get(
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const formId = req.params.formId;
    const resp = await Form.findById(formId);
    res.status(200).send(resp);
  })
);

router.route("/getforms/:userId").get(
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const enrolled = await User.findById(userId).populate("formSubmitted");
    res.status(200).send(enrolled);
  })
)

router.route("/submit").post(
  isLoggedIn,
  catchAsync(async (req, res) => {
    console.log(req.body);
    const {
      category,
      unit,
      name,
      imgUrl,
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
      members
    } = req.body;
    const userId = req.user._id;
    const newForm = new Form({
      category,
      unit,
      name,
      userId,
      imgUrl,
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
      members
    });
    await newForm.save();
    const user = await User.findById(userId);
    user.formSubmitted.push(newForm);
    await user.save();
    // change adminId for the id in mongodb
    const admin = await Evaluator.findById(adminId);
    admin.applicants.push(newForm._id);
    await admin.save()
    res.status(200).send({ msg: "Form submitted successfully !" });
  })
);

module.exports = router;
