const server = require("express");
const router = server.Router({ mergeparams: true });
const ReportController = require("../controllers/Log.js");
var middleware = require("../middleware/validation.js");

router.get("/new", middleware.isLoggedIn, ReportController.newReportRoute);

router.post("/new", middleware.isLoggedIn, ReportController.createNewReport);

router.get("/all", middleware.isLoggedIn, ReportController.renderAllReports);

router.get("/:id", middleware.isLoggedIn, ReportController.renderOneReportById);

router.delete("/delete/:id", middleware.isLoggedIn, ReportController.deleteReportById);

module.exports = router;
