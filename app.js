var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// middlewares
app.use(bodyParser.json());

// routes
app.use('/api/v1/projects', require('./routes/projects'));


module.exports = app;
