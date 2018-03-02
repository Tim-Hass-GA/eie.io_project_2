require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));
// session
// needs dotenv file
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
// do this after the session....!!!!
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  // before every route attach the flash()
  // messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

// add the middleware to handle access to the profile page
// user must be logged in.
app.get('/profile', isLoggedIn, function(req, res) {
  console.log(req.user.id);
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/user', require('./controllers/user'));
app.use('/garden', require('./controllers/garden'));
app.use('/section', require('./controllers/section'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
