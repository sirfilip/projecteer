var Store = require('./store');
var actions = require('./actions');

window.reactComponents = window.reactComponents || {};
window.reactComponents.LoginFormComponent = React.createClass({

  getInitialState: function() {
    return Store.getState();
  },

  _onChange: function() {
    this.setState(Store.getState());
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  handleLogin: function(e) {
    e.preventDefault();
    var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();
    actions.authenticate(email, password);
  },

  render: function() {
    var errorMessage = null;

    if (this.state.errorMessages.length > 0) {
      var messages = _.map(this.state.errorMessages, function(error) {
        return <p>{error.message}</p>;
      });
      errorMessage = <div className="alert alert-danger">{messages}</div>;
    }

    return (
      <div style={{margin: "40px 0"}} className="login">
        <div className="row">
    			<div className="col-sm-6 col-md-4 col-md-offset-4">
    				<div className="panel panel-default">
    					<div className="panel-heading">
    						<strong> Sign in to continue</strong>
    					</div>
    					<div className="panel-body">
                {errorMessage}
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
    						Don't have an account! <a href="/register"> Sign Up Here </a>
    					</div>
            </div>
    			</div>
    		</div>
      </div>
    );
  }

});
