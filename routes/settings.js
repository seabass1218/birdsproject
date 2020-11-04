var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/settingsController');

/* GET settings page. */
router.get('/', settingsController.get_settings_index);

/* GET specific settings pages. */
router.get('/meds', settingsController.get_meds);

router.get('/meds/create', settingsController.get_meds_create);

router.post('/meds', settingsController.post_medicine_create);

router.get('/meds/update', settingsController.get_meds_update);

router.post('/meds/update', settingsController.post_meds_update);

router.get('/meds/delete', settingsController.get_meds_delete);

router.get('/users/create', settingsController.get_users_create);

router.get('/food', settingsController.get_food);

router.get('/food/create', settingsController.get_food_create);

router.post('/food', settingsController.post_food_create);

router.get('/food/update', settingsController.get_food_update);

router.post('/food/update', settingsController.post_food_update);

router.get('/food/delete', settingsController.get_food_delete);

module.exports = router;
