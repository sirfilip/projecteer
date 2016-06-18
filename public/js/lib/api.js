var request = require('superagent');
//var Promise = require('bluebird');

module.exports = {

  post: function(path, data) {
    data = data || {};
    return request.post(this._url(path)).set('x-access-token', this._getToken()).send(data);
  },

  get: function(path) {
    return request.get(this._url(path)).set('x-access-token', this._getToken());
  },

  put: function(path, data) {
    return request.put(this._url(path)).set('x-access-token', this._getToken()).send(data);
  },

  delete: function(path) {
    return request.delete(this._url(path)).set('x-access-token', this._getToken());
  },

  _url: function(path) {
      return 'http://localhost:3000/api/v1' + path;
  },
  _token: null,
  _getToken: function() {
    if (! this._token) this._token = localStorage.getItem('token');
    return this._token;
  },
  _setToken: function(token) {
    this._token = token;
    localStorage.setItem('token', token);
  },
  isAuthenticated: function() {
    return !!this._getToken();
  },
  authenticate: function(email, password) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.post('/auth/login', {
        email: email,
        password: password
      }).end(function(err, res) {
        if (res.body.error) {
          reject(res.body.error);
        } else {
          self._setToken(res.body.data.token);
          resolve({
            message: res.body.data.message,
            token: res.body.data.token
          });
        }
      });
    });
  },
  logout: function() {
    this._token = null;
    localStorage.removeItem('token');
  }
};
