var jwt = require('../services/jwt');

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'] || req.query.token || (req.cookies && req.cookies.auth); // || req.body.token;

  if (token) {
    jwt.verify(token).then(function(data) {
      req.userdata = data;
      next();
    }).catch(function(err) {
      res.format({
        json: function() {
          res.status(403).json({
            error: 'Access Denied.'
          });
        },
        html: function() {
          res.redirect('/login');
        }
      });
    });
  } else {
    res.format({
      json: function() {
        res.status(403).json({
          error: 'Access Denied.'
        });
      },
      html: function() {
        res.redirect('/login');
      }
    });
  }
};
