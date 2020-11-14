var express = require('express');
var router = express.Router();

const usersController = require ('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.get_users);

router.get('/create', usersController.get_users_create);

router.post('/', usersController.post_users_create);

module.exports = router;
