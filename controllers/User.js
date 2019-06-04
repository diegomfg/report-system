const User = require("../models/User.js");
const express_session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const UserUtils = require("../utils/user");
const authentication = require('../authentication/authenticate');
const config = require('../config');


module.exports.handleRegister = (req, res) => {

  const {
    username,
    password,
    option
  } = req.body;

  let newUser = {
    username: username,
    option: option
  }

  User.register(newUser, password).then(user => {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/user/dashboard")
    }
    )
  }).catch((error) => {
    console.log(error);
    res.redirect("/");
  })

}

module.exports.handleLogout = (req, res) => {
  req.logout();
  res.redirect("/");
}

module.exports.userProfile = async (req, res) => {

  res.render("profile", { title: "Profile" })

}

// look for user, with AJAX - Does NOT render view
module.exports.getUser = async (req, res) => {
  try {

    const user = await User.findOne({
      'username': req.params.username
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

// look for all users in database, with Ajax - Does NOT render view
module.exports.getAllUsers = async (req, res) => {

  try {
    let AllUsers = await User.find({});
    res.json({ users: AllUsers });
  } catch (error) {
    res.send({ error: error })
  }

}

// module.exports.handleRegisterApi = async (req, res) => {

//   console.log("new entry")

//   const {
//     username,
//     password,
//     option
//   } = req.body;

//   try {

//     var newUser = new User({
//       username: username,
//       role: option,
//       password: password
//     });

//     var AuthUser = await UserUtils.createNewUser(newUser);
//     const token = jwt.sign(JSON.stringify(AuthUser), config.SECRET_KEY);

//     console.log("User registered succesfully");

//     let response = {
//       success: true,
//       AuthUser,
//       token
//     }
//     res.send(response);

//   } catch (error) {
//     console.log("Error: ", error);
//     if (error.name === "UserExistsError") {
//       res.send({
//         success: false,
//         error: error.message
//       });
//     }
//   }
// }

// module.exports.handleLoginApi = async (req, res) => {
//   const {
//     username,
//     password
//   } = req.body;

//   console.log("attempting to log it [50 - UserController]")

//   try {

//     const AuthUser = await authentication.authenticate(username, password);
//     const token = jwt.sign(JSON.stringify(AuthUser), config.SECRET_KEY);

//     const {
//       iat,
//       exp
//     } = jwt.decode(token);

//     let data = {
//       success: true,
//       AuthUser,
//       token
//     }

//     console.log(data);

//     res.send(data)

//   } catch (error) {
//     console.log("[error UserController]");
//     console.log(error);
//     res.send({
//       success: false,
//       error: error.message
//     });
//   }
// }

// module.exports.getUserApi = async function (req, res) {
//   try {
//     console.log(req.params);
//     const user = await User.findOne({
//       'username': req.params.username
//     });
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// }

// module.exports.getAllUsersApi = async function (req, res) {

//   try {
//     let AllUsers = await User.find({});
//     res.send({ users: AllUsers })
//   } catch (error) {
//     res.send({ error: error })
//   }
