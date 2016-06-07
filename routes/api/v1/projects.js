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
      res.json({error: error, data: null, status: 500});
    } else {
      res.json({error: null, data: result, status: 200});
    }
  });
});

router.post('/', function(req, res, next) {
  indicative.validate(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.json({error: errors, status: 400});
  });
}, function(req, res) {

  var project = new Project(req.body);

  project.save(function(err) {
    if(err) {
      res.json({error: err, data: null, status: 500});
    } else {
      res.json({error: null, data: project});
    }
  });

});

router.get('/:id', function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.json({error: err, status: 500});
    } else if(project) {
      res.json({error: null, data: project, status: 200});
    } else {
      res.json({error: null, data: 'Not Found', status: 404});
    }
  });
});

router.put('/:id', function(req, res, next) {
  indicative.validate(req.body, ProjectValidator.rules, ProjectValidator.messages).then(function() {
    next();
  }).catch(function(errors) {
    res.json({error: errors, status: 400});
  });
}, function(req, res) {
  Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, project) {
    if (err) {
      res.json({error: err, status: 500});
    } else if (! project) {
      res.json({error: null, data: 'Not Found', status: 404});
    } else {
      res.json({error: null, data: project, status: 200});
    }
  });
});

router.delete('/:id', function(req, res) {
  Project.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.json({error: err, status: 500});
    } else {
      res.json({error: null, data: 'Project Deleted Successfully.', status: 200});
    }
  });
});

module.exports = router;
