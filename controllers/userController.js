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
  const filteredBody = {};
  for (key in req.body) {
    if (key === "username" || key === "firstName" || key === "lastName") {
      filteredBody[key] = req.body[key];
    }
  }

  //* Save file's name to req.body
  if (req.file) filteredBody.photo = req.file.filename;

  db.user.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.user._id) },
      update: {
        $set: filteredBody,
      },
      new: true,
    },
    (error, data) => {
      console.log("🍉data", data);

      if (!data) {
        return next(
          new ErrorFactory(
            404,
            "Failed to update user's info. There is no such a user or content that you tried to update."
          )
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
  // console.log("getUserAll::req.body: ", req.body);
  db.user.find({}, (error, data) => {
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

  if (!addToCategory) {
    return next(
      new ErrorFactory(
        400,
        "Please enter a valid user's movie category name.(favorite or review or watchlist"
      )
    );
  }

  db.user.findAndModify(
    {
      query: { _id: mongojs.ObjectId(req.user._id) },
      update: {
        $push: { [addToCategory]: movieId },
      },
      new: true,
    },
    (error, data) => {
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
//   console.log("updateMyFavoriteMovies::req.body: ", req.body);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myFavoriteMovies: req.body.myFavoriteMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

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

// exports.updateMyReviewedMovies = catchAsync(async (req, res, next) => {
//   console.log("updateMyReviewedMovies::req.body: ", req.body);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myReviewedMovies: req.body.myReviewedMovies } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

// exports.updateMyWatchList = catchAsync(async (req, res, next) => {
//   console.log("updateMyWatchList::req.body: ", req.body);
//   db.user.update(
//     { _id: mongojs.ObjectId(req.params.id) },
//     { $set: { myWatchList: req.body.myWatchList } },
//     (error, data) => {
//       // if (error) res.send(error);
//       // else res.json(data);
//       if (error) return res.status(404).end();
//       else res.status(200).json(data);
//     }
//   );
// });

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
