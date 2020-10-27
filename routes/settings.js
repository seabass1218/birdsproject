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

router.get('/food', function(req, res, next) {
    res.render('food', { title: 'food' });
  });


module.exports = router;
