var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');

// add the middleware to handle access to page
// user must be logged in.
// app.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile');
// });

// GET ROUTE
router.get('/profile', isLoggedIn, function(req,res){
  // console.log('in the user/profile route...');
  db.user.findById(req.user.id)
  .then(function(user){
    res.render('user/profile', {user:user});
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    res.flash('error', error.message);
  });
});

// GET EDIT
router.get('/edit/:id', isLoggedIn, function(req,res){
  // console.log('in the user/edit/:id route...');
  db.user.findById(req.user.id)
  .then(function(user){
    res.render('user/edit', {user:user});
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// PUT ROUTE
router.put('/update/:id', isLoggedIn, function(req,res){
  // console.log('in the user/update/:id route...');
  db.user.findById(req.params.id)
  .then(function(user){
    db.user.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      email: req.body.email
    }, {
      where: { id:req.params.id }
    })
    .then(function(user){
      // console.log("Successfully updated ...", user);
      db.user.findOne({
        where: {id:req.params.id}
      })
      .then(function(user){
        // console.log("Successfully found ..." + user);
        req.flash('success', 'Profile Updated.');
        res.status(200).send({msg: 'success', user:user});
      })
      .catch(function(error){
        console.log('error occurred cannot find user..|..', error.message);
        req.flash('error', error.message);
      });
    })
    .catch(function(error){
      console.log('error occurred ..|..', error.message);
      req.flash('error', error.message);
    });
  });
});

// DELETE ROUTE
router.delete('/delete/:id', isLoggedIn, function(req,res){
  // console.log('hit the /delete/:id user');
  req.logout();
  db.user.destroy({
    where: {id:req.params.id}
  })
  .then(function(user){
    req.flash('success', 'Your account has been deleted!');
    res.status(200).send({msg:'success', user:user});
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

module.exports = router;
