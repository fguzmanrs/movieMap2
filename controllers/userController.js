const multer = require("multer");
const sharp = require("sharp");

const ErrorFactory = require("../utill/errorFactory");
const catchAsync = require("../utill/catchAsync");
var db = require("../models");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = encodeURI("mongodb+srv://user_moviemap2:mIqinYfAq5BCCWu3@cluster0-kstvt.mongodb.net/moviemap2?retryWrites=true&w=majority");
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("mongoDb::userController::error:", error);
});
db.on("connect",function() {
  console.log("mongoDb::userController::connected");
  console.log("userController::" + databaseUrl +"::"+ collections);
});
db.runCommand({ping: 1}, function (err, res) {
  console.log("mongoDb::userController::ping");
	if(!err && res.ok) console.log("movieController::up&running");
});
// end of: mongodb initialization

//! Image uploader Multer setting
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new ErrorFactory("This is not an image. Please upload only image", 400),
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
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  const photo = await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 70 })
    .toFile(`public/images/users/${req.file.filename}`);

  console.log("📸", photo);

  next();
});

//! Route: update user's info
exports.updateMe = catchAsync(async (req, res, next) => {
  console.log("📁", req.file);
  console.log("👤", req.body);
  console.log("👩‍💻", req.user);

  //* If use tried to update password, return error.
  if (req.body.password) {
    return next(
      new ErrorFactory(
        "This is not for password update. Please use updatePassword API endpoint."
      ),
      400
    );
  }

  //? Filter out the fileds that not allowed to update
  //username, firstname, lastname

  //* Save file's name to req.body
  if (req.file) req.body.photo = req.file.filename;

  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
  {
    $set: {
      email: req.body.lastName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      settings: req.body.settings,
      myFavoriteMovies: req.body.myFavoriteMovies,
      myRecommendedMovies: req.body.myRecommendedMovies,
      myTopRatedMovies: req.body.myTopRatedMovies,
      myReviewedMovies: req.body.myReviewedMovies,
      myWatchList: req.body.myWatchList
    }
  },
  (error, data) => {
    if (error) res.send(error);
    else {res.status(200).json({
      status: "success",
      message: "Successfully updated account info!",
      data: {
        user: updatedUser,
        photo: req.file.filename
      }
    })}
  });
  
  // const updatedUser = await db.user
  //   .update(req.body, {
  //     where: { id: req.user.id }
  //     // returning: true,
  //     // plain: true
  //   })
  //   .then(() => {
  //     // Sequealize doesn't support returning the updated object for mySQL so call another api for it.
  //     return db.user.findOne({ where: { id: req.user.id } });
  //   });

  // res.status(200).json({
  //   status: "success",
  //   message: "Successfully updated account info!",
  //   data: {
  //     user: updatedUser,
  //     photo: req.file.filename
  //   }
  // });
});

//! Route: get user's detail info
exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

console.log("getUserById::req.body: ", req.body);
const { id } = req.params;

db.user.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
  if (error) res.send(error);
  else res.send(data);
});
})

// begin of: CRUD with mongodb
// CRUD: CREATE (insert)
// begin of: mongodb createUser
// TODO: apply encryption before saving password
// exports.createUser = catchAsync(async (req, res, next) => {
//   console.log("createUser::req.body: ", req.body);
//   db.user.insert(req.body, (error, data) => {
//     if (error) res.send(error);
//     else res.send(data);
//   });
// });
// end of: mongodb createUser

//! Route: get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // db.user.findAll().then(function(result) {
  //   if (result.affectedRows == 0) {
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).json(result);
  //   }
  // });

  console.log("getUserAll::req.body: ", req.body);
  db.user.find({}, (error, data) => {
    if (error) res.send(error);
    else res.json(data);
  });
});

//! Route: get user's watchlist
// exports.getMyWatchList = catchAsync(async (req, res, next) => {
//   const { userId } = req.params;
// CRUD: READ (findOne, find[All])
// begin of: mongodb getUserById
// exports.getUserById = catchAsync(async (req, res, next) => {
//   console.log("getUserById::req.body: ", req.body);
//   const { id } = req.params;
//   db.user.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
//     if (error) res.send(error);
//     else res.send(data);
//   });
// });
// end of: mongodb getUserInfo

// begin of: mongodb getUserAll
// exports.getUserAll = catchAsync(async (req, res, next) => {
//   console.log("getUserAll::req.body: ", req.body);
//   db.user.find({}, (error, data) => {
//     if (error) res.send(error);
//     else res.json(data);
//   });
// });
// end of: mongodb getUserAll

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
//       if (error) res.send(error);
//       else res.send(data);
//     });
// });

// TODO: apply encryption before saving password
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  console.log("updateMyPassword::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { password: req.body.password } }, // TODO: apply encryption before saving password
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyFavoriteMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyFavoriteMovies::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { myFavoriteMovies: req.body.myFavoriteMovies } },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyRecommendedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyRecommendedMovies::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { myRecommendedMovies: req.body.myRecommendedMovies } },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyTopRatedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyTopRatedMovies::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { myTopRatedMovies: req.body.myTopRatedMovies } },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyReviewedMovies = catchAsync(async (req, res, next) => {
  console.log("updateMyReviewedMovies::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { myReviewedMovies: req.body.myReviewedMovies } },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyWatchList = catchAsync(async (req, res, next) => {
  console.log("updateMyWatchList::req.body: ", req.body);
  db.user.update({ _id: mongojs.ObjectId(req.params.id) },
    { $set: { myWatchList: req.body.myWatchList } },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

// CRUD: DELETE
exports.deleteUserById = catchAsync(async (req, res, next) => {
  console.log("deleteUserById::req.body: ", req.body);
  db.user.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  }
  );
})
