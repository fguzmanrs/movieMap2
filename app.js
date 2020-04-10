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

// Attach Access-Control-Allow-Origin to every req header
app.use(cors());
app.options("*", cors());

// Frontend folder location
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Router
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
// app.use("/api/reviews", reviewRouter);
// app.use("/api/discovered", discoveredRouter);

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
