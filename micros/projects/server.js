var app = require('./app');
var config = require('./config');

app.listen(config.port, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Projects api running on http://localhost:" + config.port);
  }
});
