const multer = require("multer");
const sharp = require("sharp");

const ErrorFactory = require("../utill/errorFactory");
const catchAsync = require("../utill/catchAsync");
var db = require("../models");

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

//! Middleware getting an image file(key name: 'photo' in form-data) and save the file info to req.file
exports.uploadUserPhoto = upload.single("photo");

//! Middleware resizing, converting, saving the photo to server's file system(public/~)
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

  //! Filter out not the fileds that not allowed to update
  //username, firstname, lastname

  //* Save file's name to req.body
  if (req.file) req.body.photo = req.file.filename;

  const updatedUser = await db.user
    .update(req.body, {
      where: { id: req.user.id }
      // returning: true,
      // plain: true
    })
    .then(() => {
      // Sequealize doesn't support returning the updated object for mySQL so call another api for it.
      return db.user.findOne({ where: { id: req.user.id } });
    });

  res.status(200).json({
    status: "success",
    message: "Successfully updated account info!",
    data: {
      user: updatedUser,
      photo: req.file.filename
    }
  });
});

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.user.findOne({ where: { id: userId } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  db.user.findAll().then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getMyWatchList = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.watchlist.findAll({ where: { userId: userId } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.postToMyWatchlist = catchAsync(async (req, res, next) => {
  console.info("userController.postToMyWatchList...");
  const { userId, movieId } = req.params;

  db.watchlist
    .create({
      userId: userId,
      movieId: movieId
    })
    .then(function(result) {
      res.status(200).json(result);
      return catchAsync(req, res, next);
    });
});

exports.removeFromMyWatchlist = catchAsync(async (req, res, next) => {
  const { userId, movieId } = req.params;

  db.watchlist
    .destroy({
      where: {
        userId: userId,
        movieId: movieId
      }
    })
    .then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.status(200).json(result);
    });
});

exports.clearMyWatchlist = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.watchlist
    .destroy({
      where: {
        userId: userId
      }
    })
    .then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.status(200).json(result);
    });
});
