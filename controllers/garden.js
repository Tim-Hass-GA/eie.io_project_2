var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');
var request = require('request');
var async = require('async');


// NEW GARDEN FORM
router.get('/new', isLoggedIn, function(req,res){
      res.render('garden/new');
});

// ADD SECTION TO GARDEN
router.get('/add/:id', isLoggedIn, function(req,res){
  db.garden.findOne({
    where: {id:req.params.id}
  })
  .then(function(garden){
    // API Call to growstuff to load crops
    var growStuffAPIUrl = 'http://www.growstuff.org/crops.json';
      request(growStuffAPIUrl, function(error, response, body) {
        var crops = JSON.parse(body);
        res.render('section/define', { crops:crops, garden:garden });
      });
  })
  .catch(function(error){
    console.log('error retrieving garden/add data....', error.message);
    req.flash('error', error.message);
  });
});

// POST NEW GARDEN
router.post('/new', isLoggedIn, function(req,res){
  // create new garden
  db.garden.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    userId: req.body.user_id
  })
  .then(function(garden){
    // console.log('garden created....' + garden.id);
    // API Call to growstuff to load crops
    var growStuffAPIUrl = 'http://www.growstuff.org/crops.json';
      request(growStuffAPIUrl, function(error, response, body) {
        var crops = JSON.parse(body);
        req.flash('Garden Created!');
        res.render('section/define', { crops:crops, garden:garden });
      });
  })
  .catch(function(error){
    console.log('error retrieving garden/show data....', error.message);
    req.flash('error', error.message);
  });
});

// SHOW GARDEN
router.get('/show/:id', isLoggedIn, function(req,res){
  console.log('hit the garden/show/:id path');
  db.garden.findAll({
    where: {userId:req.params.id},
    include: [db.section]
  })
  .then(function(gardens){
    if (!gardens) throw Error();
    res.render('garden/show', {gardens:gardens});
  })
  .catch(function(error){
    console.log('error retrieving garden/show data....', error.message);
    req.flash('error', error.message);
  });
});

// GET EDIT GARDEN
router.get('/edit/:id', isLoggedIn, function(req,res){
  console.log('hit the garden/edit/:id path');
  db.garden.findOne({
    where: {id:req.params.id}
  }).then(function(garden){
    res.render('garden/edit', {garden:garden});
  }).catch(function(error){
    console.log('error retrieving garden/edit/id data....', error.message);
    req.flash('error', error.message);
  });
});

// UPDATE GARDEN
router.put('/update/:id', isLoggedIn, function(req,res){
  console.log('hit the /garden/update/:id path');
  db.garden.findById(req.params.id)
  .then(function(garden){
    db.garden.update({
      name: req.body.name,
      description:req.body.description,
      location: req.body.location
    } , {
      where: {id:req.params.id}
    })
    .then(function(garden){
      console.log('Successfully updated garden ' + garden);
          req.flash('success', 'Garden updated.');
          res.status(200).send({msg: 'success', user:req.user.id});
    })
    .catch(function(error){
      console.log('error occurred ..|..', error.message);
      req.flash('error', error.message);
    });
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// DELETE
router.delete('/delete/:id', isLoggedIn, function(req,res){
  console.log('hit the garden/delete/:id path');
  db.garden.findOne({
    where: {id:req.params.id},
    include: [db.section]
  }).then(function(garden){
    async.forEach(garden.section, function(section, callback){
      console.log(section);
      section.removeGarden(garden);
      callback();
    } , function(){
        db.garden.destroy({
          where: {id:req.params.id}
        })
        .then(function(garden){
          console.log('Successfully deleted ...' + garden);
          req.flash('success', 'Successfully deleted garden.');
          res.status(200).send({msg: 'success'})
        })
        .catch(function(error){
          console.log('error occurred ..|..', error.message);
          req.flash('error', error.message);
        });
      });
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });

});

module.exports = router;
