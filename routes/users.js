var express = require('express');
var router = express.Router();

const usersController = require ('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.get_users);

router.get('/create', usersController.get_users_create);

router.post('/', usersController.post_users_create);

router.get('/update', usersController.get_users_update);

router.post('/update', usersController.post_users_update);

router.get('/delete', usersController.get_users_delete);

module.exports = router;
