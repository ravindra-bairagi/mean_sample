var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
const url = require('url');
const querystring = require('querystring');


/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  let parsedUrl = url.parse(req.url);
  let parsed = querystring.parse(parsedUrl.query);
  if(parsed && parsed.q) {
    //let obj = mongoose.Types.ObjectId.(('' + parsed.q));
    //if(mongoose.Types.ObjectId.isValid(obj)) {

      Book.find( { 'name' : { '$regex' : parsed.q, '$options' : 'i' } }, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    //}
  } else {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
