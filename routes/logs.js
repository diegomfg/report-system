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


/******************** ROUTE TO SAVE A LOG *****************************/

router.get("/new", middleware.isLoggedIn, function(req, res){
    
  UserComponent.findAllUsers().then((allUsers)=>{
      
      res.render("newLog.ejs",{users: allUsers, currentUser: req.user})
      
  }).catch((error)=>{
      
      console.log("error: ", error);
      req.flash("error", "Something unexpected occurred");
      res.render("newLog.ejs");
      
  });
  
});

/********************* SAVING A LOG - LOGIC ****************************/
                                                
router.post("/new", middleware.isLoggedIn, function(req, res){
 
 User.findOne({_id: req.user._id}, function(error, foundUser){
    
    
        if(error || !foundUser){ // !null is true
            
            req.flash("error", "Something unexpected happenen");
            res.redirect("/");
            console.log(`Either an error or !foundUser:\nError:${error}\nFoundUser:${foundUser}`);
            
        } else if(foundUser){
            // create a new log object
            const {LogTitle, LogBody, username, LogArea} = req.body;
            
          var newLog = {
                 title: LogTitle,
                 body: LogBody,
                 author: { id: foundUser._id, username: foundUser.username },
                 area: LogArea
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
        }

    }); 
    
});

router.get("/all", middleware.isLoggedIn,async (req, res, next) => {
    
    try{
        const logs = await LogComponent.findAllLogs();
        res.render("listLogs", {logs: logs});
        
    }catch(error){
        
        req.flash("error", "Unable to fetch items");
        return next(error);
        
    }
 });

router.get("/:id", middleware.isLoggedIn, async(req,  res)=>{
    
    const { id } = req.params;
    
    try{
        
        const foundLog = await LogComponent.findById(id);    
        // res.render("renderLog", {log: foundLog});
        res.send(foundLog);
        
    }catch(e){
        console.log('error');
        req.flash("error", "Database error");
        res.redirect("/error");
            
    }
    
})

module.exports = router;