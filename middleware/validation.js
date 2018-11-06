var User = require("../models/User.js");
var Log  = require("../models/Log.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");
// var flash = require("connect-flash");

var isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    }

    req.flash("error", "Unable to verify session, please log in and try again");
    res.redirect("/error");
     
};

module.exports = {
    isLoggedIn: isLoggedIn
};