const server = require("express");
const router = server.Router();
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
    .then(success => {
      console.log("User registered succesfully");
      
      res.redirect("/user/all");
    })
    .catch(error => {
      console.log("Error: ", error);
      // if(error.name === 'UserExistsError'){
      //   req.flash("error", error.message);
      // }
      res.redirect("/");
    });
});


                                                        /********************LOGIN POST*****************/
router.post("/login", passport.authenticate("local", {
                                                  
        // succesRedirect: "/dashboard.ejs",
        succesRedirect: "/user/all",
        failureRedirect: "/"
                                                  
}),function(req,res){console.log("Success")});


                                                  /*********************** LISTING USERS **************************/

router.get("/all", /*middleware.isLoggenIn,*/(req, res) => {
            
    console.log("Redirecting to /user/all");
            
      UserComponent.findAllUsers().then((_users) => {
              
            console.log("Found users");
            res.render("listUsers", {users: _users});
              
          }).catch((error)=>{
              
        console.log("error, could not fetch users");
        res.redirect("/");
              
    });
});

/**********************dashboard***************************/

router.get("/dashboard", /*middleware.isLoggenIn,*/(req, res)=>{
  res.render("dashboard.ejs");
});


module.exports = router;