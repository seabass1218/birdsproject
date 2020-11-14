const User = require('../models/user');

exports.get_index = function (req, res) {
    res.render('index', { title: 'Home' });
}

exports.get_users = function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            console.error(err);
        } else {
            res.render('./users', { data: user });
        }
    })

}

exports.get_users_create = function (req, res) {
    res.render('./users/createUsers', { title: 'users' });
}

exports.post_users_create = function (req, res) {

    var newUser = new User();

    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.role = req.body.role;

    newUser.save(function (err) {
        if (err) {
            // handle error 
            console.error(err);
        } else {
            // saved!
            res.redirect('/users');
        }
    });
}

exports.get_users_update = function (req, res) {
    User.findOne({ _id: req.query.id }, function (err, user) {
        if (err) {
            //handle error
        } else {
            res.render('users/update', { data: user });
        }
    });
}

exports.post_users_update = function(req, res) {

    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role
    };

    if (req.body.password) {
        updateData.password = User.generateHash(req.body.password);
    }
  
    User.findOneAndUpdate({_id: req.body.id}, updateData, function(err, data) {
      if (err) {
        // handle error
        console.log(err);
      } else {
        res.redirect('/users');
      }
    });
  };



