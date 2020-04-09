const multer = require("multer");
const sharp = require("sharp");

const ErrorFactory = require("../util/errorFactory");
const catchAsync = require("../util/catchAsync");

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

  db.user.update(
    { _id: mongojs.ObjectId(req.user._id) },
    {
      $set: req.body,
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

      if (!data.nModified) {
        return next(
          new ErrorFactory(
            500,
            "User doesn't exist or user's account info cannot be updated."
          )
        );
      }

      db.user.findOne(
        { _id: mongojs.ObjectId(req.user._id) },
        async (error, data) => {
          if (error) {
            return next(
              new ErrorFactory(
                500,
                "Error occurred during getting updated user's account info."
              )
            );
          }

          const { username, firstName, lastName, email } = data;

          const updatedUser = {
            username,
            firstName,
            lastName,
            email,
          };

          res.status(200).json({
            status: "success",
            message: "Successfully updated account info!",
            data: {
              user: updatedUser,
              photo: req.file.filename,
            },
          });
        }
      );
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
  console.log("getUserAll::req.body: ", req.body);
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

//! Route: get user's watchlist
exports.getMyWatchList = catchAsync(async (req, res, next) => {
  const { userId } = req.params;


//! Route: post user's watchlist
// exports.postToMyWatchlist = catchAsync(async (req, res, next) => {
//   console.info("userController.postToMyWatchList...");
//   const { userId, movieId } = req.params;
// CRUD: UPDATE
// exports.updateUserById = catchAsync(async (req, res, next) => {
//   console.log("updateUserById::req.body: ", req.body);
//   db.user.update({ _id: mongojs.ObjectId(req.params.id) },
//     {
//       $set: {
//         email: req.body.lastName,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         settings: req.body.settings,
//         myFavoriteMovies: req.body.myFavoriteMovies,
//         myRecommendedMovies: req.body.myRecommendedMovies,
//         myTopRatedMovies: req.body.myTopRatedMovies,
//         myReviewedMovies: req.body.myReviewedMovies,
//         myWatchList: req.body.myWatchList
//       }
//     },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     });
// });

exports.updateMyFavoriteMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyFavoriteMovies::req.body: ", req.body);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myFavoriteMovies: req.body.myFavoriteMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.updateMyRecommendedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyRecommendedMovies::req.body: ", req.body);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myRecommendedMovies: req.body.myRecommendedMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.updateMyTopRatedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyTopRatedMovies::req.body: ", req.body);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myTopRatedMovies: req.body.myTopRatedMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.updateMyReviewedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyReviewedMovies::req.body: ", req.body);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myReviewedMovies: req.body.myReviewedMovies } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

exports.updateMyWatchList = catchAsync(async (req, res, next) => {
  console.log("updateMyWatchList::req.body: ", req.body);
  db.user.update(
    { _id: mongojs.ObjectId(req.params.id) },
    { $set: { myWatchList: req.body.myWatchList } },
    (error, data) => {
      // if (error) res.send(error);
      // else res.json(data);
      if (error) return res.status(404).end();
      else res.status(200).json(data);
    }
  );
});

// CRUD: DELETE
exports.deleteUserById = catchAsync(async (req, res, next) => {
  console.log("deleteUserById::req.body: ", req.body);
  db.user.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
    // if (error) res.send(error);
    // else res.json(data);
    if (error) return res.status(404).end();
    else res.status(200).json(data);
  });
});
