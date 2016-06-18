var AppDispatcher = require('../AppDispatcher');
var api = require('../../lib/api');
var constants = require('./constants');

module.exports = {
  loadProjects: function() {
    api.get('/projects').then(function(res) {
      AppDispatcher.handleViewAction({
        type: constants.PROJECT_USER_PROJECTS_LOAD,
        projects: res
      });
    });
  }
};
