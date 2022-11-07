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
const evaluatorRoutes = require("./routes/evaluator");

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
app.use("/evaluator", evaluatorRoutes);

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
