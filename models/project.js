var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1024,
    trim: true
  },
  status: {
    type: String,
    default: 'opened',
    enum: {
      values: ['opened', 'closed'],
      message: 'Status can be either opened or closed'
    }
  },
  visibility: {
    type: String,
    default: 'public',
    enum: {
      values: ['public', 'private'],
      message: 'Visibility can be either public or private.'
    }
  },
  created_at: Date,
  updated_at: Date
});

// hooks
projectSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (! this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

// static methods
projectSchema.statics.public = function() {
  return this.find({visibility: 'public'});
};

// instance methods
projectSchema.methods.open = function() {
  this.status = 'opened';
};
projectSchema.methods.close = function() {
  this.status = 'closed';
};

projectSchema.methods.isOpened = function() {
  return this.status === 'opened';
};

projectSchema.methods.isClosed = function() {
  return this.status === 'closed';
};

projectSchema.methods.isPublic = function() {
  return this.visibility === 'public';
};

projectSchema.methods.isPrivate = function() {
  return this.visibility === 'private';
};

projectSchema.methods.makePrivate = function() {
  this.visibility = 'private';
};

projectSchema.methods.makePublic = function() {
  this.visibility = 'public';
};


module.exports = mongoose.model('Project', projectSchema);
