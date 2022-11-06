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
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/form");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
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

app.use('/', homeRoutes);
app.use("/auth", authRoutes);
app.use("/form", formRoutes);


//ADMIN

// app.post("/sendmentor", isLoggedIn, async (req, res) => {
//   const mentorMail = req.body.emailID;
//   const applicants = req.body.applicants;

//   const mentorID = Date.now();
//   const password = makeid(16);

//   const data = {
//     id: mentorID.toString(),
//     mail: mentorMail,
//     applicants: applicants,
//   };
//   mentorCollection.insertOne(data);

//   const makeUser = new User({ mentorID, mentorMail, isVerified: true });
//   const result = await User.register(makeUser, password); // auto saved
//   // return res.redirect('/home');
//   return res.send(200).json({});
// });

// app.get("/user/profile", async (req, res) => {
//   const currUser = await User.findById(req.user.id);
//   const currUserName = currUser.username;
//   const currUserEmail = currUser.email;

//   let userEvents = [];
//   for (let e of currUser.enrolledEvents) {
//     const id = new ObjectId(req.params.id);
//     await collection.findOne({ _id: id }).then((resp) => {
//       userEvents.push({
//         name: resp.eventName,
//         status: resp.applicants[index].status,
//       });
//     });
//   }

//   console.log(userEvents, currUserEmail, currUserName);
//   // we should send events, username, mail
//   return res.send("done");
//   return res.send(200).json({});
// });

// commented as handled in REACT
// app.use((err, req, res, next) => {
//     if (!err.status) err.status = 500;
//     if (!err.message) err.message = 'Something went wrong!';
//     return res.render('error.ejs', { err });
// })

app.get("/", (req, res) => {
  res.send({ status: "Helo World" });
});

app.use((err, req, res, next) => {
  const {statusCode = 500, message = "Something went wrong"} = err;
  res.send(statusCode).send({msg: message});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
