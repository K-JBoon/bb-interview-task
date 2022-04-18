const express = require('express');
const app = express();

// import env variables
const dotenv = require("dotenv");
dotenv.config();






// middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "2gb" }) );
app.use(bodyParser.urlencoded({ extended: true, limit: "2gb"}));


const morgan = require("morgan");
app.use(morgan('dev'));


// import routes 
var routes = require('./app/routes/index');
routes(app);


const request = require('request');
const placeHolderOption = {
    server: 'https://jsonplaceholder.typicode.com'
}



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening om port: ${PORT}`))