module.exports = function(app){


// Objects
    var Posts   = require('../controllers/Post');


    app.get('/Alive', function(req, res){
        res.send("Yes, I am alive")
    });

    app.route('/postId').post(Posts.getPostById);
    app.route('/post').get(Posts.getPost);

    app.get('*', (req, res) => {res.render('notFound')});



};