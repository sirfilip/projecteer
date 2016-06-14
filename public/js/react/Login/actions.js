var constants = require('./constants');
var AppDispatcher = require('../AppDispatcher');
var api = require('../../lib/api');

module.exports = {
  authenticate: function(email, password) {
    AppDispatcher.handleViewAction({
      type: constants.LOGIN_IN_PROGRESS
    });
    api.authenticate(email, password).then(function(result) {
      AppDispatcher.handleViewAction({
        type: constants.LOGIN_SUCCESSFULL,
        token: result.token
      });
    }).catch(function(error) {
      AppDispatcher.handleViewAction({
        type: constants.LOGIN_FAILED,
        errors: error
      });
    });
  }
};
