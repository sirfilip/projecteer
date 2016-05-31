var supertest = require('supertest');
var app = require('../../app');
var assert = require('assert');
var mongoose = require('mongoose');

describe('projects router', function() {

  before(function(done) {
    mongoose.connect('mongodb://localhost/projecteer_test', done);
  });

  it ('can access all projects', function(done) {
    supertest(app)
      .get('/api/v1/projects')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(null, res.body.error);
        done();
      });
  });

});
