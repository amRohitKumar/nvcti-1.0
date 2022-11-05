if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//MODULE IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MODELS
const User = require("./models/user");

// MIDDLEWARES
const { isLoggedIn } = require("./middleware");

// ROUTES
const homeRoute = require("./routes/home");
const authRoute = require("./routes/auth");
const eventRoute = require("./routes/event");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const dbURL = process.env.DBURL || "mongodb://localhost:27017/nvcti-lab";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("IN MONGOOSE SOMETHING WENT WRONG", err);
  });

app.use(cors());

// SECURITY
const mongoSanitize = require("express-mongo-sanitize");
app.use(
  mongoSanitize({
    replaceWith: " ",
  })
);


app.get("/home", isLoggedIn, async (req, res) => {
  var events = [];
  const cursor = collection.find({}).toArray((err, result) => {
    for (let i of result) events.push(i);
    // return res.render('home', { events });
    return res.send(200).json({});
  });
  return;
});

app.use('/', homeRoute);
app.use("/auth", authRoute);
app.use("/event", eventRoute);
/*--------------------*/

//ADMIN
app.post("/createEvent", isLoggedIn, (req, res) => {
  if (req.user && req.user.isAdmin === true) {
    collection.countDocuments({ _id: { $exists: true } }).then((resp) => {
      // Won't be using "Event" as the id
      req.body["Event"] = (resp + 1).toString();
      req.body["isOngoing"] = false;
      req.body["comps"] = { elements: {} };
      collection.insertOne(req.body).then(() => {
        // return res.redirect('/event');
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

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//ADMIN
const mentorCollection = database.collection("mentors");

app.post("/sendmentor", isLoggedIn, async (req, res) => {
  const mentorMail = req.body.emailID;
  const applicants = req.body.applicants;

  const mentorID = Date.now();
  const password = makeid(16);

  const data = {
    id: mentorID.toString(),
    mail: mentorMail,
    applicants: applicants,
  };
  mentorCollection.insertOne(data);

  const makeUser = new User({ mentorID, mentorMail, isVerified: true });
  const result = await User.register(makeUser, password); // auto saved
  // return res.redirect('/home');
  return res.send(200).json({});
});

app.get("/user/profile", async (req, res) => {
  const currUser = await User.findById(req.user.id);
  const currUserName = currUser.username;
  const currUserEmail = currUser.email;

  let userEvents = [];
  for (let e of currUser.enrolledEvents) {
    const id = new ObjectId(req.params.id);
    await collection.findOne({ _id: id }).then((resp) => {
      userEvents.push({
        name: resp.eventName,
        status: resp.applicants[index].status,
      });
    });
  }

  console.log(userEvents, currUserEmail, currUserName);
  // we should send events, username, mail
  return res.send("done");
  return res.send(200).json({});
});

// commented as handled in REACT
// app.use((err, req, res, next) => {
//     if (!err.status) err.status = 500;
//     if (!err.message) err.message = 'Something went wrong!';
//     return res.render('error.ejs', { err });
// })

app.get("/", (req, res) => {
  res.send({ status: "Helo World" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
