const multer = require("multer");
const sharp = require("sharp");

const ErrorFactory = require("../util/errorFactory");
const catchAsync = require("../util/catchAsync");

const axios = require("axios");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = encodeURI(
  "mongodb+srv://user_moviemap2:mIqinYfAq5BCCWu3@cluster0-kstvt.mongodb.net/moviemap2?retryWrites=true&w=majority"
);
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", (error) => {
  console.log("mongoDb::userController::error:", error);
});
db.on("connect", function () {
  console.log("mongoDb::userController::connected");
  console.log("userController::" + databaseUrl + "::" + collections);
  // db.user.insert({"username":"ffortizn","password":"1234567","email":"ffortizn@gmail.com","firstName":"Fernando","lastName":"Nicolas"});
});
db.runCommand({ ping: 1 }, function (err, res) {
  console.log("mongoDb::userController::ping");
  if (!err && res.ok) console.log("movieController::up&running");
});
// end of: mongodb initialization

//! My movie list name validation function
const myListChecker = function (myList, next) {
  const MyListFullName =
    myList === "favorite"
      ? "myFavoriteMovies"
      : myList === "review"
      ? "myReviewedMovies"
      : myList === "watchlist"
      ? "myWatchList"
      : "";

  if (!MyListFullName) {
    return next(
      new ErrorFactory(
        400,
        "Please enter a valid user's movie category name.(favorite or review or watchlist)"
      )
    );
  }
  return MyListFullName;
};

//! Image uploader Multer setting
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new ErrorFactory(400, "This is not an image. Please upload only image"),
      false
    );
  }
};

// const upload = multer({ dest: "public/images/users" });
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//! Middleware: getting an image file(key name: 'photo' in form-data) and save the file info to req.file
exports.uploadUserPhoto = upload.single("photo");

//! Middleware: resizing, converting, saving the photo to server's file system(public/~)
exports.resizePhoto = catchAsync(async (req, res, next) => {
  console.log("🥦req.file:", req.file);
  if (!req.file) return next();

  //* Create file's name and save it to req
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  const photo = await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 70 })
    .toFile(`public/images/users/${req.file.filename}`);

  console.log("📸", photo);

  next();
});

//! Route: update user's account info : NOT PASSWORD, EMAIL, USERNAME
exports.updateMe = catchAsync(async (req, res, next) => {
  console.log("📁", req.file);
  console.log("👤", req.body);
  console.log("👩‍💻", req.user);

  //* If a user tried to update password with this route, return error.
  if (req.body.password) {
    return next(
      new ErrorFactory(
        400,
        "This is not for password update. Please use updatePassword API endpoint."
      )
    );
  }

  //? Filter out the fileds that not allowed to update
  const filteredBody = {};
  for (key in req.body) {
    if (key === "username" || key === "firstName" || key === "lastName") {
      filteredBody[key] = req.body[key];
    }
  }

  //* Save file's name to req.body
  if (req.file) filteredBody.photo = req.file.filename;

  console.log("🍌filteredBody", filteredBody);

  db.user.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.user._id) },
      update: {
        $set: filteredBody,
      },
      new: true,
    },
    (error, data) => {
      console.log("🍉updated data", data);

      if (!data) {
        return next(
          new ErrorFactory(
            404,
            "Failed to update user's info. There is no such a user or content field that you tried to update."
          )
        );
      }

      res.status(200).json({
        status: "success",
        message: "Successfully updated account info!",
        data: {
          user: data,
          photo: req.file ? req.file.filename : req.user.photo,
        },
      });
    }
  );
});

//! Route: get user's detail info
exports.getUserInfo = catchAsync(async (req, res, next) => {
  db.user.findOne(
    { _id: mongojs.ObjectId(req.params.userId) },
    (error, data) => {
      if (!data) {
        return next(
          new ErrorFactory(
            404,
            "There is no such a user in DB. Try again with a valid user id"
          )
        );
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get user's info!",
        data,
      });
    }
  );
});

//! Route: get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // console.log("getUserAll::req.params: ", req.params);
  db.user.find({}, (error, data) => {
    res.status(200).json({
      status: "success",
      message: "Successfully get user's info!",
      data,
    });
  });
});

