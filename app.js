var createError = require('http-errors');
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var phonesRouter = require('./routes/phones');

var app = express();

// view engine setup
// Initialize view engine
app.engine('.hbs', hbs({
  helpers: {
      toDateTime: function(datetime) {
        return moment(datetime).format('lll');
        },
      toDate: function(date) {
          return moment(date).format('LL');
      },
      toTime: function(time) {
          return moment(time, ["h:mm A", "H:mm"]).format('LT')
      },
      toJSON: function(object) {
          return JSON.stringify(object, null, 3);
      }
  },
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname + '/views/partials/'),
  extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/phones', phonesRouter);

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
