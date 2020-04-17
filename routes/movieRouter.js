const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");

const router = express.Router();

//! APIs
// 1. Get the latest popular movies(1 year) for landing page movies
// used api: TMDB - discover > movie discover
router.get("/recent", movieController.getRecentMovies);
// router.get("/recent/api", movieController.getRecentMoviesFromApi);
// router.get("/recent/db", movieController.getRecentMoviesFromDb);

// 2. Get movie details(general info, genre, keywords)
// used api: TMDB - search > search movies by title | movies > get details and keywords by TMDB id
router.get("/:tmdbId", movieController.getMovieDetail);
// router.get("/:tmdbId/api", movieController.getMovieDetailFromApi);

// 3. Get available providers and link to provider's movie page(NetFlix, Amazon Prime...etc)
// used api: Utelly > search by tmdbId and return available providers & url
router.get("/providers/:tmdbId", movieController.getProviders);

//! Search movies by title
router.get("/search/title/:title", movieController.searchMoviesByTitle);

//! Search movies by keyword
router.get("/search/keyword/:keyword", movieController.searchMoviesByKeyword);
//! Search movies by genre
router.get("/search/genre/:genreId", movieController.getRecommendation);

//! Protect below routers : only login user can access below routers
// router.use(authController.protect);

//! Get similar movies
router.get("/similar/:movieId", movieController.getSimilarMovies);

// 4. Recommend movies
// used api: TMDB - discover > movie discover with user's the most hitted genre, keyword
// router.get("/recommend/:genreId/:keywordId", movieController.getRecommendation);

// 5. Create a movie(When user clicks one specific movie, add a movie to 'movie' table)
// router.post("/", movieController.createMovie);

// CRUD: READ - mongo
// router.get("/movie/:movieId", movieController.getMovieById);
// router.get("/movies", movieController.getMovieAll);

// CRUD: UPDATE - mongo
// router.put("/movie/:movieId", movieController.updateMovieById);

// CRUD: DELETE - mongo
// router.put("/delete/:movieId", movieController.updateMovieById);

module.exports = router;
