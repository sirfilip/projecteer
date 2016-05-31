var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  name: String,
  status: String
});

projectSchema.methods.open = function() {
  this.status = 'opened';
};
projectSchema.methods.close = function() {
  this.status = 'closed';
};


module.exports = mongoose.model('Project', projectSchema);
