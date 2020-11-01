var express = require('express');
var router = express.Router();
var birdsController = require('../controllers/birdsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/birds', birdsController.get_birds);

router.get('/create', birdsController.get_birds_create);

router.post('/birds', birdsController.post_birds_create);

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

module.exports = router;
