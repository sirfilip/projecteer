var AuthComponent = React.createClass({

  getInitialState: function() {
    return {
      mode: 'login'
    };
  },

  setRegisterMode: function(e) {
    e.preventDefault();
    this.setState({mode: 'register'});
  },

  setLoginMode: function(e) {
    e.preventDefault();
    this.setState({mode: 'login'});
  },

  handleLogin: function(e) {
    e.preventDefault();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();
    apiClient.authenticate(email, password).done(function(response) {
      App.trigger('auth:login-successfull');
    }).fail(function(error) {
      console.error(error);
    });
  },

  handleSignUp: function(e) {
    e.preventDefault();
    var username = $(e.target).find('[name=email]').val();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();

    apiClient.request('post', '/auth/register', {
      username: username,
      email: email,
      password: password
    }).done(function(response) {
      this.setState({mode: 'login'});
    }.bind(this)).fail(function(error){
      console.log(error);
    });
  },

  render: function() {
    if (this.state.mode === 'login') {
      return (
        <div style={{margin: "40px 0"}} className="login">
          <div className="row">
      			<div className="col-sm-6 col-md-4 col-md-offset-4">
      				<div className="panel panel-default">
      					<div className="panel-heading">
      						<strong> Sign in to continue</strong>
      					</div>
      					<div className="panel-body">
      						<form role="form" action="#" method="POST" onSubmit={this.handleLogin}>
      							<fieldset>
      								<div className="row">
      									<div className="col-sm-12 col-md-10  col-md-offset-1 ">
      										<div className="form-group">
      											<div className="input-group">
      												<span className="input-group-addon">
      													<i className="glyphicon glyphicon-envelope"></i>
      												</span>
      												<input className="form-control" placeholder="email" name="email" type="text" autofocus />
      											</div>
      										</div>
      										<div className="form-group">
      											<div className="input-group">
      												<span className="input-group-addon">
      													<i className="glyphicon glyphicon-lock"></i>
      												</span>
      												<input className="form-control" placeholder="Password" name="password" type="password" defaultValue="" />
      											</div>
      										</div>
      										<div className="form-group">
      											<input type="submit" className="btn btn-lg btn-primary btn-block" defaultValue="Sign in" />
      										</div>
      									</div>
      								</div>
      							</fieldset>
      						</form>
      					</div>
      					<div className="panel-footer ">
      						Don't have an account! <a href="#" onClick={this.setRegisterMode}> Sign Up Here </a>
      					</div>
              </div>
      			</div>
      		</div>
        </div>
      );
    } else {
      return (
        <div style={{margin: "40px 0"}} className="login">
          <div className="row">
      			<div className="col-sm-6 col-md-4 col-md-offset-4">
      				<div className="panel panel-default">
      					<div className="panel-heading">
      						<strong> Sign Up</strong>
      					</div>
      					<div className="panel-body">
      						<form role="form" action="#" method="POST" onSubmit={this.handleSignUp}>
      							<fieldset>
      								<div className="row">
      									<div className="col-sm-12 col-md-10  col-md-offset-1 ">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="glyphicon glyphicon-user"></i>
                            </span>
                            <input className="form-control" placeholder="username" name="username" type="text" autofocus />
                          </div>
                        </div>
      										<div className="form-group">
      											<div className="input-group">
      												<span className="input-group-addon">
      													<i className="glyphicon glyphicon-envelope"></i>
      												</span>
      												<input className="form-control" placeholder="email" name="email" type="text" />
      											</div>
      										</div>
      										<div className="form-group">
      											<div className="input-group">
      												<span className="input-group-addon">
      													<i className="glyphicon glyphicon-lock"></i>
      												</span>
      												<input className="form-control" placeholder="Password" name="password" type="password" defaultValue="" />
      											</div>
      										</div>
      										<div className="form-group">
      											<input type="submit" className="btn btn-lg btn-primary btn-block" defaultValue="Sign Up" />
      										</div>
      									</div>
      								</div>
      							</fieldset>
      						</form>
      					</div>
      					<div className="panel-footer ">
      						Already a member? <a href="#" onClick={this.setLoginMode}> Login Here </a>
      					</div>
              </div>
      			</div>
      		</div>
        </div>
      );
    }
  }

});
