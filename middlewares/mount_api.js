var assign = require('object-assign');
var apiProxy = require('http-proxy').createProxyServer();

function mountApi(target, mountPoint) {
    var mountPoint = mountPoint || '/';
    return function (req, res, next) {
      var headers = assign({}, req.headers, {
        'x-authority': req.userdata.user_id
      });
      req.headers = headers;
      req.url = req.originalUrl.replace(req.baseUrl, mountPoint);
      console.log(req.url);
      apiProxy.web(req, res, {
        target: target,
      });
    };
}

module.exports = mountApi;
