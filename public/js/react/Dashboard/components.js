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



window.reactComponents = window.reactComponents || {};
window.reactComponents.UserProjectsListComponent = React.createClass({

  getInitialState: function() {
    return {
      projects: []
    };
  },

  componentDidMount: function() {
    console.log('Component did mount');
    Store.addChangeListener(this._onChange);
    actions.loadProjects();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({projects: Store.getProjects()});
  },

  render: function() {
    var projects = this.state.projects.map(function(project) {
      return <ProjectsListItem name={project.name} description={project.description} project_id={project._id} key={project._id} />;
    });

    return <div className="project-list">
      <h2>Projects</h2>
      <table className="table">
        <tbody>
          {projects}
        </tbody>
      </table>
    </div>;
  }

});

module.exports = window.reactComponents.UserProjectsListComponent;
