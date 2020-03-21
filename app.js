var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var submitAttendanceRouter = require("./routes/submit-attendance");
var adminLoginRouter = require("./routes/admin-login");
var submitAdminLoginRouter = require("./routes/submitlogin");
var newMemberRouter = require("./routes/new-member");
var submitNewMemberRouter = require("./routes/submit-new-member");
var errorRouter = require('./routes/error');

var app = express();

// Set app.locals variables:
app.locals.loginEnabled = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/submit-attendance", submitAttendanceRouter);
app.use("/new-member", newMemberRouter);
app.use("/submit-new-member", submitNewMemberRouter);
app.use("/admin-login", adminLoginRouter);
app.use("/submit-admin-login", submitAdminLoginRouter);
app.use('/error', errorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
