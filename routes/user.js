const server = require("express");
const router = server.Router({mergeparams: true});
const User = require("../models/User.js");
const Log = require("../models/Log.js");
const UserComponent = require("../controllers/user.js");
const LogComponent = require("../controllers/log.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");
var middleware = require("../middleware/validation.js");

/********************* REGISTERING A USER ****************************/
  
router.post("/register", function(req, res) {
  
  const {username, password, option} = req.body;
  
  var _username = username;
  var _password = password;
  var _role = option;

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

router.get("/all", middleware.isLoggedIn, async (req, res, next)=>{
            
      try{
        
        const AllUsers = await UserComponent.findAllUsers();
        res.render("listUsers", {users:AllUsers});
        
        
      }catch(error){
        
          console.log("Error: ", error);
          req.flash("error", "Unable to fetch data");
          res.redirect("/");
      }
      
});

/**********************dashboard***************************/

router.get("/dashboard", middleware.isLoggedIn, async (req, res, next)=>{
  
  res.render("dashboard.ejs", {currentUser: req.user});
  
});

router.get("/logout", function(req, res){

    req.logout();
    req.flash("success", "Succesfully logged out");
    res.redirect("/");
    
});

module.exports = router;