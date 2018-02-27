var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// post the new user account
router.post('/signup', function(req,res){
  // res.send(req.body);
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      bio: req.body.bio
    }
  }).spread(function(user, created){
    if(created){
      console.log('email not in db, user created');
      // not using regular redirect
      // use passport to then redirect
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account Created, you are now logged in.'
      })(req,res);
    } else {
      console.log('email exists in db, not created');
      req.flash('error', 'Email already exists.');
      res.redirect('/auth/login');
    }
  }).catch(function(error){
      console.log('error occurred ..|..', error.message);
      req.flash('error', error.message);
      res.redirect('/auth/signup');
  });
});

// get the login page
router.get('/login', function(req, res) {
  res.render('auth/login');
});

// log the user in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are now logged in',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Username and/or Password.'
}));

// log user out
router.get('/logout', function(req,res){
  req.logout();
  console.log(' ... user session terminated ....');
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
});

module.exports = router;
