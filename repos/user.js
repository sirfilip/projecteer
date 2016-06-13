var crypto = require('crypto');
var config = require('../config');

function encrypt(str) {
  return crypto.createHash('sha256').update(str + config.secret).digest('hex');
}

module.exports = function(db) {
  var users = db.collection('users');

  return {
    register: function(user) {
      user.hashedPassword = encrypt(user.password);
      user.password = null;
      user.id = users.insert(user);
      return new Promise(function(resolve, reject) {
        resolve(user);
      });
    },
    login: function(email, password) {
      return new Promise(function(resolve, reject) {
        var user = users.where({email: email}).items[0];
        if (user && user.hashedPassword === encrypt(password)) {
          resolve(user);
        }
        reject(null);
      });
    }
  };
};
