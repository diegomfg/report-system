
module.exports.isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    }

    req.flash("error", "Unable to verify session, please log in and try again");
    res.redirect("/error");
     
};
