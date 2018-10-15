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


/******************** FORM TO SAVE A LOG *****************************/

router.get("/new", function(req, res){
    
  UserComponent.findAllUsers().then((allUsers)=>{
      // console.log(allUsers);
      res.render("newLog.ejs",{users: allUsers})
      
  }).catch((error)=>{
      console.log("error: ", error);
      res.render("newLog.ejs");
  })
  
});

/*************************************************/

/********************* SAVING A LOG - LOGIC ****************************/
                                                
// ADD middleware.isLoggedIn
router.post("/new", /*middleware.isLoggedIn,*/ function(req, res){
 
 User.findOne({_id: req.body.LogAuthor}, function(error, foundUser){
    
      var newLog = {
             title: req.body.LogTitle,
             body: req.body.LogBody,
             author: { id: foundUser._id, username: foundUser.username },
             area: req.body.LogArea
        }
     
        LogComponent.createNewLog(newLog).then((newLog)=>{
            console.log("Successfully created new log:", newLog);
            res.redirect("/logs/all");
        }).catch((error)=>{
            console.log("Error:",error.message);
            res.redirect("/");
        });

    }); 
    
});

router.get("/list", function(req, res){
    res.render("")
})

module.exports = router;