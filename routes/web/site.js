var router = require('express').Router();
var loginRequired = require('../../middlewares/auth');

router.get('/', function(req, res) {
  res.redirect('/dashboard');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/logout', loginRequired, function(req, res) {
  res.cookie('auth', null);
  res.redirect('/login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/dashboard', loginRequired, function(req, res) {
  res.render('dashboard');
});

router.get('/projects/:id', loginRequired, function(req, res) {
  res.render('project/show');
});


module.exports = router;
