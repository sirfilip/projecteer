var Project = require('../models/project');

module.exports =  {
  all: function() {
    return Project.find({});
  },

  create: function(project) {
    return Project.create(project);
  },

  findById: function(id) {
    return Project.findById(id);
  },

  findByIdAndUpdate: function(id, project) {
    return Project.findOneAndUpdate({_id: id}, project,  {new: true});
  },

  delete: function(id) {
    return Project.remove({_id: id}).exec();
  }
};
