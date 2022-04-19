var User = require('../models/User');

exports.getUserById = function(req, res) {

    User.getUserById(req.query.id, function(err, user) {
        if(err) res.send({error: true});
        else res.send(user);
    })
}