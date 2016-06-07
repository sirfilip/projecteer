var apiClient = (function($) {
  return {
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
    request: function(type, path, data) {
      data = data || {};
      return $.ajax({
        headers: {
          'x-access-token': this._getToken()
        },
        type: type,
        url: this._url(path),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify(data)
      });
    },
    isAuthenticated: function() {
      return !!this._getToken();
    },
    authenticate: function(email, password) {
      var deferred = $.Deferred();
      var self = this;
      this.request('post', '/auth/login', {
        email: email,
        password: password
      }).done(function(response) {
        if (! response.error) {
          self._setToken(response.data.token);
          deferred.resolve({
            message: response.data.message,
            token: response.data.token
          });
        } else {
          deferred.reject(response.error);
        }
      }).fail(function(error) {
        deferred.reject(error);
      });

      return deferred.promise();
    },
    logout: function() {
      this._token = null;
      localStorage.removeItem('token');
    }
  };
})(jQuery);
