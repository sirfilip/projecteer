var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projecteer');

var app = require('./app');
var port = process.env.PORT || 3000;




app.listen(port, function(error) {
  if (error) {
    throw error;
  }
  console.log('app running on port ' + port);
});
