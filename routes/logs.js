const server = require("express");
const router = server.Router({
  mergeparams: true
});
const ReportController = require("../controllers/Log.js")
// var middleware = require("../middleware/validation.js");



router.post("/new", ReportController.createNewReport);

router.get("/all-reports", ReportController.renderAllReports);

router.get("/:id", ReportController.renderOneReportById);

router.delete("/delete/:id", ReportController.deleteReportById);

module.exports = router;