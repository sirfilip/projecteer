var jwt = require('../services/jwt');

function loginRequired(req, res, next) {
  var authToken = req.cookies.auth;

  if (! authToken) {
    res.redirect('/login');
    return;
  }

  jwt.verify(authToken).then(function() {
    next();
  }).catch(function() {
    res.redirect('/login');
  });
};

module.exports = loginRequired;
