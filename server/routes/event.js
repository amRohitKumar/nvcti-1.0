const express = require("express");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middleware");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const dbURL = process.env.DBURL || "mongodb://localhost:27017/nvcti";
const path = require("path");
const { MongoClient } = require("mongodb");
const client = new MongoClient(dbURL);
const database = client.db("nvcti");
const collection = database.collection("event");
const eventController = require("../controllers/eventFormControllers");
const User = require("../models/user");
const ObjectID = require("mongodb").ObjectId;
const Event = require("../models/event");

router.route("/submit").post(isLoggedIn, async (req, res) => {
  try {
    if (req.user && req.user.isAdmin === true) {
      const data = req.body;
      const { banner } = req.body;
      console.log("ss = ", req.body);
      // const cloudinaryResult = await cloudinary.uploader.upload(banner, {
      //   resource_type: 'image',
      //   folder: 'NVCTI',
      //   allowedFormats: ['jpeg', 'png', 'jpg'],
      // });
      data["responses"] = [];
      // data.banner = cloudinaryResult.url;
      collection.insertOne(data).then((resp) => {
        return res.status(200).send({ msg: "Event created successfully" });
      });
    } else {
      return res
        .status(400)
        .send({ msg: "You are not allowed to view this page" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Something went wrong in add event" });
  }
}); //admin

router.route("/allevents").get(async (req, res) => {
  const event = await Event.find();
  return res.status(200).send({ allevents: event });
});

router.route("/createevent").post(async (req, res) => {
  // if (req.user && req.user.isAdmin === true) {
  const {
    name,
    imageUrl,
    description,
    startTime,
    endTime,
    questions,
    applicants,
  } = req.body;
  const newevent = new Event({
    name,
    imageUrl,
    description,
    startTime,
    endTime,
    questions,
    applicants,
  });
  await newevent.save();
  return res.status(200).send({ msg: "Created!" });
  // } else {
  //   return res
  //     .status(400)
  //     .send({ msg: "You are not allowed to view this page" });
  // }
});

router.route("/form/:eventId/:formId").get(isLoggedIn, async (req, res) => {
  const { eventId, formId } = req.params;
  Event.findById(eventId, (err, doc) => {
    if (err) res.status(400).send({ msg: err.message });
    doc.applicants.forEach((el) => {
      if (el._id.toString() === formId) {
        console.log(el);
        return res.status(200).send({
          application: { question: doc.questions, response: el.response },
        });
      }
    });
  });
});

router
  .route("/statusupdate/:eventId/:formId")
  .post(isLoggedIn, isAdmin, async (req, res) => {
    const { eventId, formId } = req.params;
    const { status } = req.body;
    const reqEvent = await Event.findById(eventId);

    let userId;
    for (let participant of reqEvent.applicants) {
      console.log(participant._id.toString());
      if (participant._id.toString() === formId) {
        userId = participant.userId;
        participant.status = status;
        break;
      }
    }
    console.log(userId);
    const reqUser = await User.findById(userId);
    console.log(reqUser);
    if (status.toLowerCase() == "accepted") {
      reqUser.notification.unshift(
        `Your application for ${reqEvent.name} has been accepted`
      );
      reqUser.newNotification = true;
      await reqUser.save();
    } else if (status.toLowerCase() == "rejected") {
      reqUser.notification.unshift(
        `Your application for ${reqEvent.name} has been rejected`
      );
      reqUser.newNotification = true;
      await reqUser.save();
    }

    await reqEvent.save();
    res.status(200).send({ msg: "Status updated successfully !" });
  });

router.route("/:id").get(async (req, res) => {
  const event = await Event.findById(req.params.id);
  return res.status(200).send({ event });
});

router.route("/:id/applications").get(async (req, res) => {
  const { status } = req.query;
  console.log(!!status);
  let event;
  if (!!status) {
    event = await Event.find({
      _id: req.params.id,
      "applicants.status": status,
    });
  } else {
    event = await Event.findById(req.params.id);
  }
  const applications = event?.applicants || [];
  return res.status(200).send({ applications });
});

router.route("/:eventId/submitForm").post(isLoggedIn, async (req, res) => {
  // IMPLEMENT LATER FOR HANDELING FILES

  // for (var key of Object.keys(req.body)) {
  //   if (key != "files" && req.body[key].trim() == "") {
  //     eFlag = 1;
  //     // return res.send("error, fill all fields corectly and apply again");
  //     return res
  //       .status(400)
  //       .send({ msg: "Fill all fields corectly and apply again" });
  //   }
  // }

  // let data = {};
  // let files = {};

  // for (var f of req.files) {
  //   files[f["fieldname"]] = f["filename"];
  // }

  const { eventId } = req.params;
  const curruser = await User.findById(req.user.id);
  const alreadyEnrolled = await User.find({
    _id: req.user.id,
    enrolledEvents: { $in: [new ObjectID(eventId)] },
  });
  console.log(alreadyEnrolled);
  if (alreadyEnrolled.length)
    return res.status(400).send({ msg: "You have already enrolled !" });

  const resp = await Event.findById(eventId);
  resp.applicants.push({ userId: req.user.id, response: req.body.response });
  resp.save();
  curruser.enrolledEvents.push(eventId);
  curruser.save();

  return res.status(200).send({ msg: "Form submitted successfully !" });
}); // student

module.exports = router;
