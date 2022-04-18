var Post = require('../models/Post');

exports.getAllPosts = function(req, res) {
    console.log("Entrei")
    
    Post.getAllPosts(function(err, posts) {
        if(err) res.send({error: true});
        else res.send(posts);
    })
}