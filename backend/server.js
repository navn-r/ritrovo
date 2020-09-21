/* 
    Necessary Imports:
        - express: node js framework for backend
        - cors: for cross-origin stuff
        - mongoose: helps connect to mongoDB atlas
        - path: used for linking the directories together ?
        - userRouter: route for user
        - postRouter: route for post
*/
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// dotenv to load .env files
require("dotenv").config();

const app = express(); // creates express init
const port = process.env.PORT || 8080; // creates port const

app.use(cors());
app.use(express.json()); // since we are using bson/json database (mongo)

const uri = process.env.uri; // gets atlas uri from .env file

// mongoose now attempts to connect to the mongoDB atlas db with the uri
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true, // added due to deprecation warning
}).catch(() => console.log('ruh roh!')); // added due to warning in heroku logs

const connection = mongoose.connection; // mongoose connection const to mongoDB

// once the connection is 'open', console log success
connection.once("open", () => console.log(`MongoDB now connected`));

// use routes in app
app.use('/posts', postRouter);
app.use('/users', userRouter);

// For the server to know where the static files are located
// we use `path.join()` to link these strings together since ../ won't work
app.use(express.static(path.join(__dirname, "..", "dist", "ritrovo")));

// Used by heroku, my local server doesn't need this to run
// All get requests will get the index.html file sent back
app.get("*", (req, res) => {

  // sendFile() sends the static file from the server to client
  // we use `join()` for the same reason as above
  res.sendFile(path.join(__dirname, "..", "dist", "ritrovo", "index.html"));
});


// server connects to port and is now listening
app.listen(port, () => console.log(`Listening on port ${port}`));
