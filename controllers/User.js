const User                  = require("../models/User.js");
const passport                = require("passport");

module.exports.createNewUser = (newUser, _password) => {
  return new Promise((resolve, reject) => {
    
    User.register(newUser, _password, (error, _newUser) => {
      if (error) {
        reject(error);
      } else {
        resolve(_newUser);
      }
    });
  });
};

module.exports.findAllUsers = () => {
  return new Promise((resolve, reject)=>{
    User.find({}, (error, users)=>{
      if(error || !users){
        reject(error);
      } else {
        resolve(users);
      };
    });
  });
};

module.exports.handleRegister = async (req, res) => {
  const { username, password, option } = req.body;

  try {
    var newUser = new User({
      username: username,
      role: option
    });

    var newUser = await this.createNewUser(newUser, password);

    console.log("User registered succesfully");

    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Successfully created new user");
      res.redirect("/user/all");
    });
  } catch (error) {
    console.log("Error: ", error);
    if (error.name === "UserExistsError") {
      req.flash("error", "Username is not available");
      console.log("Error trying to create a user");
    }
    res.redirect("/");
  }
}

module.exports.renderAllUsers = async (req, res, next) => {
  try {
    const AllUsers = await this.findAllUsers();
    res.render("listUsers", { users: AllUsers });
    next();
  } catch (error) {
    console.log("Error: ", error);
    req.flash("error", "Unable to fetch data");
    res.redirect("/");
  }
}

module.exports.renderDashboard = async (req, res, next) => {
  res.render("dashboard.ejs", { currentUser: req.user });
  next();
}

module.exports.handleLogout = function (req, res) {
  req.logout();
  req.flash("success", "Succesfully logged out");
  res.redirect("/");
}
