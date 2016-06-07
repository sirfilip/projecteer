var router = require('express').Router();
var Project = require('../../../models/project');
var indicative  = require('indicative');

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

router.get('/', function(req, res) {
  Project.find({}).exec(function(err, result) {
    if (err) {
      res.failWith(500, error);
    } else {
      res.respondWith(result);
    }
  });
});

router.post('/', function(req, res, next) {
  indicative.validate(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.failWith(400, errors);
  });
}, function(req, res) {

  var project = new Project(req.body);

  project.save(function(err) {
    if(err) {
      res.failWith(500, err);
    } else {
      res.respondWith(project);
    }
  });

});

router.get('/:id', function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.failWith(500, err);
    } else if(project) {
      res.respondWith(project);
    } else {
      res.failWith(404, 'Not Found');
    }
  });
});

router.put('/:id', function(req, res, next) {
  indicative.validate(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.failWith(400, errors);
  });
}, function(req, res) {
  Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, project) {
    if (err) {
      res.failWith(500, err);
    } else if (! project) {
      res.failWith(404, 'Not Found');
    } else {
      res.respondWith(project);
    }
  });
});

router.delete('/:id', function(req, res) {
  Project.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.failWith(500, err);
    } else {
      res.respondWith('Project Deleted Successfully.');
    }
  });
});

module.exports = router;
