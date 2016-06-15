var app = require('./app');
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projecteer');

app.listen(config.port, function(error) {
  if (error) {
    throw error;
  }
  console.log('app running on http://localhost:' + config.port);
});
