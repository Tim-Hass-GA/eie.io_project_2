var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var path = require('path');

// GET NEW FORM
router.get('/new/:id', isLoggedIn, function(req,res){
  db.section.findById(req.params.id)
  .then(function(section){
    // res.send(section);
    res.render('notes/new', {section:section});
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// POST NEW note
router.post('/new', isLoggedIn, function(req,res){
  // console.log(req.body);
  db.note.create({
    title: req.body.title,
    details: req.body.details,
    sectionId: req.body.section_id
  })
  .then(function(note){
    console.log('new note saved... ' + note.sectionId);
    req.flash('success', 'Note Saved');
    res.redirect('/section/show/'+ req.body.section_id);
  })
  .catch(function(error){
    console.log('error occurred ..|..', error.message);
    req.flash('error', error.message);
  });
});

// UPDATE note
router.put('/update/:id', isLoggedIn, function(req,res){

});

// DELETE note
router.delete('/delete/:id', isLoggedIn, function(req,res){

});

module.exports = router;
