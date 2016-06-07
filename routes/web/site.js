var router = require('express').Router();
var jwt = require('../../services/jwt');
var loginRequired = require('../../middlewares/login-required');

router.get('/', function(req, res) {
  res.redirect('/dashboard');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  var token = req.body.auth_token;
  console.log(req.body);
  jwt.verify(token).then(function() {
    res.cookie('auth', jwt.generateTokenFor({rand: Math.random().toString()}), { maxAge: 900000, httpOnly: true });
    res.redirect('/dashboard');
  }).catch(function() {
    res.status(400).send('Not Authorized');
  });
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


module.exports = router;
