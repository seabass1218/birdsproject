var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/ensureAuthenticated');

/* GET settings page. */
router.get('/', authMiddleware.ensureAuthenticated, settingsController.get_settings_index);

/* GET specific settings pages. */
router.get('/meds', authMiddleware.ensureAuthenticated, settingsController.get_meds);

router.get('/meds/create', authMiddleware.ensureAuthenticated, settingsController.get_meds_create);

router.post('/meds', authMiddleware.ensureAuthenticated, settingsController.post_medicine_create);

router.get('/meds/update', authMiddleware.ensureAuthenticated, settingsController.get_meds_update);

router.post('/meds/update', authMiddleware.ensureAuthenticated, settingsController.post_meds_update);

router.get('/meds/delete', authMiddleware.ensureAuthenticated, settingsController.get_meds_delete);

router.get('/food', authMiddleware.ensureAuthenticated, settingsController.get_food);

router.get('/food/create', authMiddleware.ensureAuthenticated, settingsController.get_food_create);

router.post('/food', authMiddleware.ensureAuthenticated, settingsController.post_food_create);

router.get('/food/update', authMiddleware.ensureAuthenticated, settingsController.get_food_update);

router.post('/food/update', authMiddleware.ensureAuthenticated, settingsController.post_food_update);

router.get('/food/delete', authMiddleware.ensureAuthenticated, settingsController.get_food_delete);

module.exports = router;
