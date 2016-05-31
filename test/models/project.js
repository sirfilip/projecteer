var assert = require('assert');
var Project = require('../../models/project');
var mongoose = require('mongoose');

describe(Project, function() {

  before(function(done) {
    mongoose.connect('mongodb://localhost/projecteer_test', done);
  });

  beforeEach(function(done) {
    return Project.remove({}, done);
  });

});
