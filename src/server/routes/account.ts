/// <reference path='../../typings/tsd.d.ts' />

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path');

var passport = require('passport');
import userService = require('../services/userService');
    

router
.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
})
.get('home', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
})
.post('user/register', function(req, res) {
  
  let userData = req.body;

  userService.addUser(userData, function(err, user){
    if (err) {
      return res.status(500).json({ err: err });
    }
    passport.authenticate('local')(req, res, function() {
      return res.status(200).json({ status: 'Registration successful!' });
    });
  });
  // User.register(new User({ username: req.body.username, email: req.body.email  }), req.body.password, function(err, account) {
  //   if (err) {
  //     return res.status(500).json({err: err});
  //   }
  //   passport.authenticate('local')(req, res, function () {
  //     return res.status(200).json({status: 'Registration successful!'});
  //   });
  // });
})
.post('user/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);

}).get('user/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;