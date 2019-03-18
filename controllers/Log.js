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
    res.render("newLog.ejs", { users: allUsers, currentUser: req.user });
  } catch (error) {
    console.log("error: ", error);
    req.flash("error", "Something unexpected occurred");
    res.render("newLog.ejs");
  }
}

module.exports.createNewReport = async function (req, res) {

  try {

    var foundUser = await User.findOne({ _id: req.user._id });

    if (!foundUser) {

      req.flash("error", "Something unexpected happened");
      res.redirect("/");
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

      req.flash("success", "Successfully created new log");

      console.log("Successfully created new log:", newLog);

      res.redirect("/log/all");

    }
  } catch (error) {

    console.log("Error:", error.message);

    req.flash("error", error.message);

    res.redirect("/");

  }
}

module.exports.renderAllReports = async (req, res, next) => {
  try {
    const logs = await this.findAllReports();
    res.render("listLogs", { logs: logs });
  } catch (error) {
    req.flash("error", "Unable to fetch items");
    return next(error);
  }
}

module.exports.renderOneReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundLog = await this.findById(id);
    res.send(foundLog);
  } catch (e) {
    console.log("error");
    req.flash("error", "Database error");
    res.redirect("/error");
  }
}

module.exports.deleteReportById = async (req, res) => {
  const { id } = req.params;
  try {
    var deleted = await Log.deleteOne({ id: id });
    req.flash('success', 'report deleted successfully');
    console.log(deleted);
  } catch (error) {
    req.flash('error', 'some error occurred, unable to delete item');
  }
  res.redirect('/log/all');
}
