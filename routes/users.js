var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/ensureAuthenticated');
const usersController = require ('../controllers/usersController');

/* GET users listing. */
router.get('/', authMiddleware.ensureAuthenticated, usersController.get_users);

router.get('/create', authMiddleware.ensureAuthenticated, usersController.get_users_create);

router.post('/', authMiddleware.ensureAuthenticated, usersController.post_users_create);

router.get('/update', authMiddleware.ensureAuthenticated, usersController.get_users_update);

router.post('/update', authMiddleware.ensureAuthenticated, usersController.post_users_update);

router.get('/delete', authMiddleware.ensureAuthenticated, usersController.get_users_delete);

module.exports = router;
