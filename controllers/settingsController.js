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
        name: req.body.Food
    }); 
    
    newFood.save(function (err) {
        if (err) {
            // handle error 
            console.error(err);       
        } else {            
            // saved!
            res.redirect('./food');
        }    
    });

}

exports.post_medicine_create = function(req, res) {
    let newMedicine = new Medicine({
        name: req.body.Medicine
    });

    newMedicine.save(function (err) {
        if (err) {
            //handle error
            console.error(err);
        } else {
            //saved!
            res.redirect('./meds');
        }
    });
}

exports.get_food_update = function(req, res) {
    Food.findOne({_id: req.query.id}, function(err, foods) {
      if (err) {
        // handle error
      } else {
        console.log(foods);
        res.render('./food/updateFood', {data: foods});
      }
    });
  };

  exports.post_food_update = function(req, res) {
    const updateData = {
      name: req.body.Food
    };
  
    Food.findOneAndUpdate({_id: req.body.id}, updateData, function(err, data) {
      if (err) {
        // handle error
        console.log(err);
      } else {
        res.redirect('./');
      }
    });
  };

  exports.get_meds_update = function(req, res) {
    Medicine.findOne({_id: req.query.id}, function(err, medicines) {
      if (err) {
        // handle error
      } else {
        console.log(medicines);
        res.render('./medicine/updateMeds', {data: medicines});
      }
    });
  };

  exports.post_meds_update = function(req, res) {
    const updateData = {
      name: req.body.Medicine
    };
  
    Medicine.findOneAndUpdate({_id: req.body.id}, updateData, function(err, data) {
      if (err) {
        // handle error
        console.log(err);
      } else {
        res.redirect('./');
      }
    });
  };

  exports.get_food_delete = function(req, res) {
    Food.findOneAndDelete({_id: req.query.id}, function(err) {
      if (err) {
        // handle error
        console.log(err);
      } else {
        res.redirect('/settings/food');
      }
    });
  };

  exports.get_meds_delete = function(req, res) {
    Medicine.findOneAndDelete({_id: req.query.id}, function(err) {
      if (err) {
        // handle error
        console.log(err);
      } else {
        res.redirect('/settings/meds');
      }
    });
  };