//! Route: add a movie to user's ['myWatchList', 'myFavoriteMovies', 'myReviewedMovies']
exports.addMyMovie = catchAsync(async (req, res, next) => {
  // addTo =  one of [ favorite || review || watchlist ]
  const { addTo, movieId } = req.params;

  //* Validate my list name
  const addToMyList = myListChecker(addTo, next);
  if (!addToMyList) return;

  //* Validate duplicated movieId(tmdbId)
  db.user.findOne({ _id: mongojs.ObjectId(req.user._id) }, (error, data) => {
    console.log("🍈user data: ", data);
    if (data[addToMyList].includes(parseInt(movieId))) {
      return next(
        new ErrorFactory(
          400,
          `You already added the same movie to your ${addTo} movies`
        )
      );
    }

    //* Save a movie to the list
    db.user.findAndModify(
      {
        query: { _id: mongojs.ObjectId(req.user._id) },
        update: {
          $push: { [addToMyList]: parseInt(movieId) },
        },
        new: true,
      },
      (error, data) => {
        console.log(addToMyList);
        res.status(200).json({
          status: "success",
          message: `Successfully added to my ${addTo} movies!`,
          data,
        });
      }
    );
  });
});

//! ROUTE: Recomend movies to specific user
exports.forYouBecause = catchAsync(async (req, res, next) => {
  console.log("forYouBecause::req.params: ", req.params);
  const { reason, movieId } = req.params;
  let tmdbUrl = "";

  switch (reason) {
    case "youWatched":
    case "youLiked":
      tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
      break;
    case "youMightLike":
      tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
      break;
    default:
      console.log(
        `forYouBecause::error: reason = ['youWatched', 'youLiked', 'youMightLike']?`
      );
      return res.status(404).end();
  }

  const movies = await axios(tmdbUrl);
  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
  });
});

//! Route: Remove a movie from user's ['myWatchList', 'myFavoriteMovies', 'myReviewedMovies']
exports.removeMovieFromMyList = catchAsync(async (req, res, next) => {
  // console.log("removeMovieFromMyList::req.params: ", req.params);
  //? user's info is already saved in req.user by passing through authController's Protect middleware
  //? all errors that are not handled here will be catched in global error handler through catchAsync

  const { movieId, myList } = req.params;

  //* Validate entered my list name
  const myListFullName = myListChecker(myList, next);
  if (!myListFullName) return;

  //* Validate duplicated movieId(tmdbId)
  db.user.findOne({ _id: mongojs.ObjectId(req.user._id) }, (error, data) => {
    if (!data[myListFullName].includes(parseInt(movieId))) {
      return next(
        new ErrorFactory(
          400,
          `That movie id doesn't exist in your your ${myList} movies. Please check again your movie id to delete.`
        )
      );
    }

    //* Delete a move id from my movie list and return the updated doc
    db.user.findAndModify(
      {
        query: { _id: mongojs.ObjectId(req.user._id) },
        update: {
          $pull: { [myListFullName]: parseInt(movieId) },
        },
        new: true,
      },
      (error, data) => {
        res.status(200).json({
          status: "success",
          message: `Successfully deleted a movie from my ${myList} movie!`,
          data,
        });
      }
    );
  });

  // db.user.update(
  //   { _id: mongojs.ObjectID(userId) },
  //   { $pull: { [myList]: parseInt(movieId) } },
  //   (error, data) => {
  //     // if (error) {
  //     //   console.log(`removeMovieFromListByUserId::error: myList = ['myWatchList', 'myFavoriteMovies', 'myRecommendedMovies', 'myTopRatedMovies', 'myReviewedMovies']?`);
  //     // }

  //     res.status(200).json(data);
  //   }
  // );
});

//! ROUTE: Delete a user
exports.deleteUserById = catchAsync(async (req, res, next) => {
  // console.log("deleteUserById::req.params: ", req.params);
  db.user.remove(
    { _id: mongojs.ObjectID(req.params.userId) },
    (error, data) => {
      if (!data.n) {
        return next(
          new ErrorFactory(
            404,
            "There is no such a user. Please check again the user id to delete"
          )
        );
      }

      res.status(200).json({
        status: "success",
        message: `Successfully deleted a user!`,
        data,
      });
    }
  );
});

