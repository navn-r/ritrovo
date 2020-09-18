const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: "post body is required",
  },
  date: { type: Date, default: Date.now }
});

const Post = model('Post', postSchema);
module.exports = Post;