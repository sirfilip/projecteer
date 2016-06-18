var AppDispatcher = require('../AppDispatcher');
var api = require('../../lib/api');
var constants = require('./constants');

module.exports = {
  loadProjects: function() {
    api.get('/projects/latest').then(function(res) {
      AppDispatcher.handleViewAction({
        type: constants.PROJECT_LATEST_PROJECTS_LOAD,
        projects: res
      });
    });
    api.get('/projects/participating').then(function(res) {
      AppDispatcher.handleViewAction({
        type: constants.PROJECT_USER_PROJECTS_LOAD,
        projects: res
      });
    });
  },

  createProject: function(project) {
    api.post('/projects', project).then(function(project) {
      AppDispatcher.handleViewAction({
        type: constants.PROJECT_CREATION_SUCCESSFUL,
        project: project
      });
    }).catch(function(errors) {
      AppDispatcher.handleViewAction({
        type: constants.PROJECT_CREATION_FAILED,
        errors: errors
      });
    });
  }
};
