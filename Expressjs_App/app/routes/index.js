module.exports = function(app){


// Objects
    var Posts   = require('../controllers/Post');
    var User    = require('../controllers/User');


    app.get('/', function(req, res){
        res.send("Hello World")
    });


    app.get('/login', function(req, res){
        res.render('login');
    })

    // app.route('/posts').get(Posts.getAllPosts);
    // app.route('/posts').get(Posts.getPostById);
    app.route('/postId').post(Posts.getPostById);

    app.route('/post').get(Posts.getPost);

    // app.get('/post', (req, res) => {
    //     res.render('post');
    // });


    // app.post('/postId', (req, res) => {
    //     var Post = await Posts.getPostByIdInternal(req.body.postId);
    //     console.log(Post);
    //     res.render('viewPost', { title: Post.title , body: Post.body });
    // });


    app.route('/user').get(User.getUserById);



};