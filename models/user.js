var mongoose = require('mongoose');
var crypto = require('crypto');
var config = require('../config');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  }
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + ':' + config.secret).digest('hex');
}

UserSchema.statics.register = function(user) {
  user.hashedPassword = hashPassword(user.password);

  return new Promise(function(resolve, reject) {
    this.create(user, function(err, u) {
      if (err) {
        reject(err);
      } else {
        resolve(u);
      }
    });
  }.bind(this));
};

UserSchema.statics.login = function(email, password) {
  var hashedPassword = hashPassword(password);
  return new Promise(function(resolve, reject) {
    this.findOne({email: email, hashedPassword: hashedPassword}, function(err, user) {
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  }.bind(this));
}




module.exports = mongoose.model('User', UserSchema);
