var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// passport serialize objects to make them easy to store
// converting the user to an identifier
passport.serializeUser(function(user, cb){
  // strips the user down to an id
  cb(null, user.id);
});

// passport deserialze objects by taking the users
// serialization id and looking it up in the database
passport.deserializeUser(function(id, cb){
  db.user.findById(id).then(function(user){
    cb(null, user);
  }).catch(cb);
});

// set up the local auth Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},function(email, password, cb){
  db.user.find({
    where: { email:email }
  }).then(function(user){
    // did not pass authentication
    if(!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
