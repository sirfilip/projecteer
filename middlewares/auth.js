var jwt = require('../services/jwt');

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token).then(function(data) {
      req.userdata = data;
      next();
    }).catch(function(err) {
      res.status(403).json({
        error: 'Access Denied.'
      });
    });
  } else {
    res.status(403).json({
      error: 'Access Denied.'
    });
  }
};
