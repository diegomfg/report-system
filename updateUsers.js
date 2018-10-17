const User = require('./models/User.js');
const mongoose = require('mongoose');

function updateUsers(){
  User.find({}, function(error, allUsers){
    allUsers.forEach((user)=>{
      if(user.role !== "admin"){
        user.role = "junior";
        user.save();
      }
    });
  });
  
  console.log("All users were updated");
}

module.exports = updateUsers;