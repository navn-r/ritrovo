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
const port = process.env.PORT || 8080; // creates port const

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

const path = require('path');
app.use(express.static("../dist/ritrovo"));
app.get('*', (req, res) => {
  res.send("../dist/ritrovo/index.html");
});



app.listen(port, () => console.log(`Listening on port ${port}`));
