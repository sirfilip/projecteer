var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var mongoose = require('mongoose');
var Project = require('../../models/project');

describe('projects router', function() {

  function  apiUrl(path) {
    return '/api/v1/projects' + path;
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

  it ('can access all projects', function(done) {
    supertest(app)
      .get(apiUrl('/'))
      .set(jsonHeaders)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(null, res.body.error);
        done();
      });
  });

  describe('project creation', function() {
    var validProject;

    beforeEach(function() {
      validProject = {name: 'Test Project'};
    });

    it('can create a valid project', function(done) {
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(validProject)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(null, res.body.error);
          assert.equal(validProject.name, res.body.data.name);
          done();
        });
    });

    it('cant create a project without name', function(done) {
      var invalidProject = {name:''};
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(invalidProject)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          var error = res.body.error[0];
          assert.equal('name', error.field);
          assert.equal('The name of the project is required.', error.message);
          done();
        });
    });

    it('cant create a project with very a name larger then 256 chars', function(done) {
      var invalidProject = {name: Array(258).join('x')};
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(invalidProject)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          var error = res.body.error[0];
          assert.equal('name', error.field);
          assert.equal('The name cannot be longer then 256 characters.', error.message);
          done();
        });
    });

    it('cant create a project with invalid status', function(done) {
      var invalidProject = {name: 'Test Project', status: 'bad status'};
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(invalidProject)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          var error = res.body.error[0];
          assert.equal('status', error.field);
          assert.equal('Status can be either opened or closed.', error.message);
          done();
        });
    });

    it('can create a project with valid status', function(done) {
      validProject.status = 'closed';
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(validProject)
        .expect(200)
        .end(function(err, res) {
          assert.equal(validProject.status, res.body.data.status);
          done();
        });
    });

    it('cant create a project with invalid visibility', function(done) {
      var invalidProject = {name: 'Test Project', visibility: 'bad visibility'};
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(invalidProject)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          var error = res.body.error[0];
          assert.equal('visibility', error.field);
          assert.equal('Visibility can be either private or public', error.message);
          done();
        });
    });

    it('can create a project with valid visibility', function(done) {
      validProject.visibility = 'private';
      supertest(app)
        .post(apiUrl('/'))
        .set(jsonHeaders)
        .send(validProject)
        .expect(200)
        .end(function(err, res) {
          assert.equal(validProject.visibility, res.body.data.visibility);
          done();
        });
    });

  });

  it('can access existing project', function(done) {
    Project.create({name: 'Test Project'}, function(err, project) {
      var project_id = project._id;
      supertest(app)
        .get(apiUrl('/' + project_id))
        .set(jsonHeaders)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(null, res.body.error);
          assert.equal(project.name, res.body.data.name);
          done();
        });
    });
  });

  it('returns 404 if the project is not found', function(done) {
    supertest(app)
      .get(apiUrl('/' + generateId()))
      .set(jsonHeaders)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(null, res.body.error);
        assert.equal('Not Found', res.body.data);
        done();
      });
  });

  it('can update an existing project', function(done) {
    var validProject = {name: 'Test Project'};
    Project.create(validProject, function(err, project) {
        validProject.name = 'Updated Project Name';
        supertest(app)
          .put(apiUrl('/' + project._id))
          .set(jsonHeaders)
          .send(validProject)
          .expect(200)
          .end(function(err, res) {
            assert.equal(validProject.name, res.body.data.name);
            done();
          });
    });

  });

  it('it cant update not existing project', function(done) {
    var id = generateId();
    var validProject = {name: 'Test Project'};
    supertest(app)
      .put(apiUrl('/' + id))
      .set(jsonHeaders)
      .send(validProject)
      .expect(404)
      .end(function(err, res) {;
        assert.equal('Not Found', res.body.data);
        Project.findById(id, function(err, project) {
          assert.equal(null, project);
          done();
        });
      });

  });

  it ('can delete existing project', function(done) {
    Project.create({name: 'Test Project'}, function(err, project) {
      var project_id = project._id;
      supertest(app)
        .delete(apiUrl('/' + project_id))
        .set(jsonHeaders)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(null, res.body.error);
          assert.equal('Project Deleted Successfully.', res.body.data);
          done();
        });
    });
  });

});
