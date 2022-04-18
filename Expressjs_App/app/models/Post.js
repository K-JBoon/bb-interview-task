const request = require('request');

var Post = function( ){

}



Post.getAllPosts = function getAllPosts(result) {
    request('https://jsonplaceholder.typicode.com/posts', { json: true }, (err, res, body) => { 
        if (err) { result(true, {valid: false}) }
        else{ result (null, body) };
    });

}



module.exports = Post;