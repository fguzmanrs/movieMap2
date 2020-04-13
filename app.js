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

//! Attach Access-Control-Allow-Origin
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

//! Async version
var whitelist = ["http://localhost:3000", "http://localhost:3001"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// app.use(cors({ origin: true, credentials: true }));
// app.options(cors({ origin: true, credentials: true }));

// app.use(cors(corsOptions));
// app.options("*", cors());

app.use(cors(corsOptionsDelegate));
app.options("*", cors(corsOptionsDelegate));

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

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Router
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

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
