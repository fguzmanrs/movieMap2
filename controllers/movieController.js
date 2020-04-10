const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

const axios = require("axios");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = encodeURI(
  "mongodb+srv://user_moviemap2:mIqinYfAq5BCCWu3@cluster0-kstvt.mongodb.net/moviemap2?retryWrites=true&w=majority"
);
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", (error) => {
  console.log("mongoDb::movieController::error:", error);
});
db.on("connect", function () {
  console.log("mongoDb::movieController::connected");
  console.log("movieController::" + databaseUrl + "::" + collections);
});
db.runCommand({ ping: 1 }, function (err, res) {
  console.log("mongoDb::movieController::ping");
  if (!err && res.ok) console.log("movieController::up&running");
});
// end of: mongodb initialization

//! Get the recent movies(within 1 year)
// required parameter: none
exports.getRecentMovies = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // 2 digit
  const date = `0${currentDate.getDate()}`.slice(-2); // 2 digit
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneYearBefore}`;

  const movies = await axios(tmdbUrl);

  // save database
  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
  });
});

exports.getRecentMoviesFromApi = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // 2 digit
  const date = `0${currentDate.getDate()}`.slice(-2); // 2 digit
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneYearBefore}`;
  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
  });
});

exports.getRecentMoviesFromDb = catchAsync(async (req, res, next) => {
  console.log("getRecentMoviesFromDb::req.params: ", req.params);
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // 2 digit
  const date = `0${currentDate.getDate()}`.slice(-2); // 2 digit
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  db.movie.find({ releaseDate: { $gte: oneYearBefore } }, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
});

exports.getMovieByKeywordFromDb = catchAsync(async (req, res, next) => {
  console.log("getMovieByKeywordFromDb::req.params: ", req.params);

  db.movie.find(
    { keywords: { $regex: req.params.keyword, $options: "i" } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.getMovieByGenreFromDb = catchAsync(async (req, res, next) => {
  console.log("getMovieByGenreFromDb::req.params: ", req.params);

  db.movie.find(
    { genre: { $regex: req.params.genre, $options: "i" } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

//! Get movie info: detail + keyword
// required parameter: TMDB id
exports.getMovieDetailFromApi = catchAsync(async (req, res, next) => {
  console.log("getMovieFromApi::req.params: ", req.params);

  const tmdbId = req.params.tmdbId;
  const tmdbUrlDetail = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbUrlKeyword = `https://api.themoviedb.org/3/movie/${tmdbId}/keywords?api_key=${process.env.TMDB_API_KEY}`;

  const detail = await axios(tmdbUrlDetail);
  const keyword = await axios(tmdbUrlKeyword);

  detail.data.keywords = keyword.data.keywords;

  res.status(200).json({
    status: "success",
    data: detail.data,
  });
});

//! Get on demand service providers for specific movie(Netflix, Amazon prime etc)
// required parameter: movie title
exports.getProviders = catchAsync(async function (req, res, next) {
  const movieToSearch = req.params.tmdbId;

  const result = await axios({
    method: "GET",
    url:
      "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.UTELLY_API_KEY,
    },
    params: {
      country: "US",
      source_id: movieToSearch,
      source: "tmdb",
    },
  });

  const providersArr = result.data.collection.locations;
  console.log("🍈 provider results: ", providersArr);

  // Filter the movies having the exact same name with the search term
  // (* Utelly DB provides a partial search so all similar name's movies are searched.)
  // const filteredMovie = movies.data.results.filter(
  //   el => el.name.toLowerCase() === movieToSearch.toLowerCase()
  // );

  // Error handling : If there is no data user are searching, create custom error
  // if (result.data.collection.locations.length === 0) {
  //   return next(
  //     new ErrorFactory(
  //       404,
  //       "There is no such a data you requested. Please provide with the correct info."
  //     )
  //   );
  // }

  res.status(200).json({
    status: "success",
    data: providersArr,
  });
});

//! Recommend movies based on a genre id, keyword id
// required parameter: TMDB genre id, keyword id
// Reduced to TMDB genre id (by dropdown menu)
exports.getRecommendation = catchAsync(async (req, res, next) => {
  // const { genreId, keywordId } = req.params;
  // const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_keywords=${keywordId}`;
  console.info("movieController.getRecommendation();");
  const { genreId } = req.params;
  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    data: movies.data,
  });
});

//! Post a movie to DB
// required info via req.body: title, overview, genreId, popularity, posterPath, releaseDate, keywordId(stringified array), tmdbRate, tmdbId(stringified array)
// exports.createMovie = catchAsync(async (req, res, next) => {
//   console.log("🍉 req.body: ", req.body);

//   const createdMovie = await db.movie.create(req.body);

//   res.status(201).json({
//     status: "success",
//     data: createdMovie
//   });
// });

// exports.getMovieByKeyword = catchAsync(async (req, res, next) => {
//   const { keywordId } = req.params;
//   db.movie
//     .findAll({
//       where: {
//         keywordId: { [Op.like]: "%" + keywordId + "%" }
//       }
//     })
//     .then(function(result) {
//       if (result.affectedRows == 0) {
//         return res.status(404).end();
//       } else {
//         res.status(200).json(result);
//       }
//     });
// });

// exports.getMovieByGenre = catchAsync(async (req, res, next) => {
//   const { genreId } = req.params;
//   db.movie
//     .findAll({
//       where: {
//         keywordId: { [Op.like]: "%" + keywordId + "%" }
//       }
//     })
//     .then(function(result) {
//       if (result.affectedRows == 0) {
//         return res.status(404).end();
//       } else {
//         res.status(200).json(result);
//       }
//     });
// });

// CREATE
exports.createMovie = catchAsync(async (req, res, next) => {
  console.log("createMovie::req.params: ", req.params);
  db.movie.insert(req.params, (error, data) => {
    if (error) res.send(error);
    // else res.json(data);
    // if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
  // console.log("🍉 req.body: ", req.body);
  // const createdMovie = await db.movie.create(req.body);
  // res.status(201).json({
  //   status: "success",
  //   data: createdMovie
  // });
});

// CRUD: READ (findOne, find[All])
// exports.getMovieById = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   //![Sequelize] Need to get user info from user table
//   db.watchlist.findOne({ where: { id: id } }).then(function(result) {
//     if (result.affectedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).json(result);
//     }
//   });
// });

exports.getMovieById = catchAsync(async (req, res, next) => {
  console.log("getMovieById::req.params: ", req.params);
  const { id } = req.params;

  db.movie.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});

//! Get similar movies : for Because you liked " *** " / Because you watched " *** "
// Get the most recently added watchlist movie or favorited movie first then request this API with that movie id
exports.getSimilarMovies = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;

  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
    // db.movie.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
    //   // if (error) res.send(error);
    //   // else res.send(data);
    //   if (error) return res.status(404).end();
    //   else res.status(200).json(data);
    // });
  });
});

//! Search movies by title
exports.searchMoviesByTitle = catchAsync(async (req, res, next) => {
  const { title } = req.params;

  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
  });
});

//! Search movies by keyword
exports.searchMoviesByKeyword = catchAsync(async (req, res, next) => {
  //* 1. Convert keyword to keyword id
  const { keyword } = req.params;

  const tmdbUrlForKeywords = `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.TMDB_API_KEY}&query=${keyword}&page=1`;

  const resultForKeywords = await axios(tmdbUrlForKeywords);

  //* 2. Get exactly matched keyword or first keyword from array
  const keywordsArr = resultForKeywords.data.results;

  let matchedKeywordSet = keywordsArr.find((el) => el.name === keyword);

  // If there is no keyword exactly matched, get just first keyword or send error
  if (!matchedKeywordSet && keywordsArr[0]) {
    matchedKeywordSet = keywordsArr[0];
  } else if (!matchedKeywordSet && !keywordsArr[0]) {
    return next(
      new ErrorFactory(404, "Invalid keyword. Please enter the valid keyword.")
    );
  }

  const keywordId = matchedKeywordSet.id;

  //* 3. Search movies by keyword id
  const tmdbUrlForDiscover = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=${keywordId}`;

  const moviesByKeyword = await axios(tmdbUrlForDiscover);

  res.status(200).json({
    status: "success",
    length: moviesByKeyword.data.results.length,
    data: moviesByKeyword.data.results,
  });
});

exports.getMovieAll = catchAsync(async (req, res, next) => {
  console.log("getMovieAll::req.params: ", req.params);
  db.movie.find({}, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
});

// CRUD: UPDATE
exports.updateMovieById = catchAsync(async (req, res, next) => {
  console.log("updateMovieById::req.params: ", req.params);
  db.movie.update(
    { _id: mongojs.ObjectId(req.params.id) },
    {
      $set: {
        url: req.params.url,
        title: req.params.title,
        overview: req.params.overview,
        genre: req.params.genre,
        popularity: req.params.popularity,
        posterPath: req.params.posterPath,
        releaseDate: req.params.releaseDate,
        keywords: req.params.keywords,
        tmdbId: req.params.tmdbId,
        tmdbRate: req.params.tmdbRate,
      },
    },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

// CRUD: DELETE
exports.deleteMovieById = catchAsync(async (req, res, next) => {
  console.log("deleteMovieById::req.params: ", req.params);
  db.movie.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
});
