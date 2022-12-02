if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//SET-UP
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// FORM
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");

// ROUTES
const authRoute = require("./routes/auth");
const eventRoute = require("./routes/event");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const dbURL = process.env.DBURL || "mongodb://localhost:27017/nvcti";

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

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

app.use("/auth", authRoute);
app.use("/event", eventRoute);


// app.get("/", (req, res) => {
//   res.send({ status: "Helo World" });
// });


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
