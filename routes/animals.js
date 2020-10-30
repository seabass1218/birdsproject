var express = require('express');
var router = express.Router();
var animalsController = require('../controllers/animalsController');

/* GET users listing. */
router.get('/', animalsController.get_animals);

router.get('/create', animalsController.get_create_animal);

router.post('/create', animalsController.post_create_animal);

module.exports = router;
