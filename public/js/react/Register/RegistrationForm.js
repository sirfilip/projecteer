var api = require('../../lib/api');

window.reactComponents = window.reactComponents || {};
window.reactComponents.RegistrationFormComponent = React.createClass({

  getInitialState: function() {
    return {
      errorMessages: []
    };
  },

  handleSignUp: function(e) {
    e.preventDefault();
    var username = $(e.target).find('[name=email]').val();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();

    api.post('/auth/register', {
      username: username,
      email: email,
      password: password
    }).then(function(res) {
      window.location.href = '/login';
    }).catch(function(errors) {
      this.setState({errorMessages: errors});
    }.bind(this));
  },

  render: function() {
    var error = null;
    if (this.state.errorMessages.length > 0) {
      var errors = _.map(this.state.errorMessages, function(error) {
        return <p>{error.message}</p>;
      });
      error = <div className="alert alert-danger">{errors}</div>;
    }

    return (
      <div style={{margin: "40px 0"}} className="login">
        <div className="row">
    			<div className="col-sm-6 col-md-4 col-md-offset-4">
    				<div className="panel panel-default">
    					<div className="panel-heading">
    						<strong> Sign Up</strong>
    					</div>
    					<div className="panel-body">
                {error}
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
    						Already a member? <a href="/login" > Login Here </a>
    					</div>
            </div>
    			</div>
    		</div>
      </div>
    );
  }

});
