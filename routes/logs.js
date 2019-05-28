const server = require("express");
const router = server.Router({
  mergeparams: true
});
const authentication = require('../authentication/authenticate');
const ReportController = require("../controllers/Log.js")
// var middleware = require("../middleware/validation.js");



router.post("/new", authentication.isLoggedIn, ReportController.createNewReport);

router.get("/all", authentication.isLoggedIn, ReportController.renderAllReports);

router.get("/:id", authentication.isLoggedIn, ReportController.renderOneReportById);

router.get("/delete/:id", authentication.isLoggedIn, ReportController.deleteReportById);

module.exports = router;