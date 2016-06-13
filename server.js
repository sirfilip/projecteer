var app = require('./app');
var config = require('./config');


app.listen(config.port, function(error) {
  if (error) {
    throw error;
  }
  console.log('app running on http://localhost:' + config.port);
});
