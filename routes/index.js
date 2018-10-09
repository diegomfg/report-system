const server = require("express");
const router = server.Router();
const User = require("../models/User.js");
const Log = require("../models/Log.js");
const UComponent = require("../components/user.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");

                                                      /******************** BEGIN ROUTES *****************************/

router.get("/", (req, res) => {
  
  res.render("index.ejs");
  
});

                                                /********************* REGISTERING A USER ****************************/
                                                
router.post("/register", function(req, res) {
  
  var _username = req.body.username;
  var _password = req.body.password;
  var _role = req.body.option;

  var newUser = new User({
    username: _username,
    role: _role
  });

  UComponent.createNewUser(newUser, _password)
    .then(success => {
      console.log("User registered succesfully");
      // req.flash("success", "Success");
      // console.log("Success: ", success);
      res.redirect("/dashboard");
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
                                                  
        succesRedirect: "/dashboard.ejs",
        failureRedirect: "/"
                                                  
}),function(req,res){});

                                                  /*********************** LISTING USERS **************************/

router.get("/list", /*middleware.isLoggenIn,*/(req, res) => {
            
    console.log("Redirecting to /lists");
            
      UComponent.findAllUsers().then((_users) => {
              
            console.log("Found users");
            res.render("lists", {users: _users});
              
          }).catch((error)=>{
              
        console.log("error, could not fetch users");
        res.redirect("/");
              
    });
});

                                                  /******************** FORM TO SAVE A LOG *****************************/

router.get("/newLog", function(req, res){
    
  UComponent.findAllUsers().then((allUsers)=>{
      // console.log(allUsers);
      res.render("population.ejs",{users: allUsers})
      
  }).catch((error)=>{
      console.log("error: ", error);
      res.render("population.ejs");
  })
  
});

/*************************************************/


                                              /********************* SAVING A LOG - LOGIC ****************************/
                                                
                                                // ADD middleware.isLoggedIn
router.post("/newLog", function(req, res){
 
 User.findOne({name: req.body.LogAuthor}, function(error, foundUser){
   
   var newLog = {
     title: req.body.LogTitle,
     body: req.body.LogBody,
     author: { id: foundUser._id, username: foundUser.name },
     area: req.body.LogArea
 }
 
   Log.create(newLog, function(error, _newLog){
     
     if(error){
       
       console.log("Failure");
       console.log(error);
       res.redirect("/");
       
     } else {
      
      console.log("Success:");
      console.log(_newLog); 
       res.send(_newLog);
     }
     
   });
   
 });
 
});
                                                
/**********************dashboard***************************/

router.get("/dashboard", /*middleware.isLoggenIn,*/(req, res)=>{
  res.render("dashboard.ejs");
});

/********************************************************/

router.get("/*", function(req, res){
  res.render("404.ejs");
});


module.exports = router;