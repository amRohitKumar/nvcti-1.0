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

// FORM
const { MongoClient } = require("mongodb");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

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

const secret = process.env.SECRET || "asecrethere";

const MongoStore = require("connect-mongo");
const store = new MongoStore({
  mongoUrl: dbURL, // link to db where we want to store these sessions
  secret: secret,
  touchAfter: 24 * 3600, // (in sec) this Avoids unnecessary update of data. If the data is changed it will be updated, but if it is not changed it will not be updated(i.e. even if we send requests to update it will not be updated, will be done after every 24hrs here)
});

store.on("error", function (e) {
  console.log("Session store error!!!", e);
});

const sessionConfiguration = {
  store: store, // now mongo will be used to store sessions.
  name: "nvcti", // we use this name to set the name to our cookie instead of using 'connect.sid' which is default.
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true, // so not accessible through js
    // secure: true // Only work over http secured servers(https), but in localhost(http) we don't get desired results as it is not secured(https). HTTPS is far more secure than HTTP
  },
};

app.use(session(sessionConfiguration));

const User = require("./models/user");
const { isLoggedIn } = require("./middleware");

const passport = require("passport");
const passportLocal = require("passport-local");
const MagicLinkStrategy = require("passport-magic-link").Strategy;

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session()); //this should be used only after 'app.use(session())'
passport.use(new passportLocal(User.authenticate())); // this authenticate method, serializeUser, deserializeUser is added by passport.local.mongoose to User.
passport.serializeUser(User.serializeUser()); // store in a session. serializeUser(): Generates a function that is used by Passport to serialize users into the session.
passport.deserializeUser(User.deserializeUser()); // unstore in a session

// app.use((req, res, next) => { // we should do this before any of the route handlers and only after app.use for session and flash(as they( flash and session ) are needed to run flash)
//     res.locals.currentUser = req.user;
//     next();
// }) // this should be places after above authentication part to add req.user into locals.

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

//ADMIN
// app.get('/event/:id/makeForm', isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// });

//ADMIN
// app.post("/event/:id/submit", isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         collection.findOne({ "Event": req.params.id }).then((resp) => {
//             resp["comps"] = req.body.comps;
//             collection.findOneAndReplace({ "Event": req.params.id }, resp).then((resp) => {
//                 res.redirect("/allevents");
//             })
//         })
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// })

// displaying the form
// app.get("/event/:id/formData", isLoggedIn, (req, res) => {
//     collection.findOne({ "Event": req.params.id }).then((resp) => {
//         resp["eventID"] = req.params.id;
//         res.send(resp);
//     }).catch((error) => {
//         console.error(error);
//         res.send("err404")
//     })
// })

// app.get("/event/:id/apply", isLoggedIn, (req, res) => {
//     res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
// })

// app.post("/event/:id/submitForm", isLoggedIn, upload.any(), async (req, res) => {

//     for (var key of Object.keys(req.body)) {
//         if (key != "files" && req.body[key].trim() == "") {
//             eFlag = 1;
//             return res.send("error, fill all fields corectly and apply again");
//         }
//     }

//     let data = {}
//     let files = {}

//     for (var f of req.files) {
//         files[f["fieldname"]] = f["filename"];
//     }

//     const curruser = await User.findById(req.user.id);

//     let alreadyEnrolled = 0;
//     for(let c in curruser.enrolledEvents){
//         if(c==req.params.id) {
//             alreadyEnrolled = 1;
//             break;
//         }
//     }

//     if(alreadyEnrolled){
//         return res.redirect('/home');
//     }

//     let l=0;

//     await collection.findOne({ "Event": req.params.id }).then((resp) => {
//         data = resp;
//         if (!data["applicants"]) {
//             data["applicants"] = []
//         }
//         req.body["files"] = files;
//         req.body["status"] = "pending";
//         data["applicants"].push(req.body);

//         l = data["applicants"].length-1;
//         console.log(l);
//         collection.findOneAndReplace({ "Event": req.params.id }, data).then((resp) => {
//         })
//     })

//     const temp = req.params.id + ' ' + l;

//     curruser.enrolledEvents.push(temp);
//     await curruser.save();
//     return res.redirect("/allevents");
// })

//ADMIN
// event applications
// app.get("/event/:id/view", isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// })

//ADMIN
// app.get("/event/:id/data", isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         collection.findOne({ "Event": req.params.id }).then((resp) => {
//             res.json(resp);
//         })
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// })

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

//ADMIN
// app.post("/event/:id/updatestatus", isLoggedIn, (req, res) => {
//     if (req.user && req.user.isAdmin === true) {
//         collection.findOne({ "Event": req.params.id }).then((resp) => {
//             resp.applicants[req.body.studId].status = req.body.status;
//             collection.findOneAndReplace({ "Event": req.params.id }, resp).then((resp) => {
//                 res.send("Updated");
//             })
//         })
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// })

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
      temp["EventID"] = result[i].Event;
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

//MENTOR
// app.get("/mentor/:id/view", isLoggedIn, (req, res) => {
//     const mentorID = req.params.id;
//     mentorCollection.findOne({ "id": mentorID }).then((resp) => {
//         res.json(resp);
//     })
// })

//MENTOR
// app.post("/mentor/:id/update", (req, res) => {
//     const applicantID = req.body.applicantID;

//     mentorCollection.findOne({ "id": req.params.id }).then((resp) => {
//         resp.applicants[applicantID].status = req.body.status;
//         mentorCollection.findOneAndReplace({ "id": req.params.id }, resp).then((resp) => {
//             res.send(resp);
//         })
//     })
// })

//THIS IS COMMENTED AS HANDLED IN REACT
// app.get('/user/profile', async(req, res) => {
//     const currUser = await User.findById(req.user.id);
//     const currUserName = currUser.username;
//     const currUserEmail = currUser.email;

//     let userEvents = [];
//     for(let e of currUser.enrolledEvents){
//         const [id, index] = e.split(" "); // event's id is 'id', and index of this user in applications is 'index'
//         await collection.findOne({ "Event": id }).then((resp) => {
//             userEvents.push({name: resp.eventName,  status: resp.applicants[index].status});
//         })
//     }

//     console.log(userEvents, currUserEmail, currUserName);
//     // we should send events, username, mail
//     return res.send('done');
    // return res.send(200).json({})
// })

// commented as handled in REACT
// app.use((err, req, res, next) => {
//     if (!err.status) err.status = 500;
//     if (!err.message) err.message = 'Something went wrong!';
//     return res.render('error.ejs', { err });
// })

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
