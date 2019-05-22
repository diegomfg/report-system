const server = require("express");
const passport = require('passport');
const router = server.Router({
  mergeparams: true
});
const authentication = require('../authentication/authenticate');
const UserController = require("../controllers/User.js");

router.get("/dashboard", authentication.isLoggedIn,(req, res) => {
  res.render("dashboard", { title: "Dashboard" })
})

router.get("/profile", authentication.isLoggedIn,UserController.userProfile);

// handleRegister
router.post("/register", UserController.handleRegister);

//login route
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    console.log(`ROUTES - USER.JS - JUST LOGGED IN: ${req.user.username}`);
    res.locals.currentUser = req.user;
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/user/dashboard');
  });

// handleLogout
router.get("/logout", UserController.handleLogout);


// get user - For development purposes
router.get('/profile/:username', authentication.isLoggedIn,UserController.getUser);

// get all users. For development purposes
router.get('/all', authentication.isLoggedIn,UserController.getAllUsers);

module.exports = router;