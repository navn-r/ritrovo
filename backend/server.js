/* 
    Necessary Imports:
        - express: node js framework for backend
        - cors: for cross-origin stuff
        - mongoose: helps connect to mongoDB atlas
        - userRouter: route for user
        - postRouter: route for post
*/
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// dotenv to load .env files
require("dotenv").config();

const app = express(); // creates express init
const port = process.env.PORT || 5000; // creates port const

app.use(cors());
app.use(express.json()); // since we are using bson/json database (mongo)

const uri = process.env.uri; // gets atlas uri from .env file

// mongoose now attempts to connect to the mongoDB atlas db with the uri
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true, // added due to deprecation warning
});

const connection = mongoose.connection; // mongoose connection const to mongoDB

// once the connection is 'open', console log success
connection.once("open", () => console.log(`MongoDB now connected`));

// use routes in app
app.use('/posts', postRouter);
app.use('/users', userRouter);

// server connects to port and is now listening
app.listen(port, () => console.log(`Listening on port ${port}`));

/*

const User = require("./models/user.model");
const Post = require('./models/post.model');

const testPost = new Post({
  title: "How to make a full-stack app with MEAN",
  author: "navn",
  body: "ok so basically keep watching tutorials till ur braindead then just copy someone elses stuff",
  private: false
});

testPost.save().then(post => console.log(post));

const testUser = new User({
  username: "navn",
  email: "n@example.com",
  password: "Naxter#123",
});

testUser.save((err) => {
  if (err) throw err;
  User.findOne(
    {
      username: "navn",
    },
    (err, user) => {
      if (err) throw err;
      user.comparePassword("dummy", (err, isMatch) => {
        if (err) throw err;
        console.log(`dummy ? ${isMatch}`);
      });
      user.comparePassword("Naxter#123", (err, isMatch) => {
        if (err) throw err;
        console.log(`Naxter#123 ? ${isMatch}`);
      });
    }
  );
}); 

*/