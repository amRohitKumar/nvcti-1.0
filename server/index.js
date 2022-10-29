if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//SET-UP
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const cookieParser = require('cookie-parser');


// FORM
const { MongoClient } = require("mongodb");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "../build/static")));

const mongoose = require("mongoose");
const { sendMail } = require("./utilities/mailsender");
const jwt = require("jsonwebtoken");

mongoose.Promise = global.Promise;

const dbURL = process.env.DBURL || "mongodb://localhost:27017/nvcti";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("IN MONGOOSE SOMETHING WENT WRONG", err);
  });


app.use(
  cors({
    origin: "http://localhost:3000", // frontend url
  })
);

const client = new MongoClient(dbURL);
const database = client.db("nvcti");
const collection = database.collection("event");

// SECURITY
const mongoSanitize = require("express-mongo-sanitize");
app.use(
  mongoSanitize({
    replaceWith: " ",
  })
);






const User = require("./models/user");
const { isLoggedIn } = require("./middleware");



app.get("/home", isLoggedIn, async (req, res) => {
  var events = [];
  const cursor = collection.find({}).toArray((err, result) => {
    for (let i of result) events.push(i);
    // return res.render('home', { events });
    return res.send(200).json({});
  });
  return;
});

const authRoute = require("./routes/auth");
const eventRoute = require("./routes/event");

const e = require("express");
app.use("/auth", authRoute);
app.use("/event", eventRoute);
/*--------------------*/


//THIS IS COMMENTED AS HANDLED IN REACT
//ADMIN
// app.get('/createEvent', isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// })

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



// app.get("/event", (req, res) => {
//     res.sendFile("index.html", { root: path.join(__dirname, "../build/") });
// })

app.get("/allevents", (req, res) => {
  collection.find({}).toArray((err, result) => {
    fResult = {};
    for (var i = 0; i < result.length; i++) {
      temp = {};
      temp["Name"] = result[i].eventName;
      temp["Organizer"] = result[i].eventOrganizer;
      temp["EventID"] = result[i]._id.toString();
      fResult[i] = temp;
    }
    return res.send(200).json({});
  });
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



app.get('/user/profile', async (req, res) => {
  const currUser = await User.findById(req.user.id);
  const currUserName = currUser.username;
  const currUserEmail = currUser.email;

  let userEvents = [];
  for (let e of currUser.enrolledEvents) {
    const [id, index] = e.split(" "); // event's id is 'id', and index of this user in applications is 'index'
    const id = new ObjectId(req.params.id);
    await collection.findOne({ _id: id }).then((resp) => {
      userEvents.push({ name: resp.eventName, status: resp.applicants[index].status });
    })
  }

  console.log(userEvents, currUserEmail, currUserName);
  // we should send events, username, mail
  return res.send('done');
  return res.send(200).json({})
})

// commented as handled in REACT
// app.use((err, req, res, next) => {
//     if (!err.status) err.status = 500;
//     if (!err.message) err.message = 'Something went wrong!';
//     return res.render('error.ejs', { err });
// })

app.get('/', (req, res) => {
  res.send({ status: "Helo World" })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
