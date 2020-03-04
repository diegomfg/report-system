const User = require("../models/User.js");
const passport = require("passport");

module.exports.handleRegister = async (req, res) => {
  const { username, password, role } = req.body;

  let newUser = {
    username: username,
    role: role
  };

  console.log("About to register new user: ", newUser);

  try {
    await User.register(newUser, password);
    passport.authenticate("local")(req, res, function() {
      res.redirect("/user/dashboard");
    });
  } catch (error) {
    console.log(error.message);
    res.render("register", { error: error.message }).sendStatus(500);
  }
};

module.exports.handleLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports.userProfile = (req, res) => {
  res.render("profile", { title: "Profile" });
};

/**
 * @abstract
 * 
 * Returns a user after querying in database. API specific only.
 */
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    }).populate("logEvents").exec();
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

// look for all users in database, with Ajax - Does NOT render view
module.exports.getAllUsers = async (req, res) => {
  try {
    let AllUsers = await User.find();
    res.json({ users: AllUsers });
  } catch (error) {
    res.send({ error: error });
  }
};
