const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");

// begin of: mongodb initialization
const mongojs = require("mongojs");
const databaseUrl = encodeURI("mongodb+srv://user_moviemap2:mIqinYfAq5BCCWu3@cluster0-kstvt.mongodb.net/moviemap2?retryWrites=true&w=majority");
const collections = ["user", "movie", "review"];
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("mongoDb::reviewController::error:", error);
});
db.on("connect", function () {
    console.log("mongoDb::reviewController::connected");
    console.log("reviewController::" + databaseUrl + "::" + collections);
});
db.runCommand({ ping: 1 }, function (err, res) {
    console.log("mongoDb::reviewController::ping");
    if (!err && res.ok) console.log("reviewController::up&running");
})
// end of: mongodb initialization

// begin of: CRUD with mongodb
// CRUD: CREATE (insert)
// begin of: mongodb createUser
// TODO: apply encryption before saving password
exports.createReview = catchAsync(async (req, res, next) => {
    console.log("createReview::req.body: ", req.body);
    db.user.insert(req.body, (error, data) => {
        // if (error) res.send(error);
        // else res.json(data);
        if (error) return res.status(404).end();
        else res.status(200).json(data);
    });
});

// CRUD: READ
exports.getReviewByMovieId = catchAsync(async (req, res, next) => {
    console.log("getReviewByMovieId::req.body: ", req.body);
    const { id } = req.params;
    db.user.findOne({ "movieId": mongojs.ObjectId(req.params.id) }, (error, data) => {
        // if (error) res.send(error);
        // else res.json(data);
        if (error) return res.status(404).end();
        else res.status(200).json(data);
    });
});

exports.getReviewByUserId = catchAsync(async (req, res, next) => {
    console.log("getReviewByUserId::req.body: ", req.body);
    const { id } = req.params;
    db.user.findOne({ "userId": mongojs.ObjectId(req.params.id) }, (error, data) => {
        // if (error) res.send(error);
        // else res.json(data);
        if (error) return res.status(404).end();
        else res.status(200).json(data);
    });
});


// CRUD: UPDATE
exports.updateReviewById = catchAsync(async (req, res, next) => {
    console.log("updateReviewById::req.body: ", req.body);
    db.user.update({ _id: mongojs.ObjectId(req.params.id) },
        { $set: { "rate": req.body.rate, "comment": req.body.comment } },
        (error, data) => {
            // if (error) res.send(error);
            // else res.json(data);
            if (error) return res.status(404).end();
            else res.status(200).json(data);
        });
});

// CRUD: DELETE
exports.deleteReviewById = catchAsync(async (req, res, next) => {
    console.log("deleteReviewById::req.body: ", req.body);
    db.user.remove({ _id: mongojs.ObjectID(req.params.id) }, (error, data) => {
        // if (error) res.send(error);
        // else res.json(data);
        if (error) return res.status(404).end();
        else res.status(200).json(data);
    });
});