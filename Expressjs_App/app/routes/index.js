module.exports = function(app){

    var Posts = require('../controllers/Post');

    app.get('/', function(req, res){
        res.send("Hello World")
    });

    app.route('/posts').get(Posts.getAllPosts);
};