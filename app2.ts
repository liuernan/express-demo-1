import {ErrorRequestHandler, RequestHandler} from "express-serve-static-core";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ts-node-dev", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (require, response, next) {
  next(createError(404));
} as RequestHandler);

// error handler
app.use(function (error, require, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = require.app.get("env") === "development" ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render("error");
  next();
} as ErrorRequestHandler);

module.exports = app;
