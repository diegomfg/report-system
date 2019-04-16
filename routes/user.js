const server = require("express");
const router = server.Router({
  mergeparams: true
});
const UserController = require("../controllers/User.js");
// var middleware = require("../authentication/authenticate.js");

// handleRegister
router.post("/register", UserController.handleRegister);

//
router.post("/login", UserController.handleLogin);

// handleLogout
router.get("/logout", UserController.handleLogout);

// get user - For Dev
router.get('/:username', UserController.getUser);

module.exports = router;