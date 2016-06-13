module.exports = function(db) {
  var projects = db.collection('projects');

  return {
    all: function() {
      return new Promise(function(resolve, reject) {
        resolve(projects.items)
      });
    },

    create: function(project) {
      return new Promise(function(resolve, reject) {
        project.cid = projects.insert(project);
        resolve(project);
      });
    },

    findById: function(cid) {
      return new Promise(function(resolve, reject) {
        var project = projects.get(cid);
        if (project) {
          resolve(project);
        } else {
          reject(null);
        }
      })
    },

    findByIdAndUpdate: function(cid, project) {
      return new Promise(function(resolve, reject) {
        var originalProject = projects.get(cid);

        if (! originalProject) {
          reject(null);
        } else {
          projects.update(cid, project);
          resolve(projects.get(cid));
        }
      });
    },

    delete: function(cid) {
      return new Promise(function(resolve, reject) {
        resolve(projects.remove(cid));
      });
    }
  }

};
