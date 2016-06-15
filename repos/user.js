var User = require('../models/user');

module.exports = {
  register: function(user) {
    return User.register(user);
  },
  login: function(email, password) {
    return User.login(email, password);
  }
};
