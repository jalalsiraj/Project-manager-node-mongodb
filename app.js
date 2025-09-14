var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config');
require('./global-functions')
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('./middlewares/passport')(passport)
const cryptoService = require('./services/crypto.service');
const rbac = require('./middlewares/rbac');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(function (req, res, next) {
  if (req && req.headers && req.headers.authorization) {
    let decryptedToken = cryptoService.decryptDetails(req.headers.authorization);
    req.headers.authorization = decryptedToken;
  };
  next();
})

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


async function connectDB() {
  try {
    await mongoose.connect(CONFIG.db_uri);
    console.log("Connected to database Successfully");
  } catch (err) {
    console.error("Error in creating connection with DB", err);
    process.exit(1);
  }
}

connectDB();

app.use('/api/tenant', require('./controllers/user.controller').router);
app.use('/api/:tenantId/projects', require('./controllers/projects.controller').router);

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
  res.render('error');
});


module.exports = app;
