const User                  = require("../models/User.js");
const mongoose              = require("mongoose");
const passport                = require("passport");
const LocalStrategy           = require("passport-local");
const eSession                = require("express-session");
const passportLocalMongoose   = require("passport-local-mongoose");

const createNewUser = (newUser, _password) => {
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

const findAllUsers = () => {
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

module.exports = { createNewUser, findAllUsers };
