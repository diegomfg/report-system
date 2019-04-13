const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.authenticate = (username, password)=>{
    return new Promise(async function(reject, resolve){
        try {
            const user = await User.findOne({username: username});
            // match passwords
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) reject('Authentication failed [err]');
                if(isMatch){
                    resolve(user);
                } else {
                    // passwords didn't match
                    reject('Authentication failed [!isMatch]')
                }
            })
        } catch (error) {
            // username or password not found
            reject('Authentication failed [catch(error)]');
        }
    })
}