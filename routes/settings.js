var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/birds', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

/* GET home page. */
router.get('/meds', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  

module.exports = router;
