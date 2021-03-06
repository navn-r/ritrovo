const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const saltFactor = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: "username is required",
    unique: "username already exists",
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: "email is required",
    unique: "email already registered",
    match: [/.+\@.+\..+/, "Valid email required"],
  }
}, {
    timestamps: true
});

/* 
    https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
*/

/* 
    Compare Password 
    - newPass: the new password
    - callBack: function(err, isMatch)
        - Can be just any function you pass, err passed for error handling
*/
userSchema.methods.comparePassword = function(newPass, callBack) {
    bcrypt.compare(newPass, this.password, function(err, isMatch) {
        if(err) return callBack(err);

        // err is null here since compare didn't throw an err
        callBack(null, isMatch);
    });
};

userSchema.pre("save", function(next) {
  let user = this;

  // check if password was modified or not
  if (!user.isModified("password")) return next();

  // generate the s a l t y hash and store password
  bcrypt.hash(user.password, saltFactor, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});


const User = model("User", userSchema);
module.exports = User;