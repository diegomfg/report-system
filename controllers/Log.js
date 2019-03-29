const Log = require("../models/Log.js");
const UserController  = require('./User');

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

// ControllerActions

module.exports.newReportRoute = async (req, res) => {
  try {
    var allUsers = await UserController.findAllUsers();
    res.send({ users: allUsers, currentUser: req.user });
  } catch (error) {
    console.log("error: ", error);
    res.send({message: error.message})
  }
}

module.exports.createNewReport = async function (req, res) {

  try {

    var foundUser = await User.findOne({ _id: req.body.id });
    console.log(req.body)
    if (!foundUser) {

      res.send({message: error.message});
      console.log(
          `Either an error or !foundUser:\nError:${error}\nFoundUser:${foundUser}`
      );

    } else if (foundUser) {

      // create a new log object
      const { LogTitle, LogBody, LogArea } = req.body;

      var newLog = {

        title: LogTitle,

        body: LogBody,

        author: { id: foundUser._id, username: foundUser.username },

        area: LogArea

      };

      var newLog = this.createNewReport(newLog);

      foundUser.logEvents.push(newLog._id);

      foundUser.save();

      res.send(newLog);

    }
  } catch (error) {

    console.log("Error:", error.message);

    res.send({message: error.message});

  }
}

module.exports.renderAllReports = async (req, res, next) => {
  try {
    const logs = await this.findAllReports();
    res.send({logs: logs });
  } catch (error) {
    req.flash("error", "Unable to fetch items");
    res.send({message: error.message});
  }
}

module.exports.renderOneReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundLog = await this.findById(id);
    res.send(foundLog);
  } catch (e) {
    console.log("error");
    res.send({message: error.message});
  }
}

module.exports.deleteReportById = async (req, res) => {
  const { id } = req.params;
  try {
    var deleted = await Log.deleteOne({ id: id });
    console.log(deleted);
    res.send(deleted);
  } catch (error) {
    res.send({message: error.message});
  }
}
