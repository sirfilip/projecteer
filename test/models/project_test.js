var assert = require('assert');
var Project = require('../../models/project');
var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

describe(Project, function() {

  before(function(done) {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect('mongodb://localhost/projecteer_test', done);
    } else {
      done();
    }
  });

  beforeEach(function(done) {
    return Project.remove({}, done);
  });

  // it('can find all public projects', function(done) {
  //   var publicProject = new Project({name: 'my public project'});
  //   var privateProject = new Project({name: 'my private project'});
  //   privateProject.makePrivate();
  //   async.parallel([
  //     function(callback) {
  //       publicProject.save(function(err, result) {
  //         if (err) {
  //           callback(err);
  //         } else {
  //           callback(null);
  //         }
  //       });
  //     },
  //     function(callback) {
  //       privateProject.save(function(err, result) {
  //         if (err) {
  //           callback(err);
  //         } else {
  //           callback(null);
  //         }
  //       });
  //     }
  //   ], function(err, result) {
  //     if (err) done(err);
  //     Project.public(function(err, result) {
  //       assert.equal(null, err);
  //       assert.equal(1, result.length);
  //       var foundProject = result[0];
  //       assert.equal(publicProject.id.toString(), foundProject.id.toString());
  //       done();
  //     });
  //   });
  // });

  it('opened by default', function() {
    var project = new Project();
    assert.equal(true, project.isOpened());
  });

  it('can be opened and closed', function() {
    var project  = new Project();
    project.close();
    assert.equal(true, project.isClosed());
    project.open();
    assert.equal(true, project.isOpened());
  });

  it('is public by default', function() {
    var project = new Project();
    assert.equal(true, project.isPublic());
  });

  it('can toggle the visibility', function() {
    var project = new Project();
    assert.equal(true, project.isPublic());
    project.makePrivate();
    assert.equal(true, project.isPrivate());
    project.makePublic();
    assert.equal(true, project.isPublic());
  });

});
