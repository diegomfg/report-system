const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const UserUtils = require("../utils/user");
const authentication = require('../authentication/authenticate');
const config = require('../config');

module.exports.handleRegister = async (req, res) => {

  const { username, password, option } = req.body;

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
      res.send({ message: error.message });
    }
  }
}

module.exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    // authenticating user
    const AuthUser = await authentication.authenticate(username, password);
    console.log('[auth ok]')
    // create authorized token
    console.log('[before token]')
    const token = jwt.sign(AuthUser.toJSON(), config.SECRET_KEY, { expiresIn: "20m" })
    console.log("[after token]: " + token);
    const { iat, exp } = jwt.decode(token);
    res.send('all good');

  } catch (error) {
    console.log("[error UserController]");
    res.send(error);
  }
}

module.exports.handleLogout = function (req, res) {
  // logout
  res.send({ message: "Logged out" })
}
