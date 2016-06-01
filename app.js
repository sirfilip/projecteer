var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.json());

// routes
app.use('/api/v1/projects', require('./routes/projects'));


module.exports = app;
