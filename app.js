var express = require('express');
var app = express();


app.use('/api/v1/projects', require('./routes/projects'));




module.exports = app;
