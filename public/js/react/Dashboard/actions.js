var AppDispatcher = require('../AppDispatcher');
var api = require('../../lib/api');
var constants = require('./constants');

module.exports = {
  loadProjects: function() {
    return api.get('/projects').end(function(err, res) {
      console.log(err);
      if (err) {
        console.log(err, res.text);
      } else {
        AppDispatcher.handleViewAction({
          type: constants.PROJECT_USER_PROJECTS_LOAD,
          projects: res.body.data
        });
      }
    });
  }
};
