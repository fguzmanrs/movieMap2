const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = "moviemap";
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});
// end of: mongodb initialization


// begin of: CRUD with mongodb
// CRUD: CREATE (insert)
// begin of: mongodb createUser
// TODO: apply encryption before saving password
exports.createUser = catchAsync(async (req, res, next) => {
  db.user.insert(req.body, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});
// end of: mongodb createUser

// CRUD: READ (findOne, find[All])
// begin of: mongodb getUserById
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  db.user.findOne({_id: mongojs.ObjectId(req.params.id)}, (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});
// end of: mongodb getUserInfo

// begin of: mongodb getUserAll
exports.getUserAll = catchAsync(async (req, res, next) => {
  db.user.find({}, (error, data) => {
    if (error) res.send(error);
    else res.json(data);
  });
});
// end of: mongodb getUserAll

// CRUD: UPDATE
exports.updateUserById = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
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
      else res.send(data);
    });
});

// TODO: apply encryption before saving password
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {password: req.body.password} }, // TODO: apply encryption before saving password
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyFavoriteMovies = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {myFavoriteMovies: req.body.myFavoriteMovies} },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyRecommendedMovies = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {myRecommendedMovies: req.body.myRecommendedMovies} },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyTopRatedMovies = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {myTopRatedMovies: req.body.myTopRatedMovies} },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyReviewedMovies = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {myReviewedMovies: req.body.myReviewedMovies} },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

exports.updateMyWatchList = catchAsync(async (req, res, next) => {
  db.user.update({_id: mongojs.ObjectId(req.params.id)},
    {$set: {myWatchList: req.body.myWatchList} },
    (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    });
});

// CRUD: DELETE
exports.deleteUserById = catchAsync(async (req, res, next) => {
  db.user.remove({_id: mongojs.ObjectID(req.params.id)}, (error, data) => {
      if (error) res.send(error);
      else res.send(data);
    }
  );
});
// end of: CRUD with mongodb