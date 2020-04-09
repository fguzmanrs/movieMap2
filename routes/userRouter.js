const express = require("express");
// const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// const reviewController = require("../controllers/reviewController");

const router = express.Router();

//! APIs
//* Authentication Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.get("/resetPassword/:token", authController.resetPassword);

//* Get all users or one user
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserInfo);

//* Update user account info + profile photo
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizePhoto,
  userController.updateMe
);

//* Update password(seperated from update user account API becuase of authentication)
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

//* Update user's movies (myFavoriteMovies || myReviewedMovies || myWatchlist)
router.patch(
  "/addTo/:addTo/movieId/:movieId",
  authController.protect,
  userController.addMyMovie
);

// Create a reivew(grade: like(1), none(0), dislike(-1))
// router.post("/review/:userId/:movieId/:grade", reviewController.postReview);

//!-----------------------------------------------------------------------------
//! All the put myFavoriteMovies, myReviewedMovies, myWatchlist APIs are integrated into addMyMovie api.
//!-----------------------------------------------------------------------------

// router.put("/:userId/recommended", userController.updateMyRecommendedMovies);
// router.put("/:userId/toprated", userController.updateMyTopRatedMovies);

// CRUD: DELETE
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
