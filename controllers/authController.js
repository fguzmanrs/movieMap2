const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const catchAsync = require("../util/catchAsync");
const ErrorFactory = require("../util/errorFactory");
const Email = require("../util/email");

//! Begin of: mongodb initialization
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
});
db.runCommand({ ping: 1 }, function (err, res) {
  console.log("mongoDb::userController::ping");
  if (!err && res.ok) console.log("movieController::up&running");
});
//! End of: mongodb initialization

//! JWT CREATOR : Create JSON Web Token with a user id for authentication with stateless server
const createToken = (userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};

//! ROUTE: SIGN UP
exports.signup = catchAsync(async (req, res, next) => {
  //* 1. Get user's input
  const { firstName, lastName, username, password, email } = req.body;

  //* 2. Validate for no input
  if (!username || !password || !firstName || !lastName || !email) {
    return next(new ErrorFactory(400, "Please provide all required info."));
  }

  // Unique username, email Validation
  db.user.find({ $or: [{ username }, { email }] }, async (error, data) => {
    if (data.length > 0) {
      return next(
        new ErrorFactory(
          400,
          "There is already existing username or email. Please try with an unique username and email."
        )
      );
    }

    //* 3. Encrypt the password
    const encryptedPwd = await bcrypt.hash(password, 12);

    //* 4. Filter user's input and replace password with encrypted one
    const newUserToSave = {
      username,
      password: encryptedPwd,
      email,
      firstName,
      lastName,
    };

    //* 5. Store a new user into DB
    db.user.insert(newUserToSave, async (error, data) => {
      //* 6. Create a JWT token
      const token = createToken(data._id);

      //! 7. Send a welcome email
      const url = `${req.protocol}://${req.get("host")}`;
      await new Email(data, url).sendWelcome();

      //* 8. Send a respond with cookie: Prevents from accessing/modifying the cookie from anywhere except http browser. Expires after 1 hour.
      res
        .cookie("jwt", token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .status(200)
        .json({
          status: "success",
          message: "New user has been successfully created!",
          token,
          data: {
            username,
          },
        });
    });
  });
});

//! ROUTE: LOGIN
exports.login = catchAsync(async (req, res, next) => {
  //* 1. Get login info from request
  const { username, password } = req.body;

  //* 2. Validation(a): Check if username and password exist
  if (!username || !password) {
    return next(new ErrorFactory(400, "Please provide email and password."));
  }

  //* 3. Bring user data matching to the username from DB
  db.user.findOne({ username: username }, async (error, data) => {
    //* 4. Validation(b): Check if there is a matching user and user's input password is same as that of DB(return Boolean)
    if (!data || !(await bcrypt.compare(password, data.password))) {
      return next(
        new ErrorFactory(
          401,
          "There is no such a user or you typed the password wrong!"
        )
      );
    }

    console.log("😈 loggedin user: ", data);

    //* 5. Create JWT token with user's id
    const token = createToken(data._id);

    //* 6. Send a response
    res
      .cookie("jwt", token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        message: "You are logged in successfully!",
        token,
      });
  });
});

//! ROUTE: LOGOUT - Clear cookie having a JWT token
exports.logout = catchAsync(async (req, res, next) => {
  // Check if a user is logged out
  if (!req.cookies.jwt) {
    return next(new ErrorFactory(400, "You are already logged out!"));
  }

  // Clear cookie and token so the user can logout
  res.clearCookie("jwt").status(200).json({
    status: "success",
    message: "You are successfully loged out!",
  });
});

