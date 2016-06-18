window.reactComponents = window.reactComponents || {};

var actions = require('./actions');
var Store = require('./store');



var ProjectsListItem = React.createClass({

  render: function() {
    var href = "/projects/" + this.props.project_id;

    return <tr>
      <td><a href={href}>{this.props.name}</a></td>
      <td>{this.props.description}</td>
    </tr>;
  }

});


window.reactComponents.UserProjectsListComponent = React.createClass({

  getInitialState: function() {
    return {
      projects: []
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
    actions.loadProjects();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({projects: Store.getProjects(this.props.kind)});
  },

  render: function() {
    var title = this.props.kind === 'latest' ? 'Latest Projects' : 'Working On';
    var projects = this.state.projects.map(function(project) {
      return <ProjectsListItem name={project.name} description={project.description} project_id={project._id} key={this.props.kind + '-' + project._id} />;
    }.bind(this));

    return <div className="panel panel-default">
      <div className="panel-heading">{title}</div>
      <div className="panel-body">
        <div className="project-list">
          <table className="table table-striped">
            <tbody>
              {projects}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }

});

window.reactComponents.ProjectCreationFormComponent = React.createClass({
  getInitialState: function() {
    return {
      errors: Store.getErrors()
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('change...');
    this.setState({errors: Store.getErrors()});
    console.log(this.state.errors);
    if (this.state.errors.length === 0) {
      console.log('No errors clearing the form....');
      this.refs.project_creation_form.reset();
    }
  },

  onSubmit: function(e) {
    e.preventDefault();
    var form = e.target;
    actions.createProject({
      name: form.name.value,
      description: form.description.value,
      visibility: form.visibility.value
    });
  },

  render: function() {
    var error = null;
    if (this.state.errors.length > 0) {
      var errors = _.map(this.state.errors, function(error) {
        return <p>{error.message}</p>;
      });
      error = <div className="alert alert-danger">{errors}</div>;
    }

    return <div className="panel panel-default">
      <div className="panel-heading">Create new Project</div>
      <div className="panel-body">

        {error}

        <form action="#" method="POST" onSubmit={this.onSubmit} ref="project_creation_form">
          <div className="form-group">
            <label for="project-name-input">Name</label>
            <input className="form-control" name="name" id="project-name-input" defaultValue='' />
          </div>
          <div className="form-group">
            <label for="project-description-input">Description</label>
            <textarea className="form-control" id="project-description-input" name="description"></textarea>
          </div>
          <div className="form-group">
            <label for="project-visibility-input">Visibility</label>
            <select name="visibility" id="project-visibility-input" className="form-control">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>;
  }



});

// module.exports = window.reactComponents.UserProjectsListComponent;
