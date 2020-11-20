var express = require('express');
var router = express.Router();
var birdsController = require('../controllers/birdsController');
const authMiddleware = require('../middleware/ensureAuthenticated');

/* GET home page. */
router.get('/', birdsController.get_index);

router.get('/animals', authMiddleware.ensureAuthenticated, birdsController.get_birds);

router.get('/create', authMiddleware.ensureAuthenticated, birdsController.get_birds_create);

router.post('/birds', authMiddleware.ensureAuthenticated, birdsController.post_birds_create);

router.get('/update', authMiddleware.ensureAuthenticated, birdsController.get_update);

router.post('/update', authMiddleware.ensureAuthenticated, birdsController.post_update);

router.get('/delete', authMiddleware.ensureAuthenticated, birdsController.get_delete);

module.exports = router;
