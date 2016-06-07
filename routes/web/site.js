var router = require('express').Router();
var jwt = require('../../services/jwt');

function loginRequired(req, res, next) {
  var authToken = req.cookies.auth;

  if (! authCookie) {
    res.redirect('/login');
    return;
  }

  jwt.verify(authToken).then(function() {
    next();
  }).catch(function() {
    res.redirect('/login');
  });
};

router.get('/', function(req, res) {
  res.redirect('/dashboard');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  var token = req.body.auth_token;
  jwt.verify(token).then(function() {
    res.cookie('auth', jwt.generateTokenFor({rand: Math.random().toString()}), { maxAge: 900000, httpOnly: true });
    res.redirect('/dashboard');
  }).catch(function() {
    res.status(400).send('Not Authorized');
  });
});


module.exports = router;
