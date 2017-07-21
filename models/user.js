const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: [
    first: '',
    last: ''
  ],
  email: {
    type: String,
    unique: true,
    required: true
  },
  photo: String,
  accounttype: String,
  status: Boolean,
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = function(user, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return res.json({
        success: false,
        msg: 'Something went wrong!!'
      });

        user.password = hash;
        user.save(callback);
    });
  });
};