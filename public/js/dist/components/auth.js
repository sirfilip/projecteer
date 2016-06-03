var AuthComponent = React.createClass({

  getInitialState: function () {
    return {
      mode: 'login'
    };
  },

  setRegisterMode: function (e) {
    e.preventDefault();
    this.setState({ mode: 'register' });
  },

  setLoginMode: function (e) {
    e.preventDefault();
    this.setState({ mode: 'login' });
  },

  handleLogin: function (e) {
    e.preventDefault();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();
    apiClient.authenticate(email, password).done(function (response) {
      EM.trigger('auth:login');
    }).fail(function (error) {
      console.error(error);
    });
  },

  handleSignUp: function (e) {
    e.preventDefault();
    var username = $(e.target).find('[name=email]').val();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();

    apiClient.request('post', '/auth/register', {
      username: username,
      email: email,
      password: password
    }).done(function (response) {
      this.setState({ mode: 'login' });
    }.bind(this)).fail(function (error) {
      console.log(error);
    });
  },

  render: function () {
    if (this.state.mode === 'login') {
      return React.createElement(
        'div',
        { style: { margin: "40px 0" }, className: 'login' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-sm-6 col-md-4 col-md-offset-4' },
            React.createElement(
              'div',
              { className: 'panel panel-default' },
              React.createElement(
                'div',
                { className: 'panel-heading' },
                React.createElement(
                  'strong',
                  null,
                  ' Sign in to continue'
                )
              ),
              React.createElement(
                'div',
                { className: 'panel-body' },
                React.createElement(
                  'form',
                  { role: 'form', action: '#', method: 'POST', onSubmit: this.handleLogin },
                  React.createElement(
                    'fieldset',
                    null,
                    React.createElement(
                      'div',
                      { className: 'row' },
                      React.createElement(
                        'div',
                        { className: 'col-sm-12 col-md-10  col-md-offset-1 ' },
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                              'span',
                              { className: 'input-group-addon' },
                              React.createElement('i', { className: 'glyphicon glyphicon-envelope' })
                            ),
                            React.createElement('input', { className: 'form-control', placeholder: 'email', name: 'email', type: 'text', autofocus: true })
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                              'span',
                              { className: 'input-group-addon' },
                              React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                            ),
                            React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password', defaultValue: '' })
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement('input', { type: 'submit', className: 'btn btn-lg btn-primary btn-block', defaultValue: 'Sign in' })
                        )
                      )
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'panel-footer ' },
                'Don\'t have an account! ',
                React.createElement(
                  'a',
                  { href: '#', onClick: this.setRegisterMode },
                  ' Sign Up Here '
                )
              )
            )
          )
        )
      );
    } else {
      return React.createElement(
        'div',
        { style: { margin: "40px 0" }, className: 'login' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-sm-6 col-md-4 col-md-offset-4' },
            React.createElement(
              'div',
              { className: 'panel panel-default' },
              React.createElement(
                'div',
                { className: 'panel-heading' },
                React.createElement(
                  'strong',
                  null,
                  ' Sign Up'
                )
              ),
              React.createElement(
                'div',
                { className: 'panel-body' },
                React.createElement(
                  'form',
                  { role: 'form', action: '#', method: 'POST', onSubmit: this.handleSignUp },
                  React.createElement(
                    'fieldset',
                    null,
                    React.createElement(
                      'div',
                      { className: 'row' },
                      React.createElement(
                        'div',
                        { className: 'col-sm-12 col-md-10  col-md-offset-1 ' },
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                              'span',
                              { className: 'input-group-addon' },
                              React.createElement('i', { className: 'glyphicon glyphicon-user' })
                            ),
                            React.createElement('input', { className: 'form-control', placeholder: 'username', name: 'username', type: 'text', autofocus: true })
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                              'span',
                              { className: 'input-group-addon' },
                              React.createElement('i', { className: 'glyphicon glyphicon-envelope' })
                            ),
                            React.createElement('input', { className: 'form-control', placeholder: 'email', name: 'email', type: 'text' })
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                              'span',
                              { className: 'input-group-addon' },
                              React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                            ),
                            React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password', defaultValue: '' })
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'form-group' },
                          React.createElement('input', { type: 'submit', className: 'btn btn-lg btn-primary btn-block', defaultValue: 'Sign Up' })
                        )
                      )
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'panel-footer ' },
                'Already a member? ',
                React.createElement(
                  'a',
                  { href: '#', onClick: this.setLoginMode },
                  ' Login Here '
                )
              )
            )
          )
        )
      );
    }
  }

});