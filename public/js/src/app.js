var App = (function($, apiClient) {

  var mainContent = document.getElementById('main-content');

  return {

    listeners: {},

    on: function(event, cb) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(cb);
      return this;
    },

    trigger: function(event, data) {
      if (! this.listeners[event]) return;

      var i;
      for (i=0; i < this.listeners[event].length; i++) {
        this.listeners[event][i].call(this, data);
      }
    },

    page: null,

    start: function() {
      if (apiClient.isAuthenticated()) {
        this.dashboard();
      } else {
        this.authenticate();
      }
    },
    dashboard: function() {
      this.page = ReactDOM.render(React.createElement('h1', null, "Dashboard"), mainContent);
    },
    authenticate: function() {
      this.page = ReactDOM.render(<AuthComponent />, mainContent);
    }
  }
})(jQuery, apiClient);
App.start();// add some change...
App.on('auth:login-successfull', function() {
  App.dashoard();
});
