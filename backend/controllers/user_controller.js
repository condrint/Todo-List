const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/user');
const userController = {};

userController.registerUser = (req, res) => {
  const { username, password } = req.body;
  const emptyTodo = [];
  const newUser = new User({
      username: username,
      password: password,
      list: emptyTodo
  });

  User.registerUser(newUser, (error, result) => {
      if (error) {
        if (error) {
          return res.status(500).json({
            message: error.errmsg
            });
        }
      }
      else {
        return res.status(200).json({
          message: 'register success?',
          user: result.username,
          
        });
      }
  });
};


// Login authentication
userController.loginUser = (req, res) => {
  User.findOne ({username: req.body.username}, function(err, user) {
    if (!user){
      return res.status(500).json({
        message: 'User not found'
      });
    }
    if (user.password == req.body.password){
      return res.status(200).json({
        success: true,
        message: 'password matches a user',
        user: user.username,
        todos: user.list
      });
    }
    else {
      return res.status(500).json({
        message: 'incorrect password'
      });
    }
  });
}

userController.updateTodo = (req, res) => {
  User.findOneAndUpdate({username: req.body.owner}, {list: req.body.newItems}, function(err, todo) {
    if(err){
      return res.status(500, { error: err });
    }
    return res.status(200).json({
      success: true
    });
  });
}

module.exports = userController;