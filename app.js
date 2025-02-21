var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const debug = require("debug")("express-locallibrary-tutorial:server");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var localLibraryRouter = require("./routes/local-library");
var { local_library_url } = require("./constants/local-library-constant");
var { mongo_db } = require("./constants/db-connection-string");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json()); // added by hoang: https://expressjs.com/en/api.html#req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.use(local_library_url, localLibraryRouter);

// added by hoang: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#handling_errors
// catch 404 and forward to error handler: 404 Not found
// Note: HTTP404 and other "error" status codes are not treated as errors. If you want to handle these, you can add a middleware function to do so. For more information see the FAQ
// https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: err.message });
});

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict

mongoose.set("strictQuery", false);

async function connectToDatabase() {
  // define the database URL to connect to
  await mongoose.connect(mongo_db);
}

connectToDatabase().catch((error) => debug(error));

module.exports = app;
