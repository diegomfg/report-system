const server = require("express");
const passport = require('passport');
const router = server.Router({
  mergeparams: true
});
const UserController = require("../controllers/User.js");
// var middleware = require("../authentication/authenticate.js");

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" })
})

router.get("/profile", (req, res) => {
  res.render("profile", { title: "Profile" })
})

// handleRegister
router.post("/register", UserController.handleRegister);

//login route
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/user/dashboard');
  });


// handleLogout
router.post("/logout", UserController.handleLogout);











// get user - For development purposes
router.get('/profile/:username', UserController.getUser);

// get all users. For development purposes
router.get('/all', UserController.getAllUsers);

module.exports = router;