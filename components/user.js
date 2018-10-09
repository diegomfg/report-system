const User                  = require("../models/User.js");
const mongoose              = require("mongoose");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");

var createNewUser = (newUser, _password) => {
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
  

var findAllUsers = () => {
  return new Promise((resolve, reject)=>{
    User.find({}, (error, _users)=>{
      if(error){
        reject(error);
      } else {
        resolve(_users);
      };
    });
  });
};

module.exports = { createNewUser, findAllUsers };
