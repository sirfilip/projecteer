var request = require('superagent');
//var Promise = require('bluebird');

module.exports = {

  post: function(path, data) {
    data = data || {};
    return new Promise(function(resolve, reject) {
      request
        .post(this._url(path))
        .set('x-access-token', this._getToken())
        .send(data)
        .end(function(err, res) {
          if (err) throw err;

          if (res.body.error) {
            reject(res.body.error);
          } else {
            resolve(res.body.data);
          }
        });
    }.bind(this));
  },

  get: function(path) {
    return new Promise(function(resolve, reject) {
      request
        .get(this._url(path))
        .set('x-access-token', this._getToken())
        .end(function(err, res) {
          if (err) throw err;

          if (res.body.error) {
            reject(res.body.error);
          } else {
            resolve(res.body.data);
          }
        });
    }.bind(this));
  },

  put: function(path, data) {
    return new Promise(function(resolve, reject) {
      request
        .put(this._url(path))
        .set('x-access-token', this._getToken())
        .send(data)
        .end(function(err, res) {
          if (err) throw err;

          if (res.body.error) {
            reject(res.body.error);
          } else {
            resolve(res.body.data);
          }
        });
    }.bind(this));
  },

  delete: function(path) {
    return new Promise(function(resolve, reject) {
      request
        .delete(this._url(path))
        .set('x-access-token', this._getToken())
        .end(function(err, res) {
          if (err) throw err;

          if (res.body.error) {
            reject(res.body.error);
          } else {
            resolve(res.body.data);
          }
        });
    }.bind(this));
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
    return this.post('/auth/login', {
      email: email,
      password: password
    });
  },
  logout: function() {
    this._token = null;
    localStorage.removeItem('token');
  }
};
