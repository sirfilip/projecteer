var Application = function ($, apiClient) {

  var mainContent = document.getElementById('main-content');

  return {

    page: null,

    start: function () {
      if (apiClient.isAuthenticated()) {
        this.dashboard();
      } else {
        this.authenticate();
      }
    },
    dashboard: function () {
      this.page = ReactDOM.render(React.createElement('h1', null, "Dashboard"), mainContent);
    },
    authenticate: function () {
      this.page = ReactDOM.render(React.createElement(AuthComponent, null), mainContent);
    }
  };
}(jQuery, apiClient);
Application.start();