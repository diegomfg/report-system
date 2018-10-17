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
              
              res.redirect("/user/all");
        });
    })
    .catch(error => {
      console.log("Error: ", error);
      if(error.name === 'UserExistsError'){
        console.log("Error trying to create a user");
      }
      res.redirect("/");
    });
});


                                                        /********************LOGIN POST*****************/
router.post("/login", passport.authenticate("local", {
    successRedirect: "/user/all",
    failureRedirect: "/"
}), (req, res)=>{console.log("asdasd")});


                                                  /*********************** LISTING USERS **************************/

router.get("/all", /*middleware.isLoggenIn,*/(req, res) => {
  
  console.log("Current user:", req.user);
            
      UserComponent.findAllUsers().then((_users) => {
            
            res.render("listUsers", {users: _users});
              
          }).catch((error)=>{
              
        console.log("error, could not fetch users");
        res.redirect("/");
              
    });
});

/**********************dashboard***************************/

router.get("/dashboard", /*middleware.isLoggenIn,*/(req, res)=>{
  res.render("dashboard.ejs", {currentUser: req.user});
});


module.exports = router;