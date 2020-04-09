const express = require("express");
const path = require("path");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();


// User APIs: CRUD
// CRUD: CREATE

// When user add a movie to watchlist, post user's preference for movies
// Create a reivew(grade: like(1), none(0), dislike(-1))
router.post("/review/userid/:userId/movieId/:movieId/grade/:grade", reviewController.createReview);
router.post("/review/:userId/:movieId/:grade", reviewController.createReview);

// CRUD: READ
router.get("/reviews/movie/:movieId", reviewController.getReviewByMovieId);
router.get("/reviews/user/:userId", reviewController.getReviewByUserId);
router.get("/my-reviews/:userId", reviewController.getReviewByUserId);

// CRUD: UPDATE
router.put("/reviews/:reviewId", reviewController.updateReviewById);
router.put("/my-reviews/:reviewId", reviewController.updateReviewById);

// CRUD: DELETE
router.delete("/my-reviews/:reviewId", reviewController.deleteReviewById);

module.exports = router;
