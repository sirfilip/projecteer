
function respondWith(status, data) {
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    data = status;
    status = 200;
  }
  return this.json({error: null, status: status, data: data});
}

function failWith(status, error) {
  var args = Array.prototype.slice.call(arguments);
  if (typeof error === "string") {
    error = [{message: error}];
  }
  return this.json({error: error, status: status, data: null});
}

function apiResponse(req, res, next) {
  res.respondWith = respondWith;
  res.failWith = failWith;
  next();
};


module.exports = apiResponse;
