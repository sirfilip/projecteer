var express = require('express');
var indicative  = require('indicative');
var bodyParser = require('body-parser');
var ProjectRepo = require('./repos/project');
var apiResponse = require('../../middlewares/api_response');
var authRequired = require('../../middlewares/authority');

var app = express();
app.use(bodyParser.json());
app.use(apiResponse);
app.use(authRequired);

var ProjectValidator = {
  rules: {
    name: 'max:256|required',
    descripion: 'max:1024',
    visibility: 'in:public,private',
    status: 'in:opened,closed'
  },
  messages: {
    'name.max': 'The name cannot be longer then 256 characters.',
    'name.required': 'The name of the project is required.',
    'visibility.in': 'Visibility can be either private or public',
    'status.in': 'Status can be either opened or closed.',
  }
};

app.get('/', function(req, res) {
  ProjectRepo.all(req.authority).then(function(result) {
    res.respondWith(result);
  }).catch(function(err) {
    res.failWith(500, err);
  });
});

app.get('/latest', function(req, res) {
  ProjectRepo.latest(req.authority).then(function(result) {
    res.respondWith(result);
  }).catch(function(err) {
    res.failWith(500, err)
  });
});

app.get('/participating', function(req, res) {
  ProjectRepo.participating(req.authority).then(function(result) {
    res.respondWith(result);
  }).catch(function(err) {
    res.failWith(500, err)
  });
});

app.post('/', function(req, res, next) {
  indicative.validateAll(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.failWith(400, errors);
  });
}, function(req, res) {
  ProjectRepo.create(req.body, req.authority).then(function(project) {
    res.respondWith(project);
  }).catch(function(err) {
    res.failWith(500, err);
  });
});

app.get('/:id', function(req, res) {
  ProjectRepo.findById(req.params.id, req.authority).then(function(projects){
    if (projects.length !== 0) {
      res.respondWith(projects.pop());
    } else {
      res.failWith(404, 'Not Found');
    }
  }).catch(function(err) {
    res.failWith(500, err);
  });
});

app.put('/:id', function(req, res, next) {
  indicative.validateAll(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.failWith(400, errors);
  });
}, function(req, res) {
  ProjectRepo.findByIdAndUpdate(req.params.id, req.body, req.authority).then(function(project) {
    if (project) {
      res.respondWith(project);
    } else {
      res.failWith(404, 'Not Found');
    }
  }).catch(function(err) {
      res.failWith(500, err);
  });
});

app.delete('/:id', function(req, res) {
  ProjectRepo.delete(req.params.id, req.authority).then(function() {
    res.respondWith('Project Deleted Successfully.');
  });
});

module.exports = app;
