const Food = require('../models/food');
const Medicine = require('../models/medicine');

exports.get_settings_index = function (req, res) {
    res.render('settings', { title: 'Settings' });
}

exports.get_meds = function (req, res) {
    Medicine.find({}, function(err, medicines) {
        if (err) {
            console.error(err);
        } else {
            res.render('./medicine/meds', { data: medicines });
        }
    })
}

exports.get_meds_create = function(req, res) {
    res.render('./medicine/createMeds', { title: 'meds create' });
}

exports.get_users_create = function(req, res) {
    res.render('./users/createUsers', { title: 'users' });
}

exports.get_food = function(req, res) {
    Food.find({}, function(err, foods) {
        if (err) {
            console.error(err);
        } else {
            res.render('./food/food', { data: foods });
        }
    })
}

exports.get_food_create = function(req, res) {
    res.render('./food/createFood', { title: 'food' });
}

exports.post_food_create = function(req,res) {

    let newFood = new Food({ 
        name: req.body.food
    }); 
    
    newFood.save(function (err) {
        if (err) {
            // handle error 
            console.error(err);       
        } else {            
            // saved!
            res.redirect('/food');        
        }    
    });

}