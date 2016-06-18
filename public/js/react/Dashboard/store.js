var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../AppDispatcher');
var constants = require('./constants');

var CHANGE = 'change';

var Store = assign({}, EventEmitter.prototype, {

  projects: {
    latest: [],
    participating: [],
  },
  errors: [],

  getProjects: function(group) {
    return this.projects[group];
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

  addProject: function(group, project) {
    this.projects[group] = this.projects[group].concat([project]);
    this.triggerChange();
  },

  addProjects: function(group, projects) {
    this.projects[group] = this.projects[group].concat(projects);
    this.triggerChange();
  },

  storeErrors: function(errors) {
    this.errors = errors;
    this.triggerChange();
  },

  clearErrors: function() {
    this.errors = [];
    this.triggerChange();
  },

  getErrors: function() {
    return this.errors;
  }
});

//window.stores = window.stores || {};
//window.stores.UserProjectsStore = AppDispatcher.register

AppDispatcher.register(function(payload) {
  switch(payload.action.type) {
    case constants.PROJECT_LATEST_PROJECTS_LOAD:
      Store.addProjects('latest', payload.action.projects);
    break;
    case constants.PROJECT_USER_PROJECTS_LOAD:
      Store.addProjects('participating', payload.action.projects);
    break;
    case constants.PROJECT_CREATION_SUCCESSFUL:
      Store.addProject('participating', payload.action.project);
      Store.addProject('latest', payload.action.project);
      Store.clearErrors();
    break;
    case constants.PROJECT_CREATION_FAILED:
      Store.storeErrors(payload.action.errors);
    break;
  }
});

module.exports = Store;
