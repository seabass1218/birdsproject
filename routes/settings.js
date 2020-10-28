var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('settings', { title: 'settings' });
});

/* GET home page. */
router.get('/birds', function(req, res, next) {
    res.render('index', { title: 'birds' });
  });

/* GET home page. */
router.get('/meds', function(req, res, next) {
    res.render('meds', { title: 'meds' });
  });

router.get('/meds/create', function(req, res, next) {
    res.render('createMeds', { title: 'meds' });
  }); 

router.get('/users/create', function(req, res, next) {
    res.render('createUsers', { title: 'meds' });
  }); 

router.get('/food/create', function(req, res, next) {
    res.render('createFood', { title: 'meds' });
  }); 

router.get('/food', function(req, res, next) {
    res.render('food', { title: 'food' });
  });


module.exports = router;
