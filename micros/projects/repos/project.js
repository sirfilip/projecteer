var Project = require('../models/project');

module.exports =  {
  all: function(authority) {
    return Project.authorizedFor(authority);
  },

  create: function(project, authority) {
    project.authority = authority;
    return Project.create(project);
  },

  findById: function(id, authority) {
    return Project.authorizedFor(authority).where({_id:id});
  },

  findByIdAndUpdate: function(id, project, authority) {
    return Project.findOneAndUpdate({_id: id, authority: authority}, project,  {new: true});
  },

  delete: function(id, authority) {
    return Project.authorizedFor(authority).remove({_id: id}).exec();
  }
};
