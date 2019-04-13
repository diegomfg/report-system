const Log = require("../models/Log.js");
const UserController  = require('./User');
const LogUtils = require("../utils/log");

// ControllerActions

module.exports.newReportRoute = async (req, res) => {
  try {
    // res.send({currentUser: req.user });
    res.send({message: "New log route"})
  } catch (error) {
    console.log("error: ", error);
    res.send({message: error.message})
  }
}

module.exports.createNewReport = async function (req, res) {

  try {

      const { r_title, r_body, r_area } = req.body;

      var newReport = {
        title: r_title,
        body: r_body,
        // author goes here. Find the current user and populate him with the new report
        area: r_area
      };

      var newLog = await LogUtils.createNewReport(newReport);
      // foundUser.logEvents.push(newLog._id);
      // foundUser.save();
      console.log("New report successfully saved")
      res.send(newLog);

    } catch (error) {

    console.log("Error:", error.message);

    res.send({message: error.message});

  }
}

module.exports.renderAllReports = async (req, res, next) => {
  try {
    const logs = await LogUtils.findAllReports();
    res.send({logs: logs });
  } catch (error) {
    res.send({message: error.message});
  }
}

module.exports.renderOneReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundLog = await LogUtils.findById(id);
    res.send(foundLog);
  } catch (e) {
    console.log("error");
    res.send({message: error.message});
  }
}

module.exports.deleteReportById = async (req, res) => {
  const { id } = req.params;
  try {
    // var deleted = await Log.deleteOne({ id: id });
    // console.log(deleted);
    // res.send(deleted);
    res.send(`deleting report with id: ${req.params.id}`)
  } catch (error) {
    res.send({message: error.message});
  }
}
