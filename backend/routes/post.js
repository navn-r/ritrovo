const router = require("express").Router();
let Post = require("../models/post.model");
let User = require("../models/user.model");

// GET all posts
router.route('/').get((req, res) => {
    Post.find().then(posts => res.json(posts)).catch(err => res.status(400).json(`Error: ${err}`));
});

// GET post by id
router.route('/:id').get((req, res) => {
    Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.status(400).json(`Error: ${err}`));
});

// GET posts by username
router.route('/user/:username').get((req, res) => {
    User.findOne({ username: req.params.username })
      .then(user => {
          if(!user) return res.json(`username=${req.params.username} not found`);
          Post.find().then(posts => {
              res.json(posts.filter(post => post.author === user.username));
          }).catch(err => res.status(400).json(`Error: ${err}`));
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
});


// POST new post
router.route('/').post((req, res) => {
    const {title, author, body} = req.body;
    const newPost = new Post({title, author, body});
    newPost.save().then(() => res.json(`post successfully added`)).catch(err => res.json(err));
});

// POST update post
router.route('/:id').post((req, res) => {
    Post.findById(req.params.id).then(post => {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save().then(() => res.json(`post updated`)).catch(err => res.json(err));
    })
});


// DELETE post by id
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id).then(() => res.json(`deleted ${req.params.id}`)).catch((err) => res.json(err));
});

// DELETE all posts with author=username
router.route('/user/:username').delete((req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if(!user) return res.json(`username=${req.params.username} not found`);
        Post.find()
          .then(posts => {
              let userPosts = posts.filter(post => post.author === user.username);
              userPosts.forEach(post => Post.findByIdAndDelete(post.id).then(() => console.log('deleted')));
              res.json(`[${req.params.username}] deleted all posts`);
          }).catch((err) => res.json(err));
    }).catch((err) => res.json(err));
});


module.exports = router;
