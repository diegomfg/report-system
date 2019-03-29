const server = require("express");
const router = server.Router({ mergeparams: true });
const UserController = require("../controllers/User.js");
// var middleware = require("../middleware/validation.js");

// handleRegister
router.post("/register", UserController.handleRegister);

// list all users
router.get("/all", UserController.renderAllUsers);

// render the dashboard
router.get("/dashboard", UserController.renderDashboard);

// handleLogout
router.get("/logout", UserController.handleLogout);

module.exports = router;
