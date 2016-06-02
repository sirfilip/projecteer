var mongoose = require('mongoose');
var crypto = require('crypto');

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
  password: {
    type: String,
    required: true
  }
});

function hashPassword(password) {
  var passwordSecret = 'secret';
  return crypto.createHash('sha256').update(password + ':' + passwordSecret).digest('hex');
}

UserSchema.statics.register = function(user) {
  user.password = hashPassword(user.password);

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
    this.findOne({email: email, password: hashedPassword}, function(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  }.bind(this));
}




module.exports = mongoose.model('User', UserSchema);
