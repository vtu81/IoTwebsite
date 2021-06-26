var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fetchDeviceRouter = require('./routes/fetch_device');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var addDeviceRouter = require('./routes/add_device');
var deleteDeviceRouter = require('./routes/delete_device');
var fetchMessageRouter = require('./routes/fetch_message');
var fetchAccountRouter = require('./routes/fetch_account');
var updateAccountRouter = require('./routes/update_account');
var updatePasswordRouter = require('./routes/update_password');

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
app.use('/fetch_device', fetchDeviceRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/add_device', addDeviceRouter);
app.use('/delete_device', deleteDeviceRouter);
app.use('/fetch_message', fetchMessageRouter);
app.use('/fetch_account', fetchAccountRouter);
app.use('/update_account', updateAccountRouter);
app.use('/update_password', updatePasswordRouter);

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

mqtt_client = require('./utils/mqtt.js')

module.exports = app;
