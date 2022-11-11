const express = require("express");
const axios = require("axios");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middleware");
const catchAsync = require("../utilities/catchAsync");
const Form = require("../models/form");
const Evaluator = require("../models/evaluator");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const passGenerator = require("../utilities/generateUID");

router.route("/createevaluator").get(
  catchAsync(async (req, res) => {
    const evalList = new Evaluator({
      userId: mongoose.Types.ObjectId("63693aa240a9c863ed92ea66"),
      applicants: [],
    });
    await evalList.save();
  })
);

router.route("/applicants").get(
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const mentorID = req.user._id;
    const mentor = await Evaluator.findOne({ userId: mentorID }).populate(
      "applicants"
    );
    console.log(mentor);
    res.status(200).json({ applications: mentor.applicants || [] });
  })
);

// to accept a user application
router.route("/update").post(
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const applicant = Form.findById(req.body.applicantId);
    applicant.status = req.body.status;
    await applicant.save();
    return res.status(200).send({ msg: "Status updated successfully" });
  })
);

// 1. we will get list of applicants and mail of mentor -> Done
// 2. create random id and password -> Done
// 3. send the creds to mail -> Pending
// 4. create a user with role admin and add applcants to the evaluator schema -> Done
router.route("/forward").post(
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    // applicants = array of applicant id, mails = array of mails
    const { applicants, mails } = req.body;
    console.log(applicants, mails);
    const applicantIds = applicants.map((id) => mongoose.Types.ObjectId(id));
    for (var mail of mails) {
      const password = passGenerator(16);
      const name = Date.now();
      console.log(password, name);
      const resp = await axios.post(
        "http://localhost:8080/auth/registermentor",
        { email: mail, password }
      );
      const evaluator = resp.data.mentor;
      const evaluatorId = evaluator._id;
      console.log(name, password);

      // check if evaluator already exists
      const alreadyExistEvaluator = await Evaluator.findOne({
        userId: evaluatorId,
      });

      var textmsg = "";

      if (alreadyExistEvaluator) {
        applicantIds.forEach((id) => alreadyExistEvaluator.applicants.push(id));
        textmsg = "please login to the portal to check new applicants. Use the same credentials as before";
        await alreadyExistEvaluator.save();
      } else {
        // else create a new evaluator
        const evalList = await Evaluator.create({
          userId: mongoose.Types.ObjectId(evaluatorId),
          applicants: applicantIds,
        });
        textmsg = `please login to the portal to check new applicants. Use the following credentials \nemail: ${mail} \npassword: ${password}`;
      }
      await sendMail({
        to_email: mail,
        subject_email: "Forwarded applications from admin",
        text_email: textmsg,
        html_email: null,
      });
    }
    res.status(200).send({ msg: "Forwarded successfully" });
  })
);

router.route("/forwardsuperadmin").post(
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { applicants } = req.body;
    const applicantIds = applicants.map((id) => mongoose.Types.ObjectId(id));
    const superAdmin = await Evaluator.findOne({
      userId: "636d2c104e2cb9ed9e8a93a2",
    });
    applicantIds.forEach((id) => superAdmin.applicants.push(id));
    await superAdmin.save();
    res.status(200).send({ msg: "Forwarded successfully !" });
  })
);

router.route("/addcomment").post(
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const form = await Form.findById(req.body.formId);
    form.comments.push(req.body.comment);
    await form.save()
    res.status(200).send({ msg: "Comment added successfully!" });
  })
)

module.exports = router;
