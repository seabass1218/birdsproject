var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/settingsController');

/* GET settings page. */
router.get('/', settingsController.get_settings_index);

/* GET specific settings pages. */
router.get('/meds', settingsController.get_meds);

router.get('/meds/create', settingsController.get_meds_create);

router.get('/users/create', settingsController.get_users_create);

router.get('/food', settingsController.get_food);

router.get('/food/create', settingsController.get_food_create);

module.exports = router;
