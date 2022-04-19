var request = require('request');
var Post = require('../models/Post');
 

// exports.getPostById = function(req, res) {

//     if(!req.body.postId) {
//        res.status(400).send({ error: true, message: 'No id provided'});
//        return;
//     }

//     Post.getPostById(req.body.postId, function(err, posts) {
//         console.log("Entrei")
//     // Post.getPostById(req.query.id, function(err, posts) {
//         if(err) res.send({error: true});
//         else res.send(posts);
//     })
// }


exports.getPostById = function(req, res) {

    if(!req.body.postId) {
       res.render('viewPost', { title: "Not Found" , body: "Not Found" });
       return;
    }

    Post.getPostById(req.body.postId, function(err, result) {
        if(err) res.render('viewPost', { title: "Not Found" , body: "Not Found" });
        else {
            // console.log(result.mediaID);
            res.render('viewPost', { title: result.postInfo.title , body: result.postInfo.body, mediaID: result.mediaID });
        }
    })
}




exports.getPostByIdInternal = async function(id){
    request(`https://jsonplaceholder.typicode.com/posts?id=${id}`, { json: true }, (err, res, body) => { 
        if (err) {
            return{title: "Not Found", body: "Not Found"}; 
        }
        else{    
            console.log("ENTREIII")
            if(body.length === 0 && body !== 'undefined') return{title: "Not Found", body: "Not Found"};
            else {
                console.log("Aqui")
                return{title: body[0].title, body: body[0].body} 
            };
        };
    });
}