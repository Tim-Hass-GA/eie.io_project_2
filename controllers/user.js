var express = require('express');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');


// GET ROUTE

// add the middleware to handle access to the profile page
// user must be logged in.
// app.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile');
// });

router.get('/profile', function(req,res){
  console.log('in the user/profile route...');

  db.user.findById(req.user.id)
  .then(function(user){
    res.render('user/profile', {user:user});
  });
});

// GET EDIT
router.get('/edit/:id', function(req,res){
  console.log('in the user/edit/:id route...');
  db.user.findById(req.user.id)
  .then(function(user){
    res.render('user/edit', {user:user});
  }).catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// router.get('/edit/:id', isLoggedIn, function(req,res){
//   console.log('in the user/edit/:id route...');
//   if (isLoggedIn){
//     db.user.findById(req.user.id)
//     .then(function(user){
//       successRedirect: 'user/edit', {user:user},
//       successFlash: 'Account found.'
//     })(req,res);
//   } else {
//
//   }
//   db.user.findById(req.user.id)
//   .then(function(user){
//     res.render('user/edit', {user:user});
//   }).catch(function(error){
//     console.log('error occurred ..|..', error.message);
//     req.flash('error', error.message);
//   });
// });

// PUT ROUTE
router.put('/update/:id', function(req,res){
  console.log('in the user/update/:id route...');
  db.user.findById(req.params.id)
  .then(function(user){
    db.user.update({
      name: req.body.name,
      email: req.body.email
    }, {
      where: { id:req.params.id }
    }).then(function(user){
      console.log("Successfully updated ..." + user);
      req.flash('success', 'User Profile Updated.');
    }).catch(function(error){
      console.log('error occurred ..|..', error.message);
      req.flash('error', error.message);
    });
  });
});

// DELETE ROUTE
router.delete('/delete/:id', function(req,res){
  console.log('hit the /delete/:id user');
  db.user.destroy({
    where: {id:req.params.id}
  }).then(function(user){
    console.log("Successfully deleted ..." + user);
    // how do you hit the logout or home route...
    // res.redirect('/');
  });
});
module.exports = router;
