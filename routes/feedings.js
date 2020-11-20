const express = require('express');
const router = express.Router();
const feedingsController = require('../controllers/feedingsController');
const authMiddleware = require('../middleware/ensureAuthenticated');


router.get('/', authMiddleware.ensureAuthenticated, feedingsController.get_index);

router.get('/export', authMiddleware.ensureAuthenticated, feedingsController.get_export);

router.get('/create', authMiddleware.ensureAuthenticated, feedingsController.get_create);

router.post('/create', authMiddleware.ensureAuthenticated, feedingsController.post_create);

router.get('/update', authMiddleware.ensureAuthenticated, feedingsController.get_update);

router.post('/update', authMiddleware.ensureAuthenticated, feedingsController.post_update);

router.get('/delete', authMiddleware.ensureAuthenticated, feedingsController.get_delete);

module.exports = router;