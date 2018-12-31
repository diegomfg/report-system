const User                  = require("../models/User.js");
const Log                   = require('../models/Log.js');
const mongoose              = require("mongoose");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var eSession                = require("express-session");
var passportLocalMongoose   = require("passport-local-mongoose");

function createNewLog(newLog){
    return new Promise((resolve, reject)=>{
       Log.create(newLog, function(error, _newLog){
           
         if(error){
             
           reject(error);
           
         } else {
             
          resolve(_newLog);
          
         };
       });
    });
};

function findAllLogs(){
    return new Promise((resolve, reject)=>{
        Log.find({}, (error, allLogs)=>{
            if(error || !allLogs){
                reject(error);
            } else {
                resolve(allLogs);
            };
        });
    });
};

function findById(id){
    return new Promise((resolve, reject)=>{
        Log.findById(id, (error, foundLog)=>{
            if(error || !foundLog){
                console.log("error in findById promise")
                reject(error || foundLog);
            } else {
                resolve(foundLog);
            }
        })
    })
}

module.exports = { createNewLog, findAllLogs, findById };

