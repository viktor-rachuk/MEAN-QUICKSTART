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

module.exports = mongoose.model("User", UserSchema);