//! PROTECT Middleware
//Protects other middlewares coming after this middleware(Not allow to access to next middlewares if a request fails to be verified here for its authentication)
exports.protect = catchAsync(async (req, res, next) => {
  //* 1. Check if a user is logged in(via JWT)
  const token = req.cookies.jwt;
  console.log("🍑token:", token, req.cookies);

  if (!token) {
    return next(
      new ErrorFactory(401, "You are not logged in! Please log in first.")
    );
  }

  //* 2. Verify the token and get user's id from it
  const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log("✨ decoded JWT: ", decodedJwt); // format: { userId: 123, iat: 1582066423, exp: 1582070023 }

  //* 3. Check if there is a user matching to that id from DB
  db.user.findOne(
    { _id: mongojs.ObjectId(decodedJwt.userId) },
    (error, data) => {
      // Got back the data but if there is no user
      if (!data) {
        return next(
          new ErrorFactory(
            401,
            "The user belonging to this token doesn't exist any longer."
          )
        );
      }

      //* 4. Save user info to request in order to use it in next controllers.
      req.user = data;
      console.log(
        "🤡 Passed PROTECT router and added the 'user' obj to req: ",
        req.user
      );

      next();
    }
  );
});

//! ROUTE: forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //* Get user info
  db.user.findOne({ email: req.body.email }, async (error, user) => {
    if (!user) {
      return next(
        new ErrorFactory(404, "No user founded with that email address.")
      );
    }

    //* Create reset token and add it to user doc
    // reset token: used to verify the use via email later
    const randomToken = crypto.randomBytes(32).toString("hex");
    const encrypedToken = crypto
      .createHash("sha256")
      .update(randomToken)
      .digest("hex");

    // console.log("🐯 randomToken/encrypedToken: ", randomToken, encrypedToken);

    //* Save the token to the user's db
    db.user.update(
      { email: req.body.email },
      { $set: { passwordResetToken: encrypedToken } },
      async (error, data) => {
        try {
          //* Send email with API link having the verification token
          const resetPwdURL = `${req.protocol}://${req.get(
            "host"
          )}/api/users/resetPassword/${randomToken}`;

          // console.log("🍍 user:", user);
          await new Email(user, resetPwdURL).sendResetPwd();

          res.status(200).json({
            status: "success",
            message: "Password Token is sent to email.",
          });
        } catch (err) {
          db.user.update(
            { email: req.body.email },
            { $set: { passwordResetToken: undefined } },
            async (error, data) => {
              // console.log(
              //   "🦊 passwordResetToken is set to undefined. *data: ",
              //   data
              // );
            }
          );

          return next(
            new ErrorFactory(
              500,
              "Error occurred while sending an email. Try again later!"
            )
          );
        }
      }
    );
  });
});

//! ROUTE: reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //* Encrypt the reseted password
  const encryptedDefaultPwd = await bcrypt.hash(
    process.env.DEFAULT_PASSWORD,
    12
  );

  //* Find a user who has a same hashed(encrypted) token
  db.user.update(
    { passwordResetToken: hashedToken },
    {
      $set: {
        password: encryptedDefaultPwd,
      },
      $unset: { passwordResetToken: "" },
    },
    async (error, data) => {
      // console.log("📌 data after updated pwd to default pwd", data);
      console.log(data);
      // If there is no updated doc
      if (!data.nModified) {
        return next(new ErrorFactory(400, "Token is invalid."));
      }

      res.status(200).json({
        status: "success",
        message: "Successfully reseted password!",
      });
    }
  );
});

//! ROUTE: update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  //* 1. Find user
  db.user.findOne(
    { _id: mongojs.ObjectId(req.user._id) },
    async (error, user) => {
      // If there is no user found
      if (!user) {
        return next(new ErrorFactory(401, "Please login first please!"));
      }

      //* 2. Check if the entered current pwd is correct
      const pwdIsCorrect = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!pwdIsCorrect) {
        return next(
          new ErrorFactory(401, "Your current password is wrong. Type again!")
        );
      }

      //* 3. Encrypt the new pwd and save it to DB
      const encryptedPwd = await bcrypt.hash(req.body.newPassword, 12);

      db.user.update(
        { _id: mongojs.ObjectId(req.user._id) },
        { $set: { password: encryptedPwd } },
        async (error, data) => {
          //* 4. Send new jwt token via cookie and make the user newly logged in
          const newToken = createToken(user._id);

          res
            .cookie("jwt", newToken, {
              maxAge: 3600000,
              httpOnly: true,
            })
            .status(200)
            .json({
              status: "success",
              message: "Successfully updated password!",
              newToken,
              data: {
                username: req.user.username,
              },
            });
        }
      );
    }
  );
});
