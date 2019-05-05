const Log = require("../models/Log.js");
const UserController = require('./User');
const LogUtils = require("../utils/log");

module.exports.createNewReport = async (req, res) => {

  console.log(req.body);

  const { title, body, area } = req.body;

  var newReport = {
    title: title,
    body: body,
    // author goes here. Find the current user and populate him with the new report
    area: area
  };

  try {

    var newLog = await LogUtils.createNewReport(newReport);
    // foundUser.logEvents.push(newLog._id);
    // foundUser.save();
    console.log("New report successfully saved")
    res.sendStatus(200);

  } catch (error) {

    console.log("Error:", error.message);
    res.send({ error: error.message });

  }
}

module.exports.renderAllReports = async (req, res, next) => {
  try {
    const logs = await LogUtils.findAllReports();
    res.send({ logs: logs });
  } catch (error) {
    res.send({ error: error.message });
  }
}

module.exports.renderOneReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundLog = await LogUtils.findById(id);
    res.send(foundLog);
  } catch (e) {
    console.log("error");
    res.send({ error: error.message });
  }
}

module.exports.deleteReportById = async (req, res) => {
  const { id } = req.params;
  try {
    await Log.deleteOne({ id: id });
    res.sendStatus(200)
  } catch (error) {
    res.send({ error: error.message });
  }
}
