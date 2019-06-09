const Log = require("../models/Log.js");
const User = require("../models/User");
const UserController = require('../controllers/User');

module.exports.createNewReport = (newReport) => {
  return new Promise((resolve, reject) => {
    Log.create(newReport, function (error, _newReport) {
      if (error || !_newReport) {
        reject(error);
      } else {
        resolve(_newReport);
      }
    });
  });
}

module.exports.updateUserAnalytics = (report, user) => {
  return new Promise(async (resolve, reject) => {
    Log.findById(report.id, (error, report) => {
      if (error || !report) {
        reject(error)
      } else {
        User.findById(user, (error, foundUser) => {
          if (error || !foundUser) {
            return error;
          } else {
            foundUser.logEvents.push(report._id);
            foundUser.reports += 1;
            foundUser.save();
            return;
          }
        })
        resolve(report);
      }
    })
  })
}

module.exports.findAllReports = () => {
  return new Promise((resolve, reject) => {
    Log.find({}, (error, allReports) => {
      if (error || !allReports) {
        reject(error);
      } else {
        resolve(allReports);
      }
    });
  });
}

module.exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    Log.findById(id, (error, foundReport) => {
      if (error || !foundReport) {
        console.log("error in findById promise");
        reject(error || foundReport);
      } else {
        resolve(foundReport);
      }
    });
  });
}

// module.exports.updateReport = (report, id)=>{
//   return new Promise((resolve, reject)=>{
//     Log.updateOne({_id: id}, {$set: {}})
//   })
// }