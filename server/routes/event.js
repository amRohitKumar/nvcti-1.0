const express = require("express");
const router = express.Router();

const { isLoggedIn, catchAsync, isAdmin } = require("../middleware");

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
const  ObjectID = require('mongodb').ObjectId;
const Event = require('../models/event');

router.route("/submit").post(isLoggedIn, async (req, res) => {
  try{
    if (req.user && req.user.isAdmin === true) {
      const data = req.body;
      const {banner} = req.body;
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
    } catch(err){
      console.log(err);
      return res
        .status(400)
        .send({ msg: "Something went wrong in add event" });
  }
}); //admin


router.route("/allevents")
  .get(async (req, res) => {
    const event = await Event.find();
    return res.status(200).send({ allevents: event });
});

router.route("/createevent") 
  .post(async (req, res) => {
    // if (req.user && req.user.isAdmin === true) {
      const { name, imageUrl, description, startTime, endTime, questions } = req.body;
      const newevent = new Event({ name, imageUrl, description, startTime, endTime, questions });
    await newevent.save();
    return res.status(200).send({ msg: "Created!" });
    // } else {
    //   return res
    //     .status(400)
    //     .send({ msg: "You are not allowed to view this page" });
    // }
  })

router.route('/:id')
  .get(async (req, res) => {
    const event = await Event.findById(req.params.id);
    return res.status(200).send({ event });
})

router
  .route("/:id/submitForm")
  .post(isLoggedIn, upload.any(), async (req, res) => {

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

    const curruser = await User.findById(req.user.id);

    let alreadyEnrolled = 0;
    for (let c of curruser.enrolledEvents) {
      const eventId = c.split(" ")[0];
      if (eventId == req.params.id) {
        alreadyEnrolled = 1;
        break;
      }
    }
    
    if (alreadyEnrolled) {
      // return res.redirect('/home');
      return res.status(400).send({ msg: "You have already enrolled!" });
    }

    let l = 0;

    const id = new ObjectID(req.params.id);
    await collection.findOne({ _id: id }).then((resp) => {
      data = resp;
      if (!data["responses"]) {
        data["responses"] = [];
      }
      // req.body["files"] = files;
      req.body.push({"status": "pending"});
      data["responses"].push(req.body);

      l = data["responses"].length - 1;
      console.log(l);
      collection
        .findOneAndReplace({ _id: id }, data);
    });

    const temp = req.params.id + " " + l;
    curruser.enrolledEvents.push(temp);
    await curruser.save();
    const userdata = await User.findById(req.user.id);
    return res.status(200).send({user: userdata});
  }); // student


router.route("/:id/updatestatus").post(isLoggedIn, (req, res) => {
  if (req.user && req.user.isAdmin === true) {
    const id = new ObjectId(req.params.id);
    collection.findOne({ _id: id }).then((resp) => {
      resp.applicants[req.body.studId].status = req.body.status;
      collection
        .findOneAndReplace({ Event: req.params.id }, resp)
        .then((resp) => {
          // res.send("Updated");
          return res.send(200).json({});
        });
    });
  } else {
    // res.send("You are not allowed to view this page");
    return res
      .status(400)
      .send({ msg: "You are not allowed to view this page" });
  }
});

{
  //THIS IS COMMENTED AS HANDLED IN REACT
  // router.route('/')
  //     .get((req, res) => {
  //         res.sendFile("index.html", { root: path.join(__dirname, "../build/") });
  //     })
}

module.exports = router;
