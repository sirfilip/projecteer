var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();

// configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.json());

// routes
app.use(require('./routes/site'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/projects', require('./middlewares/auth'), require('./routes/api/v1/projects'));


module.exports = app;
