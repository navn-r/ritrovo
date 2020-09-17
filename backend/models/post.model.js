const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
  },
  author: {
    type: String,
    required: "author is required",
  },
  body: {
    type: String,
    required: "post body is required",
  },
  date: { type: Date, default: Date.now }
});

const Post = model('Post', postSchema);
module.exports = Post;