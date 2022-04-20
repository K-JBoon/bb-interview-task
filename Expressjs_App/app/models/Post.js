const request = require('request');
const csv = require('csv-parser');
const fs = require('fs'); 

var Post = function(userId, id, tittle, body ){
    this.userId = userId;
    this.id = id;
    this.tittle = tittle;
    this.body = body;
}



Post.getPostById = function getPostById(id, result) {

    getMediaID(id, function(err, resMedia){
        if(err) result(true, {valid: false});
        else{
            request(`https://jsonplaceholder.typicode.com/posts?id=${id}`, { json: true }, (err, res, body) => { 
            if (err) { result(true, {valid: false}); }
            else{    
                if(body.length == 0) {
                    result (false, {valid: false}) 
                } 
                else {
                    // postInfo: information regarding the post ; mediaID: mediaID clip for the postID
                    result(false, {postInfo: body[0], mediaID: resMedia.Id})
                }
            };
        });
    }
    });
}


// Function that retrieves the mediaID from postID
async function getMediaID(id, result){

    // Read mapping file
        const filename = 'mapping.csv';
        const mappingData = []
    
        fs.createReadStream(filename)
        .pipe(csv({ delimiter: ',' }))
        .on('data', (r) => {
            // console.log(r);
            mappingData.push(r);        
        })
        .on('end', () => {
            console.log(`${filename} read successfull`);
            const foundItem = mappingData.find(item => item.Post == id);
            if(foundItem) result(null, {Id: foundItem.Media});
            else result(true, {valid: false})
        })
    }



// if(id) var url = `https://jsonplaceholder.typicode.com/users?id=${id}`;
// else var url = `https://jsonplaceholder.typicode.com/users`;

// request(url, { json: true }, (err, res, body) => { 
//     if (err) { result(true, {valid: false}) }
//     else{ 
//         // result (null, body[0].address.street);
//         var responseObject = body[0];
//         if(body.length === 0 && body !== 'undefined') 
//             { result(false, {notFound: true})}
//         var foundUser = new User(
//             responseObject.id, responseObject.name, responseObject.username, responseObject.email, 
//             responseObject.address.street, responseObject.address.city, responseObject.phone, 
//             responseObject.website, responseObject.company.name
//         )
//          result (null, foundUser) 
//     };
// });



module.exports = Post;