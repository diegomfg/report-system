const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authentication = require('../authentication/authenticate');

module.exports.createNewUser = (newUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt)=>{ // generating the salt
      bcrypt.hash(newUser.password, salt, async (error, hash)=>{
        // assigning the salt to the user
        newUser.password = hash;
        try {
          // saving the user
          const newRegisteredUser = await newUser.save();
          // Resolving the user. Basically returning to the controller action
          resolve(newRegisteredUser);
        } catch (error) {
          reject(error);
        }
      });
    })
  });
};

module.exports.findAllUsers = () => {
  return new Promise((resolve, reject)=>{
    User.find({}, (error, users)=>{
      // if error or users is null
      if(error || !users){
        reject(error);
      } else {
        resolve(users);
      };
    });
  });
};

