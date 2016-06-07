var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieParser = require('cookie-parser');

var app = express();

// configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('view cache', false);
swig.setDefaults({ cache: false });

// middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.json());

// routes
app.use(cookieParser(), equire('./routes/web/site'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/projects', require('./middlewares/auth'), require('./routes/api/v1/projects'));


module.exports = app;
