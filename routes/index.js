var express = require('express');
var router = express.Router();
var birdsController = require('../controllers/birdsController');

/* GET home page. */
router.get('/', birdsController.get_index);

router.get('/birds', birdsController.get_birds);

router.get('/create', birdsController.get_birds_create);

router.post('/birds', birdsController.post_birds_create);

router.get('/update', birdsController.get_update);

router.post('/update', birdsController.post_update);

router.get('/delete', birdsController.get_delete);

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

module.exports = router;
