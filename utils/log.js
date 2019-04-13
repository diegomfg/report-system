const Log = require("../models/Log.js");
const UserController  = require('../controllers/User');

module.exports.createNewReport = (newReport) =>{
  return new Promise((resolve, reject) => {
    Log.create(newReport, function(error, _newReport) {
      if (error || !_newReport) {
        reject(error);
      } else {
        resolve(_newReport);
      }
    });
  });
}

module.exports.findAllReports = ()=>{
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

module.exports.findById = (id) =>{
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