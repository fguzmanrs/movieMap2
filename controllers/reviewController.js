const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = encodeURI(
  "mongodb+srv://user_moviemap2:mIqinYfAq5BCCWu3@cluster0-kstvt.mongodb.net/moviemap2?retryWrites=true&w=majority"
);
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", (error) => {
  console.log("mongoDb::reviewController::error:", error);
});
db.on("connect", function () {
  console.log("mongoDb::reviewController::connected");
  console.log("reviewController::" + databaseUrl + "::" + collections);
});
db.runCommand({ ping: 1 }, function (err, res) {
  console.log("mongoDb::reviewController::ping");
  if (!err && res.ok) console.log("reviewController::up&running");
});
// end of: mongodb initialization

//! ROUTE: Create a review
//  Login required. Prevent a user to write multiple reviews for the same movie.
exports.createReview = catchAsync(async (req, res, next) => {
  db.review.findOne(
    { username: req.body.username, tmdbId: req.body.tmdbId },
    (error, data) => {
      //* Validation: check if the user already wrote a review for the same movie
      if (data) {
        return next(
          new ErrorFactory(
            400,
            "You already wrote a review for the same movie. Please update your review, not create a new one for the same movie."
          )
        );
      }

      db.review.insert(req.body, (error, data) => {
        res.status(200).json({
          status: "success",
          message: "Successfully created a review!",
          data,
        });
      });
    }
  );
});

//! ROUTE: Get all reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  db.review.find({}, (error, data) => {
    res.status(200).json({
      status: "success",
      message: "Successfully got all reviews!",
      data,
    });
  });
});

//! ROUTE: Get reviews by movie
exports.getReviewsByMovieId = catchAsync(async (req, res, next) => {
  console.log(req.params);
  db.review.find({ tmdbId: Number(req.params.tmdbId) }, (error, data) => {
    res.status(200).json({
      status: "success",
      message: !data.length
        ? "There is no review yet for this movie or there is no such a movie."
        : `Successfully got reviews!`,
      data,
    });
  });
});

//! ROUTE: Get reviews by user id
exports.getReviewByUserId = catchAsync(async (req, res, next) => {
  db.review.find({ userId: req.params.userId }, (error, data) => {
    res.status(200).json({
      status: "success",
      message: !data.length
        ? "There is no review yet for this movie or there is no such a user."
        : `Successfully got reviews!`,
      data,
    });
  });
});

//! ROUTE: Update a review
exports.updateReviewById = catchAsync(async (req, res, next) => {
  // Filter user's input
  const filteredBody = {};
  for (key in req.body) {
    if (key === "rating" || key === "comment") {
      filteredBody[key] = req.body[key];
    }
  }

  db.review.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.params.reviewId) },
      update: {
        $set: filteredBody,
      },
      new: true,
    },
    (error, data) => {
      if (!data) {
        return next(
          new ErrorFactory(
            400,
            "Failed to update the review. There is no such a review or content you tried to update."
          )
        );
      }
      res.status(200).json({
        status: "success",
        message: "Successfully updated the review!",
        data,
      });
    }
  );
});

//! ROUTE: Delete a review
exports.deleteReviewById = catchAsync(async (req, res, next) => {
  db.review.remove(
    { _id: mongojs.ObjectID(req.params.reviewId) },
    (error, data) => {
      if (!data.n) {
        return next(
          new ErrorFactory(
            400,
            "Failed to delete the review. There is no such a review to delete."
          )
        );
      }
      res.status(200).json({
        status: "success",
        message: "Successfully deleted the review!",
        data,
      });
    }
  );
});