//! ROUTE: populate my lists(myFavoriteMovies, myReviewedMovies, myWatchlist)
// total 3 movie lists in each user's doc
// Purpose: make each list [movie id, movie id, movie id...] to [{movie data}, {movie data}...]
exports.populateMyList = catchAsync(async (req, res, next) => {
  //* 1. Get a user's info first
  db.user.findOne(
    { _id: mongojs.ObjectId(req.user._id) },
    async (error, user) => {
      const { myFavoriteMovies, myReviewedMovies, myWatchList } = user;

      console.log("🥝lists:", myFavoriteMovies, myReviewedMovies, myWatchList);

      //* 2. Populate each movie list and add it to user's doc(user)
      // If none of that exsits, skip
      if (myFavoriteMovies || myReviewedMovies || myWatchList) {
        switch (true) {
          case myFavoriteMovies.length > 0:
            await populateAndAddToDoc(
              myFavoriteMovies,
              user,
              "myFavoriteMovies",
              next
            );
          case myReviewedMovies.length > 0:
            await populateAndAddToDoc(
              myReviewedMovies,
              user,
              "myReviewedMovies",
              next
            );
          case myWatchList.length > 0:
            await populateAndAddToDoc(myWatchList, user, "myWatchList", next);
        }
      }

      res.status(200).json({
        status: "success",
        message:
          "Successfully got a user's info including all movie list data populated.",
        data: user,
      });
    }
  );
});

//! Helper for population
async function populateAndAddToDoc(array, data, listName, next) {
  //* 1. Convert id arry to url array.
  // [movie id , ...] => [url , ...]
  const urlArr = array.map(
    (id) =>
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  try {
    //* 2. Conver url array to Axios promises array
    // [url , ...] => [promise , ...]
    const axiosArr = urlArr.map(async (url) =>
      axios
        .get(url)
        .catch((err) =>
          console.log("📍 Invalid url(movieId): ", err.request.path)
        )
    );

    //* 3. Await promises
    // [ {promise result} , ... ]
    let result = await Promise.all(axiosArr);

    // console.log("🥥", axiosArr);
    // console.log("🌽", result[0].data, result[1].data);

    //* 4. Extract only movie data from each returned promise result and attach it to each user's my list
    const dataArr = result.map((el) => el.data);
    data[listName] = dataArr;

    return data[listName];
  } catch (err) {
    // console.log("🐷There is invalid movieId in the list: ", err);
    return next(
      new ErrorFactory(
        400,
        `There is an invalid movieId in ${listName} so that it cannot bring the user's detail info.`
      )
    );
  }
}

//! Unused APIs.
// exports.updateMyFavoriteMovies = catchAsync(async (req, res, next) => {
//   console.log("updateMyFavoriteMovies::req.params: ", req.params);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myFavoriteMovies: req.params.myFavoriteMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// exports.updateMyRecommendedMovies = catchAsync(async (req, res, next) => {
//   console.log("updateMyRecommendedMovies::req.params: ", req.params);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myRecommendedMovies: req.params.myRecommendedMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// exports.updateMyTopRatedMovies = catchAsync(async (req, res, next) => {
//   console.log("updateMyTopRatedMovies::req.params: ", req.params);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myTopRatedMovies: req.params.myTopRatedMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// exports.updateMyReviewedMovies = catchAsync(async (req, res, next) => {
//   console.log("updateMyReviewedMovies::req.params: ", req.params);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myReviewedMovies: req.params.myReviewedMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// exports.updateMyWatchList = catchAsync(async (req, res, next) => {
//   console.log("updateMyWatchList::req.params: ", req.params);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myWatchList: req.params.myWatchList } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// async function getMovieByIdFromApi(movieId) {
//   const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
//   const data = await axios(tmdbUrl)
//     .then(function (res) {
//       return res.data;
//     }).catch(function (error) {
//       console.log(error);
//     });
// }

// myFavoriteMovies.forEach(async movieId => {
//   tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
//   await axios(tmdbUrl).then(function (res) {
//     myFavoriteMoviesData.push(res.data);
//   });
// });
