var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../AppDispatcher');
var constants = require('./constants');

var CHANGE = 'change';

var Store = assign({}, EventEmitter.prototype, {

  projects: [],

  getProjects: function() {
    return this.projects;
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

  addProject: function(project) {
    this.projects.concat([project]);
    this.triggerChange();
  },

  addProjects: function(projects) {
    this.projects = this.projects.concat(projects);
    this.triggerChange();
  },

  removeProject: function(projectId) {
    this.projects = _.reject(this.projects, function(project) {
      return project._id === projectId;
    });
    this.triggerChange();
  }

});

//window.stores = window.stores || {};
//window.stores.UserProjectsStore = AppDispatcher.register

AppDispatcher.register(function(payload) {
  switch(payload.action.type) {
    case constants.PROJECT_USER_PROJECTS_LOAD:
      Store.addProjects(payload.action.projects);
    break;
  }
});

module.exports = Store;
