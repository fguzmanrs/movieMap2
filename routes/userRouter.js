const express = require("express");
const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// const reviewController = require("../controllers/reviewController");

const router = express.Router();

// Authentification Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// User APIs: CRUD
// CRUD: CREATE
router.post("/user", userController.createUser);

// CRUD: READ
router.get("/:userId", userController.getUserById);
router.get("/users", userController.getUserAll);

// CRUD: UPDATE
router.put("/:userId", userController.updateUserById);
router.put("/:userId/password", userController.updateMyPassword);
router.put("/:userId/favorite", userController.updateMyFavoriteMovies);
router.put("/:userId/recommended", userController.updateMyRecommendedMovies);
router.put("/:userId/toprated", userController.updateMyTopRatedMovies);
router.put("/:userId/reviewed", userController.updateMyReviewedMovies);
router.put("/:userId/watchlist", userController.updateMyWatchList);

// CRUD: DELETE
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
