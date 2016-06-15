var jwt = require('jsonwebtoken');
var secret = require('../config').secret;




module.exports = {
  generateTokenFor: function(obj) {
    return jwt.sign(obj, secret, {
      expiresIn: "24h"
    });
  },
  verify: function(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
