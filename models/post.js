const mongoose = require("mongoose");
const config = require("../config/database");

// Post Schema
const PostSchema = mongoose.Schema({
  content: {
    type: String,
    unique: true,
    required: true
  },  
  photo: String,
  status: Boolean,
  created_at: { type: Date, default: Date.now }
});

const Post = (module.exports = mongoose.model("Post", PostSchema));

module.exports.createPost = function(post, callback) {
  post.save();
};