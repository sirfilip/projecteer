function authority = function(req, res, next) {
  var authority = req.headers['x-authority'];

  if (authority) {
    req.authority = authority;
    next();
  } else {
    res.status(403).send('Not authorized');
  }
}

module.exports = authority;
