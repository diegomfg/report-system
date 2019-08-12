const server = require("express");
const router = server.Router({
  mergeparams: true
});
const authentication = require('../authentication/authenticate');
const ReportController = require("../controllers/Log.js")

router.post("/new", authentication.isLoggedIn, ReportController.create);

router.get("/all", authentication.isLoggedIn, ReportController.all);

router.get("/:id", authentication.isLoggedIn, ReportController.get);

router.get("/delete/:id", authentication.isLoggedIn, ReportController.delete);

router.get("/edit/:id", authentication.isLoggedIn, ReportController.edit);

router.post("/edit/:id", authentication.isLoggedIn, ReportController.editReport);

module.exports = router;