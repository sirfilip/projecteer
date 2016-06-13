var LocallyDB = require('locallydb');
var _db = new LocallyDB('../db.json');

function db(req, res, next) {
  req.db = _db;
  next();
}

module.exports = db;
