
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){

        return next();

    }

    console.log("Attempt to access protected routes. Middleware in action");
    res.redirect("/");
}

