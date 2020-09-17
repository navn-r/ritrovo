const router = require('express').Router();
let User = require('../models/user.model');

// GET all users
router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json(`Error: ${err}`));
});

// GET one user by username (used for login auth)
router.route('/:username').post((req, res) => {
    const {password} = req.body;
    User.findOne({
        username: req.params.username,
      }).then((user) => {
          user.comparePassword(password, function(err, isMatch) {
              if(err)
                return res.status(400).json(`${err}`);
              return res.json(isMatch ? user : isMatch);
          });
      }).catch((err) => res.status(400).json(`Error: ${req.params.username} not found`));
});


// POST new user
router.route('/').post((req, res) => {
    const {username, password, email} = req.body;
    const newUser = new User({
        username, password, email
    });
    newUser.save().then(() => res.json(`${username} successfully added`)).catch(err => res.status(400).json(err));
});

// POST update password
router.route('/password/:username').post((req, res) => {
     User.findOne({
        username: req.params.username,
      }).then((user) => {
          user.password = req.body.password;
          user.save().then(() => res.json(`[${req.params.username}] password updated`)).catch(err => res.json(err));
      }).catch((err) => res.status(400).json(`Error: ${err}`));
});

// POST update email
router.route('/email/:username').post((req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        user.email = req.body.email;
        user.save().then(() => res.json(`[${req.params.username}] email updated`)).catch(err => res.json(err));
    }).catch(err => res.status(400).json(`Error: ${err}`));
});

// DELETE user by username
router.route('/:username').delete((req, res) => {
    User.findOneAndDelete({username: req.params.username}).then(() => res.json(`[${req.params.username}] user deleted`)).catch(err => res.json(err));
});

module.exports = router;
