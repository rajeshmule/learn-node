var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

require('dotenv').config();

require('./module/passport');
console.log(`app running on port ${process.env.PORT}`)

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users.router');
var articlesRouter = require('./routes/articles.router');

const mongodbUrl = process.env.MONGODB_URI;

//connect mongodb 
mongoose.connect(mongodbUrl, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  serverSelectionTimeoutMS: 5000
}, () =>
{
  console.log("mongodb is connected");
}).catch(err => console.log(err.reason));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "Work Hard",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github',
    { failureRedirect: '/' }),
  (req, res) =>
  {
    res.redirect('/articles');
  });
app.use('/', indexRouter);
app.use('/articles', articlesRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next)
{
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
