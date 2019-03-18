const server = require("express");
const router = server.Router({ mergeparams: true });
const UserController = require("../controllers/User.js");
var passport = require("passport");
var middleware = require("../middleware/validation.js");

// handleRegister
router.post("/register", UserController.handleRegister);

// login handler. Passport takes care of this
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user/all",
    failureRedirect: "/"
  }),
  (req, res) => { }
);

// list all users
router.get("/all", middleware.isLoggedIn, UserController.renderAllUsers);

// render the dashboard
router.get("/dashboard", middleware.isLoggedIn, UserController.renderDashboard);

// handleLogout
router.get("/logout", UserController.handleLogout);

module.exports = router;
