const server = require("express");
const router = server.Router({mergeparams: true});
const User = require("../models/User.js");
const Log = require("../models/Log.js");
const UserComponent = require("../components/user.js");
const LogComponent = require("../components/log.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");
var middleware = require("../middleware/validation.js");

/********************* REGISTERING A USER ****************************/
  
router.post("/register", function(req, res) {
  
  var _username = req.body.username;
  var _password = req.body.password;
  var _role = req.body.option;

  var newUser = new User({
    username: _username,
    role: _role
  });

  UserComponent.createNewUser(newUser, _password)
    .then(newUser => {
      console.log("User registered succesfully");
      passport.authenticate("local")(req, res, function(){
              
              req.flash("success", "Succesfully created new user");
              res.redirect("/user/all");
        });
    })
    .catch(error => {
      console.log("Error: ", error);
      if(error.name === 'UserExistsError'){
        
        req.flash("error", "There's an existing user with that username");
        console.log("Error trying to create a user");
        
      }
      res.redirect("/");
    });
});


                                                        /********************LOGIN POST*****************/
router.post("/login", passport.authenticate("local", {
    successRedirect: "/user/all",
    failureRedirect: "/"
}), (req, res)=>{});


                                                  /*********************** LISTING USERS **************************/

router.get("/all", middleware.isLoggedIn, function(req, res){
  
  console.log("Current user:", req.user);
            
      UserComponent.findAllUsers().then((_users) => {
            
            res.render("listUsers", {users: _users,currentUser: req.user});
              
          }).catch((error)=>{
              
        console.log("error, could not fetch users");
        res.redirect("/");
              
    });
});

/**********************dashboard***************************/

router.get("/dashboard", (req, res)=>{
  
  res.render("dashboard.ejs", {currentUser: req.user});
  
});

router.get("/logout", function(req, res){

    req.logout();
    console.log("Success: Succesfully logged out");
    res.redirect("/user/dashboard");
    
});


module.exports = router;