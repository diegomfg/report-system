const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authentication = require('../authentication/authenticate');

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

