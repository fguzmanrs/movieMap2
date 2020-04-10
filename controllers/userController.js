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
  //username, firstname, lastname

  //* Save file's name to req.body
  if (req.file) req.body.photo = req.file.filename;

  db.user.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.user._id) },
      update: {
        $set: req.body,
      },
      new: true,
    },
    (error, data) => {
      if (error) {
        return next(
          new ErrorFactory(
            500,
            "Error occurred during updating user's account info."
          )
        );
      }

      console.log("🍉data", data);

      if (!data) {
        return next(
          new ErrorFactory(500, "user's account info cannot be updated.")
        );
      }

      res.status(200).json({
        status: "success",
        message: "Successfully updated account info!",
        data: {
          user: data,
          photo: req.file.filename,
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
      if (error) {
        return next(
          new ErrorFactory(
            500,
            "Error occured during getting user info for GET USER INFO"
          )
        );
      }

      if (!data) {
        return next(
          new ErrorFactory(
            400,
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
    if (error) {
      return next(
        new ErrorFactory(
          500,
          "Error occured during getting all users info for GET ALL USERS"
        )
      );
    }

    res.status(200).json({
      status: "success",
      message: "Successfully get user's info!",
      data,
    });
  });
});

//! Route: myFavoriteMovies, myReviewedMovies, myWatchlist
exports.addMyMovie = catchAsync(async (req, res, next) => {
  // addTo =  one of [ favorite || review || watchlist ]
  const { addTo, movieId } = req.params;

  const addToCategory =
    addTo === "favorite"
      ? "MyFavoriteMovies"
      : addTo === "review"
        ? "MyReviewedMovies"
        : addTo === "watchlist"
          ? "myWatchList"
          : "";

  db.user.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.user._id) },
      update: {
        $push: { [addToCategory]: movieId },
      },
      new: true,
    },
    (error, data) => {
      if (error) {
        return next(
          new ErrorFactory(
            500,
            "Error occured during updating user's movies(myFavoriteMovies, myReviewedMovies, myWatchlist)"
          )
        );
      }

      res.status(200).json({
        status: "success",
        message: `Successfully added to ${addTo} movie!`,
        data,
      });
    }
  );
});

//! Route : get user's myFavoriteMovies || myReviewedMovies || myWatchlist
//! Each movie doc has to be populated with movie info so frontend team can get actual data not just doc ids.
// exports.getMyMovies = catchAsync(async (req, res, next) => {
// })

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

exports.updateMyRecommendedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyRecommendedMovies::req.params: ", req.params);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myRecommendedMovies: req.params.myRecommendedMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.updateMyTopRatedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyTopRatedMovies::req.params: ", req.params);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myTopRatedMovies: req.params.myTopRatedMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

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


// TODO
exports.forYouBecause = catchAsync(async (req, res, next) => {
  console.log("forYouBecause::req.params: ", req.params);
  const { reason, movieId } = req.params;
  let tmdbUrl = "";

  switch (reason) {
    case 'youWatched':
    case 'youLiked':
      tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      break;
    case 'youMightLike':
      tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      break;
    default:
      console.log(`forYouBecause::error: reason = ['youWatched', 'youLiked', 'youMightLike']?`)
      return res.status(404).end();
  }

  const movies = await axios(tmdbUrl);
  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results,
  });
});

exports.removeMovieFromMyList = catchAsync(async (req, res, next) => {
  console.log("removeMovieFromMyList::req.params: ", req.params);
  const { movieId, myList, userId } = req.params;

  db.user.update({ _id: mongojs.ObjectID(userId) }, { $pull: { [myList]: parseInt(movieId) } }, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) {
      console.log(`removeMovieFromListByUserId::error: myList = ['myWatchList', 'myFavoriteMovies', 'myRecommendedMovies', 'myTopRatedMovies', 'myReviewedMovies']?`);
      return res.status(404).end();
    }
    else res.status(200).json(data);
  });
});

// CRUD: DELETE
exports.deleteUserById = catchAsync(async (req, res, next) => {
  console.log("deleteUserById::req.params: ", req.params);
  db.user.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
});
