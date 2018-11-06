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


/******************** FORM TO SAVE A LOG *****************************/

router.get("/new", middleware.isLoggedIn, function(req, res){
  UserComponent.findAllUsers().then((allUsers)=>{
      
      res.render("newLog.ejs",{users: allUsers, currentUser: req.user})
      
  }).catch((error)=>{
      console.log("error: ", error);
      res.render("newLog.ejs");
  })
  
});

/********************* SAVING A LOG - LOGIC ****************************/
                                                
router.post("/new", middleware.isLoggedIn, function(req, res){
 
 User.findOne({_id: req.body.LogAuthor}, function(error, foundUser){
    
    // create a new log object
      var newLog = {
             title: req.body.LogTitle,
             body: req.body.LogBody,
             author: { id: foundUser._id, username: foundUser.username },
             area: req.body.LogArea
        }
     
     
     
    //  call the log component to create new log
     
        LogComponent.createNewLog(newLog).then((newLog)=>{
            
            
            // pushing the new log's id to new current user
            foundUser.logEvents.push(newLog._id);
            foundUser.save();
            req.flash("success", "Successfully created new log");
            console.log("Successfully created new log:", newLog);
            
        
        }).catch((error)=>{
            
            
            
            console.log("Error:",error.message);
            res.redirect("/");
            
            
        });
        
        res.redirect("/user/dashboard");

    }); 
    
});

router.get("/all", function(req, res){
    res.render("listLogs.ejs");
});


module.exports = router;