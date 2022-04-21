// const request = require('request');

// var User = function( id, name, username, email, addressStreet, addressCity, phone, website, companyName ){
//     this.id = id;
//     this.name = name;
//     this.username = username;
//     this.email = email;
//     this.addressStreet = addressStreet;
//     this.addressCity = addressCity;
//     this.phone = phone;
//     this.website = website;
//     this.companyName = companyName;
// }

// User.getUserById = function getUserById(id, result) {

//     if(id) var url = `https://jsonplaceholder.typicode.com/users?id=${id}`;
//     else var url = `https://jsonplaceholder.typicode.com/users`;

//     request(url, { json: true }, (err, res, body) => { 
//         if (err) { result(true, {valid: false}) }
//         else{ 
//             // result (null, body[0].address.street);
//             var responseObject = body[0];
//             if(body.length === 0 && body !== 'undefined') 
//                 { result(false, {notFound: true})}
//             var foundUser = new User(
//                 responseObject.id, responseObject.name, responseObject.username, responseObject.email, 
//                 responseObject.address.street, responseObject.address.city, responseObject.phone, 
//                 responseObject.website, responseObject.company.name
//             )
//              result (null, foundUser) 
//         };
//     });

// }

// module.exports = User;