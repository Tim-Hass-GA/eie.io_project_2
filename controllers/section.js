var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');
var request = require('request');


// SHOW SECTION
router.get('/show/:id', isLoggedIn, function(req,res){
  console.log('in the /section/show/:id path...!')
  db.section.find({
    where: {id:req.params.id},
    include: [db.garden]
  })
  .then(function(section){
    // API Call to growstuff to load crops
    var growStuffAPIUrl = 'http://www.growstuff.org/crops/'+section.cropId+'.json';
      request(growStuffAPIUrl, function(error, response, body) {
        var crop = JSON.parse(body);
        res.render('section/show2', {crop:crop, section:section});
      });
  })
  .catch(function(error){
    console.log('error retrieving garden/edit/id data....', error.message);
    req.flash('error', error.message);
  });
});

// GET EDIT
router.get('/edit/:id', isLoggedIn, function(req,res){
  db.section.findOne({
    where: {id:req.params.id}
  })
  .then(function(section){
    res.send(section);
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// POST section
router.post('/new', isLoggedIn, function(req,res){
    db.section.create({
      name: req.body.name,
      description: req.body.description,
      number_of_rows: req.body.number_of_rows,
      item_count: req.body.number_of_items,
      date_planted: req.body.date_planted,
      gardenId: req.body.gardenId,
      cropId: req.body.crop_choice
    })
    .then(function(section){
      console.log('section created' + section.id);
      // res.render('garden/show', req.body.userId)
      // res.redirect('garden/show/', userId);
      res.redirect('/');
    })
    .catch(function(error){
      console.log('error retrieving section/new post ....', error.message);
      req.flash('error', error.message);
    });
});

// PUT section
router.put('/update/:id', isLoggedIn, function(req,res){
  console.log('hit the /section/update/:id path');

});
// DELETE section
router.delete('/delete/:id', isLoggedIn, function(req,res){
  console.log('hit the /section/delete/:id path');
  db.section.destroy({
    where: {id:req.params.id}
  })
  .then(function(section){
    console.log("Successfully deleted ..." + section);
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});
module.exports = router;
