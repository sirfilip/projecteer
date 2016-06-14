var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../AppDispatcher');
var constants = require('./constants');

var CHANGE = 'change';

var Store = assign({}, EventEmitter.prototype, {
  errorMessages: [],
  loginInProgress: false,
  loggedIn: false,

  getState: function() {
    return {
      errorMessages: this.errorMessages,
      loginInProgress: this.loginInProgress,
      loggedIn: this.loggedIn
    };
  },

  addChangeListener: function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(callback);
  },

  triggerChange: function() {
    this.emit(CHANGE);
  },

  startLoginProcess: function() {
    this.loginInProgress = true;
    this.triggerChange();
  },

  loginFailed: function(errors) {
    this.loginInProgress = false;
    this.errorMessages = errors;
    this.triggerChange();
  },

  loginSuccessfull: function() {
    this.errorMessages = [];
    this.loggedIn = true;
    this.triggerChange();
  }

});


AppDispatcher.register(function(payload) {
  if (payload.source !== 'VIEW_ACTION') return true; // interested in view actions only

  switch(payload.action.type) {
    case constants.LOGIN_IN_PROGRESS:
      Store.startLoginProcess();
      break;
    case constants.LOGIN_FAILED:
      Store.loginFailed(payload.action.errors);
      break;
    case constants.LOGIN_SUCCESSFULL:
      Store.loginSuccessfull();
      window.location.href = '/dashboard';
      break;
    default:
      break;
  }

  return true;
});

module.exports = Store;
