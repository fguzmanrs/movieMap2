const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
// const discoveredRouter = require("./routes/discoveredRouter");

const { globalErrorHandler } = require("./controllers/errorController");
const catchAsync = require("./util/catchAsync");
const ErrorFactory = require("./util/errorFactory");

const app = express();

//! Cors setting : Attach Access-Control-Allow-Origin
// var whitelist = ["http://localhost:3000", "http://localhost:3001"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("sssNot allowed by CORS"));
//     }
//   },
// };

//! Cors setting : Async version
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://git.heroku.com/secure-retreat-34944",
  "https://secure-retreat-34944.herokuapp.com/",
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Apply cors to all response
app.use(cors(corsOptionsDelegate));
// Cors pre-flight
// app.options("*", cors(corsOptionsDelegate));

// app.use(cors({ origin: true, credentials: true }));
// app.options(cors({ origin: true, credentials: true }));

// app.use(cors(corsOptions));
// app.options("*", cors());

// app.use(function (req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   // res.header("Content-Type", "application/json;charset=UTF-8");
//   // res.header("Access-Control-Allow-Credentials", true);
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   next();
// });

// Frontend folder location
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// } else {
//   app.use(express.static(path.join(__dirname, "public")));
// }

//! For test API call from frontend with react
app.use(express.static("client/build"));

// server server's user profile images for frontend
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Router
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
// app.get("/images", (req, res) => {
//   console.log("🍥", req.url);
//   res.sendFile(path.join(__dirname), `/images/default.png`);
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Error handling for invalid path access
app.all("*", (req, res, next) => {
  next(
    new ErrorFactory(
      404,
      `Cannot find ${req.originalUrl} on the server. Please check the path.`
    )
  );
});

// Global error handling middeware
app.use(globalErrorHandler);

module.exports = app;
