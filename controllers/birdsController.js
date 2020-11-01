const Animal = require('../models/animal');

exports.get_birds = function(req,res) {
    Animal.find({}, function(err, animals) {
        if (err) {
            console.log(err);
        } else {
            res.render('birds', { title: 'Birds' }, {data: animals});
        }
    })

}

exports.get_birds_create = function(req,res) {
    res.render('create', { title: 'Create' });
}

exports.post_birds_create = function(req,res) {
    let enabled = false;
    if (req.body.enabled == 'on') {
        enabled = true;
    }

    let newAnimal = new Animal({ 
        species: req.body.species,
        nickName: req.body.nickName, 
        enabled: enabled
    }); 
    
    newAnimal.save(function (err) {
        if (err) {
            // handle error 
            console.log(err);       
        } else {            
            // saved!
            res.redirect('/birds');        
        }    
    });

}