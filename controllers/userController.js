const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

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
  // db.user.insert({"username":"ffortizn","password":"1234567","email":"ffortizn@gmail.com","firstName":"Fernando","lastName":"Nicolas"});
});
db.runCommand({ping: 1}, function (err, res) {
  console.log("mongoDb::userController::ping");
	if(!err && res.ok) console.log("movieController::up&running");
});
// end of: mongodb initialization

// begin of: CRUD with mongodb
// CRUD: CREATE (insert)
// begin of: mongodb createUser
// TODO: apply encryption before saving password
exports.createUser = catchAsync(async (req, res, next) => {
  console.log("createUser::req.body: ", req.body);
  db.user.insert(req.body, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});
// end of: mongodb createUser

// CRUD: READ (findOne, find[All])
// begin of: mongodb getUserById
exports.getUserById = catchAsync(async (req, res, next) => {
  console.log("getUserById::req.body: ", req.body);
  const { id } = req.params;
  db.user.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
});
// end of: mongodb getUserInfo

// begin of: mongodb getUserAll
exports.getUserAll = catchAsync(async (req, res, next) => {
  console.log("getUserAll::req.body: ", req.body);
  db.user.find({}, (error, data) => {
    if (error) res.send(error);
    else res.json(data);
  });
});
// end of: mongodb getUserAll

// CRUD: UPDATE
exports.updateUserById = catchAsync(async (req, res, next) => {
  console.log("updateUserById::req.body: ", req.body);
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
      else res.send(data);
    });
});

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
});
// end of: CRUD with mongodb