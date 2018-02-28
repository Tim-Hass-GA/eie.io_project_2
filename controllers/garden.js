var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');


// NEW
router.get('/new', isLoggedIn, function(req,res){
  res.render('garden/new');
});

// POST
router.post('/new', isLoggedIn, function(req,res){
  db.garden.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    user_id: req.body.user_id
  })
  .then(function(garden){
    console.log('garden created....');
    req.flash('Garden Created.!');
    // res.render('garden/show/' + garden.id);
    // res.redirect('garden/show);
  })
  .catch(function(error){
    console.log('error retrieving garden/show data....', error.message);
    req.flash('error', error.message);
  });
});

// SHOW
router.get('/show', isLoggedIn, function(req,res){
  console.log('hit the garden/show path');
  db.garden.findAll()
  .then(function(gardens){
    console.log(gardens);
    if (!gardens) throw Error();
  res.render('garden/show', {gardens:gardens});
  // res.render('garden/show');
  })
  .catch(function(error){
    console.log('error retrieving garden/show data....', error.message);
    req.flash('error', error.message);
  });
});

// GET
router.get('/edit/:id', isLoggedIn, function(req,res){
  console.log('hit the garden/edit/:id path');
  db.garden.findOne({
    where: {garden_id:req.params.id}
  }).then(function(garden){
    res.render('garden/edit', {garden:garden});
  }).catch(function(error){
    console.log('error retrieving garden/edit/id data....', error.message);
    req.flash('error', error.message);
  });
});

// EDIT/PUT
router.put('/update/:id', isLoggedIn, function(req,res){
  console.log('hit the /garden/update/:id path');

});

// DELETE
router.delete('/delete/:id', isLoggedIn, function(req,res){
  console.log('hit the garden/delete/:id path');

});

module.exports = router;
