var projectsRouter = require('express').Router();

projectsRouter.get('/', function(req, res) {
  res.send('Ok');
});

module.exports = projectsRouter;
