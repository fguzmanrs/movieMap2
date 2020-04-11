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

//! Required APIs : Recommend personalized movies
// 1. Because you watched "<movie name>"... (recommend movies that are similar to user's watchlist movie that lately added to myWatchlist)
// 2. Because you liked "<movie name>"... (recommend movies that are similar to user's favorite movie that lately added to myFavoriteMovies)
// 3. You might like... (recommend movies that are similar to user's top rated movie of myReviewedMovies)
// :reason = ['youWatched', 'youLiked', 'youMightLike']
router.get(
  "/foryou/because/:reason/movie/:movieId",
  authController.protect,
  userController.forYouBecause
);

// 4. Delete one movie from array of myFavoriteMovies, myReviewedMovies, myWatchlist
//// :myList = ['myWatchList', 'myFavoriteMovies', 'myRecommendedMovies', 'myTopRatedMovies', 'myReviewedMovies']
// :myList = ['myWatchList', 'myFavoriteMovies', 'myReviewedMovies']
router.delete(
  "/:movieId/from/:myList",
  authController.protect,
  userController.removeMovieFromMyList
);

// 5. Get user's populated myFavoriteMovies || myReviewedMovies || myWatchlist
// TODO: 2020-04-10: Still working on it. -- Francisco Ortiz
router.get("/populate/:myList",movieController.populateMyList);

// CRUD: DELETE
router.delete("/:userId", userController.deleteUserById);

// router.put("/:userId/recommended", userController.updateMyRecommendedMovies);
// router.put("/:userId/toprated", userController.updateMyTopRatedMovies);

module.exports = router;
