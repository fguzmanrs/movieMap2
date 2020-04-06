const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

const axios = require("axios");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = "moviemap";
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
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
    data: movies.data.results
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
    data: movies.data.results
  });
});

exports.getRecentMoviesFromDb = catchAsync(async (req, res, next) => {
  console.log("getRecentMoviesFromDb::req.body: ", req.body);
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // 2 digit
  const date = `0${currentDate.getDate()}`.slice(-2); // 2 digit
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  db.movie.find({ "releaseDate": { "$gte" : oneYearBefore} }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});

exports.getMovieByKeywordFromDb = catchAsync(async (req, res, next) => {
  console.log("getMovieByKeywordFromDb::req.body: ", req.body);

  db.movie.find({ "keywords": { "$regex" : req.body.keyword, "$options" : "i"} }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});

exports.getMovieByGenreFromDb = catchAsync(async (req, res, next) => {
  console.log("getMovieByGenreFromDb::req.body: ", req.body);

  db.movie.find({ "genre": { "$regex" : req.body.genre, "$options" : "i"} }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});


//! Get movie info: detail + keyword
// required parameter: TMDB id
exports.getMovieDetailFromApi = catchAsync(async (req, res, next) => {
  console.log("getMovieFromApi::req.body: ", req.body);

  const tmdbId = req.params.tmdbId;
  const tmdbUrlDetail = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbUrlKeyword = `https://api.themoviedb.org/3/movie/${tmdbId}/keywords?api_key=${process.env.TMDB_API_KEY}`;

  const detail = await axios(tmdbUrlDetail);
  const keyword = await axios(tmdbUrlKeyword);

  detail.data.keywords = keyword.data.keywords;

  res.status(200).json({
    status: "success",
    data: detail.data
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
      "x-rapidapi-key": process.env.UTELLY_API_KEY
    },
    params: {
      country: "US",
      source_id: movieToSearch,
      source: "tmdb"
    }
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
    data: providersArr
  });
});

//! Recommend movies based on a genre id, keyword id
// required parameter: TMDB genre id, keyword id
// Reduced to TMDB genre id (by dropdown menu)
exports.getRecommendation = catchAsync(async (req, res, next) => {
  // const { genreId, keywordId } = req.params;
  // const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_keywords=${keywordId}`;
  console.info('movieController.getRecommendation();');
  const { genreId } = req.params;
  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    data: movies.data
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
  console.log("createMovie::req.body: ", req.body);
  db.movie.insert(req.body, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
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
  console.log("getMovieById::req.body: ", req.body);
  const { id } = req.params;
  db.movie.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});

exports.getMovieAll = catchAsync(async (req, res, next) => {
  console.log("getMovieAll::req.body: ", req.body);
  db.movie.find({}, (error, data) => {
    if (error) res.send(error);
    else res.json(data);
  });
});

// CRUD: UPDATE
exports.updateMovieById = catchAsync(async (req, res, next) => {
  console.log("updateUserById::req.body: ", req.body);
  db.movie.update({ _id: mongojs.ObjectId(req.params.id) },
    {
      $set: {
        url: req.body.url,
        title: req.body.title,
        overview: req.body.overview,
        genre: req.body.genre,
        popularity: req.body.popularity,
        posterPath: req.body.posterPath,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords,
        tmdbId: req.body.tmdbId,
        tmdbRate: req.body.tmdbRate
      }
    },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

// CRUD: DELETE
exports.deleteMovieById = catchAsync(async (req, res, next) => {
  console.log("deleteMovieById::req.body: ", req.body);
  db.movie.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  }
  );
});

// end of: CRUD with mongodb