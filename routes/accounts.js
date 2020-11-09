const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  res.render('../views/account/login', {message: req.flash('loginMessage')});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/', // redirect to the home page
  failureRedirect: '/accounts/login', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
}));


module.exports = router;