const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.authenticate = async (username, password) => {
    return new Promise(async function (resolve, reject) {
        try {
            const user = await User.findOne({
                username: username
            });
            // match passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) reject('Authentication failed');
                if (isMatch) {
                    resolve(user);
                } else {
                    // passwords didn't match
                    reject('Authentication failed')
                }
            })
        } catch (error) {
            // username or password not found
            reject(error);
        }
    })
}