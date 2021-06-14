var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testapiRouter = require('./routes/testapi');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var addDeviceRouter = require('./routes/add_device');
var deleteDeviceRouter = require('./routes/delete_device');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testapi', testapiRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/add_device', addDeviceRouter);
app.use('/delete_device', deleteDeviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404!!!')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send('Not found')
});

module.exports = app;
