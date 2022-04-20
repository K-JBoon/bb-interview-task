var request = require('request');
var Post = require('../models/Post');
 

exports.getPost = function (req,res) {

    console.log(req.query.user);
    if(req.query.user) user = req.query.user;
    else user = '';

    res.render('post', {user: user});
}



exports.getPostById = function(req, res) {

    if(!req.body.postId) {
       res.render('notFound');
       return;
    }

    Post.getPostById(req.body.postId, function(err, result) {
        if(err) res.render('notFound');
        else res.render('viewPost', { title: result.postInfo.title , body: result.postInfo.body, mediaID: result.mediaID });
    })
}




exports.getPostByIdInternal = async function(id){
    request(`https://jsonplaceholder.typicode.com/posts?id=${id}`, { json: true }, (err, res, body) => { 
        if (err) {
            return{title: "Not Found", body: "Not Found"}; 
        }
        else{    
            if(body.length === 0 && body !== 'undefined') return{title: "Not Found", body: "Not Found"};
            else {
                return{title: body[0].title, body: body[0].body} 
            };
        };
    });
}