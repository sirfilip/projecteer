var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var mongoose = require('mongoose');
var Project = require('../../models/project');

describe('projects router', function() {
  function  apiUrl(path) {
    var url = '/api/projects' + path + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTc2MDkxMmNmZGQ4MTM3NTEyYTExZmUwIiwiaWF0IjoxNDY1OTQ2ODA3LCJleHAiOjE0NjYwMzMyMDd9.RMCPQOeQQTTIGSUNeTVu4gCqJrHOVFEu1BbTpZVQ6sA";
    console.log(url);
    return url;
  };

  function generateId() {
    return mongoose.Types.ObjectId();
  };

  var jsonHeaders = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  };

  before(function(done) {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect('mongodb://localhost/projecteer_test', done);
    } else {
      done();
    }
  });

  afterEach(function(done) {
    return Project.remove({}, done);
  });
});
