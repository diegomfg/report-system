const User = require("../models/User.js");
const bcrypt = require("bcryptjs");


module.exports.createNewUser = (newUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => { // generating the salt
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        /**
         * @param hash is the hashed password that is reassigned to the user.
         */
        newUser.password = hash;
        try {
          const newRegisteredUser = await newUser.save();
          console.log(newRegisteredUser);
          /**
           * @argument returning the succes or error to the user controller
           */
          resolve(newRegisteredUser);
        } catch (error) {
          reject(error);
        }
      });
    })
  });
};

module.exports.findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (error, users) => {
      // if error or users is null
      if (error || !users) {
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
      role: option,
      password: password
    });

    var savedUser = await this.createNewUser(newUser);

    console.log("User registered succesfully");
    res.send(savedUser);

  } catch (error) {
    console.log("Error: ", error);
    if (error.name === "UserExistsError") {
      res.send({ message: error.message });
    }
  }
}

module.exports.renderAllUsers = async (req, res, next) => {
  try {
    const AllUsers = await this.findAllUsers();
    res.send({ users: AllUsers });
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
}

module.exports.renderDashboard = async (req, res, next) => {
  res.send({ currentUser: req.user });
  next();
}

module.exports.handleLogout = function (req, res) {
  // logout
  res.send("Logged out")
  res.redirect("/");
}
