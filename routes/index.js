const server = require("express");
const UserController = require('../controllers/User');
const router = server.Router({ mergeparams: true });

router.get("/", (req, res) => {

  res.render("index", { title: "Welcome" });

});

router.get("/error", (req, res) => {
  res.send({ path: req.path });
});

router.get('/home', (req, res) => {
  res.render('home', { title: "Home" })
})

// renders the view for the login page
router.get('/login', (req, res) => {
  res.render("login");
})

// renders the view for the signup page
router.get('/register', (req, res) => {
  res.render('register');
})


/**
 * @description This is the API version of the routes.
 */

// api endpoint to handle login actions [DOESN'T WORK];
// router.get("/api/v1/user/login", UserController.handleLoginApi);

// api endpoint to handle user registration [WORKS];
// router.get("/api/v1/user/register", UserController.handleRegisterApi);

// api endpoint to create new reports [WORKS];
// router.post("api/v1/log/new", ReportController.createNewReportApi);

// returns all logs
// router.get("/api/v1/log/all", ReportController.renderAllReportsApi);

// returns one log, by id
// router.get("/api/v1/log/:id", ReportController.renderOneReportByIdApi);

// deletes one report by id
// router.post("api/v1/log/delete/:id", ReportController.deleteReportByIdApi);



module.exports = router;