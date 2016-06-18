var Project = require('../models/project');

module.exports =  {
  all: function(authority) {
    return Project.visibleFor(authority);
  },

  create: function(project, authority) {
    project.authority = authority;
    return Project.create(project);
  },

  findById: function(id, authority) {
    return Project.visibleFor(authority).where({_id:id});
  },

  findByIdAndUpdate: function(id, project, authority) {
    return Project.findOneAndUpdate({_id: id, authority: authority}, project,  {new: true});
  },

  delete: function(id, authority) {
    return Project.authorizedFor(authority).remove({_id: id}).exec();
  },
  latest: function(authority) {
    return Project.visibleFor(authority).sort({created_at: -1}).limit(5);
  },
  participating: function(authority) {
    return Project.participating(authority);
  }
};
