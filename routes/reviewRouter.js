const express = require("express");
const path = require("path");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

// CRUD: CREATE
// router.post("/review/userid/:userId/movieId/:movieId/grade/:grade", reviewController.createReview);
// router.post("/review/:userId/:movieId/:grade", reviewController.createReview);
router.post("/", authController.protect, reviewController.createReview);

// CRUD: READ
router.get("/", reviewController.getAllReviews);
router.get("/byMovie/:tmdbId", reviewController.getReviewsByMovieId);
router.get("/byUser/:userId", reviewController.getReviewByUserId);
// router.get("/my-review/:userId", reviewController.getReviewByUserId);

// CRUD: UPDATE
router.patch("/:reviewId", reviewController.updateReviewById);
// router.put("/my-review/:reviewId", reviewController.updateReviewById);

// CRUD: DELETE
router.delete("/:reviewId", reviewController.deleteReviewById);

module.exports = router;
