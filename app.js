var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./confiq/connection')
var session = require('express-session')

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
db.connect((err) => {
  if (err) console.log('connection error' + err);
  else console.log('Database connected to port 27017');

})

var app = express();

// view engine setup
app.set('views', [__dirname + '/views/User', __dirname + '/views/admin'])
// app.set('views', path.join(__dirname, 'views/admin'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'key', cookie: { maxAge: 600000 } }))


app.use(function (req, res, next) {
  if (!req.user) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }
  next();
});


app.use('/', adminRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
