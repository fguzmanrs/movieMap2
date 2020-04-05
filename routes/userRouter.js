const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

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
router.post("/review/:userId/:movieId/:grade", reviewController.postReview);

// CRUD for watchlist
router.get("/watchlist/:userId", userController.getMyWatchList);
router.post("/watchlist/:userId/:movieId", userController.postToMyWatchlist);
router.put("/watchlist/:userId/:movieId", userController.removeFromMyWatchlist);
router.delete("/watchlist/:userId/", userController.clearMyWatchlist);

module.exports = router;
