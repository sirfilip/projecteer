var router = require('express').Router();
var Project = require('../models/project');
var Joi = require('joi');

router.get('/', function(req, res) {
  Project.find({}).exec(function(err, result) {
    if (err) {
      res.json({error: error, data: null});
    } else {
      res.json({error: null, data: result});
    }
  });
});

router.post('/', function(req, res, next) {
  var schema = Joi.object().keys({
    name: Joi.string()
            .regex(/^[-a-z0-9_ ]+$/i)
            .max(256)
            .required()
            .label('name')
            .example("Example Project"),
    description: Joi.string().label('description'),
    visibility: Joi.string()
            .regex(/^public|private$/)
            .optional()
            .label('visibility'),
    status: Joi.string()
            .regex(/^(opened|closed)$/)
            .optional()
            .label('status')
  });
  Joi.validate(req.body, schema, function(err, value) {
    if (err) {
      res.status(400).json({error: err});
    } else {
      req.body = value;
      next();
    }
  });
}, function(req, res) {

  var project = new Project(req.body);

  project.save(function(err) {
    if(err) {
      res.json({error: err, data: null});
    } else {
      res.json({error: null, data: project});
    }
  });

});

router.get('/:id', function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.statuc(500).json({error: err});
    } else if(project) {
      res.json({error: null, data: project});
    } else {
      res.status(404).json({error: null, data: 'Not Found'});
    }
  });
});

router.put('/:id', function(req, res, next) {
  var schema = Joi.object().keys({
    name: Joi.string()
            .regex(/^[-a-z0-9_ ]+$/i)
            .max(256)
            .required()
            .label('name')
            .example("Example Project"),
    description: Joi.string().label('description'),
    visibility: Joi.string()
            .valid('public', 'private')
            .optional()
            .label('visibility'),
    status: Joi.string()
            .valid('opened', 'closed')
            .optional()
            .label('status')
  });
  Joi.validate(req.body, schema, function(err, value) {
    if (err) {
      res.status(400).json({error: err});
    } else {
      req.body = value;
      next();
    }
  });

}, function(req, res) {
  Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, project) {
    if (err) {
      res.status(500).json({error: err});
    } else if (! project) {
      res.status(404).json({error: null, data: 'Not Found'});
    } else {
      res.json({error: null, data: project});
    }
  });
});

router.delete('/:id', function(req, res) {
  Project.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json({error: null, data: 'Project Deleted Successfully.'})
    }
  });
});

module.exports = router;
