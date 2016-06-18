var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var mountApi = require('./middlewares/mount_api');
var db = require('./middlewares/db');
var cookieParser = require('cookie-parser');
var apiResponse = require('./middlewares/api_response');
var swig = require('swig');

var app = express();

// configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');

swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/views' )});

app.set('view cache', false);
swig.setDefaults({ cache: false });

// gateway
app.use('/api/v1/projects', require('./middlewares/auth'), mountApi('http://localhost:3001'));

// middlewares
// app.use(db);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.json());

// routes
app.use(cookieParser(), bodyParser.urlencoded({extended: true}), require('./routes/web/site'));
app.use('/api/v1/auth', apiResponse, require('./routes/api/v1/auth'));
// app.use('/api/v1/projects', apiResponse, require('./middlewares/auth'), require('./routes/api/v1/projects'));

module.exports = app;
