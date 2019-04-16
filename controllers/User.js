const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const UserUtils = require("../utils/user");
const authentication = require('../authentication/authenticate');
const config = require('../config');

module.exports.handleRegister = async (req, res) => {

  const {
    username,
    password,
    option
  } = req.body;

  try {

    var newUser = new User({
      username: username,
      role: option,
      password: password
    });

    var savedUser = await UserUtils.createNewUser(newUser);

    console.log("User registered succesfully");
    res.send(savedUser);

  } catch (error) {
    console.log("Error: ", error);
    if (error.name === "UserExistsError") {
      res.send({
        message: error.message
      });
    }
  }
}

module.exports.handleLogin = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {

    const AuthUser = await authentication.authenticate(username, password);
    const token = jwt.sign(JSON.stringify(AuthUser), config.SECRET_KEY);

    const {
      iat,
      exp
    } = jwt.decode(token);

    res.send({
      AuthUser,
      token
    })

  } catch (error) {
    console.log("[error UserController]");
    console.log(error);
    res.send(error);
  }
}

module.exports.handleLogout = function (req, res) {
  // logout
  res.send({
    message: "Logged out"
  })
}

module.exports.getUser = async function (req, res) {
  try {
    console.log(req.params);
    const user = await User.findOne({
      'username': req.params.username
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}