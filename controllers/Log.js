const MongoObjectId = require('mongodb').ObjectID;
const Log = require("../models/Log.js");
const User = require('../models/User');
const UserController = require('./User');
const LogUtils = require("../utils/log");

/**
 * @author Diego A. Matheus
 * @description MVC Routes
 */

module.exports.create = async (req, res) => {

  /**
   * @description This should be {title, body, area, author} 
   * @description Where "author" is the current user stored in the session in the Main.jsx component
   */

  const { title, body, area } = req.body;

  const newReport = {
    title: title,
    body: body,
    author: req.user,
    area: area
  };

  try {

    const newLog = await LogUtils.createNewReport(newReport);
    LogUtils.updateUserAnalytics(newLog, req.user);
    console.log("New report successfully saved")
    res.redirect('/log/all');

  } catch (error) {

    console.log(error);
    res.send({ error: error.message });

  }
}

module.exports.all = async (req, res, next) => {
  try {
    const reports = await LogUtils.findAllReports();
    res.render("reports", { reports: reports, title: "Reports" })
  } catch (error) {
    res.redirect("/", { error: "Server error" });
  }
}

module.exports.get = async (req, res) => {
  const { id } = req.params;

  try {
    const foundReport = await LogUtils.findById(id);
    res.render("onereport", { report: foundReport, title: "Rendering one report by id" });
  } catch (e) {
    console.log(e.message);
    res.send({ error: e.message });
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Log.deleteOne({ _id: MongoObjectId(id) });
    res.redirect("/log/all");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports.edit = async (req, res) => {
  const { id } = req.params;

  try {

    const report = await LogUtils.findById(id);
    console.log("Found this: ", report)
    res.render("edit", { title: "Edit Report", report: report });

  } catch (error) {

    console.log(error);

    res.redirect('/log/all');

  }

}


module.exports.editReport = async (req, res) => {
  const { id } = req.params;

  const { title, body, area } = req.body;

  const reportToUpdate = {
    title: title,
    body: body,
    area: area
  };

  try {
    const updated = LogUtils.updateReport(reportToUpdate);
    res.redirect('/log/all');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
}
// module.exports.createNewReportApi = async (req, res) => {

//   console.log(req.body);

//   /**
//    * @description This should be {title, body, area, author} 
//    * @description Where "author" is the current user stored in the session in the Main.jsx component
//    */

//   const { title, body, area } = req.body;

//   var newReport = {
//     title: title,
//     body: body,
//     // author goes here. Find the current user and populate him with the new report
//     area: area
//   };

//   try {

//     var newLog = await LogUtils.createNewReport(newReport);
//     // foundUser.logEvents.push(newLog._id);
//     // foundUser.save();
//     console.log("New report successfully saved")
//     res.sendStatus(200);

//   } catch (error) {

//     console.log("Error:", error.message);
//     res.send({ error: error.message });

//   }
// }

// module.exports.renderAllReportsApi = async (req, res, next) => {
//   try {
//     const logs = await LogUtils.findAllReports();
//     res.send({ logs: logs });
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// }

// module.exports.renderOneReportByIdApi = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const foundLog = await LogUtils.findById(id);
//     res.send(foundLog);
//   } catch (e) {
//     console.log("error");
//     res.send({ error: error.message });
//   }
// }

// module.exports.deleteReportByIdApi = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Log.deleteOne({ id: id });
//     res.sendStatus(200)
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// }

