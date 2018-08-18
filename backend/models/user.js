'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    list: Array
});

const User = mongoose.model('User', userSchema);
User.registerUser = (newUser, callback) => {
    newUser.save(callback);
};

module.exports = User;