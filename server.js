require("dotenv").config();

// begin of: mongodb initialization
// const mongojs = require("mongojs");
// const databaseUrl = "moviemap";
// const collections = ["user", "movie", "review"];
// const db = mongojs(databaseUrl, collections);
// db.on("error", (error) => {
//   console.log("Database Error:", error);
// });
// end of: mongodb initialization

// Handling uncaught exception error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🚧  Shutting down...");
  console.log(err.name, err.message);
  console.log(err);

  process.exit(1);
});

const PORT = process.env.PORT || 3000;
const app = require("./app");

let server;

server = app.listen(PORT, function (err) {
  if (err) throw err;
  console.info("App listening on PORT " + PORT);
});

// Handling unhandled rejection(Promise errors)
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🚧  Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
