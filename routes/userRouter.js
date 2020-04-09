const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// const reviewController = require("../controllers/reviewController");

const router = express.Router();

// Authentication Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.get("/resetPassword/:token", authController.resetPassword);

//! APIs
// Get user info
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserInfo);

// Update user info
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizePhoto,
  userController.updateMe
);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

// Create a reivew(grade: like(1), none(0), dislike(-1))
// router.post("/review/:userId/:movieId/:grade", reviewController.postReview);
// User APIs: CRUD
// CREATE
// router.post("/user", userController.createUser);

// READ
// router.get("/:userId", userController.getUserById);
// router.get("/users", userController.getUserAll);

// UPDATE
// router.put("/:userId", userController.updateUserById);
// router.put("/:userId/password", userController.updateMyPassword);

// router.put("/:userId/favorite", userController.updateMyFavoriteMovies);
// router.put("/:userId/recommended", userController.updateMyRecommendedMovies);
// router.put("/:userId/toprated", userController.updateMyTopRatedMovies);
// router.put("/:userId/reviewed", userController.updateMyReviewedMovies);
// router.put("/:userId/watchlist", userController.updateMyWatchList);

// DELETE
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
