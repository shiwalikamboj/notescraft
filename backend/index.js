const connectToMongo = require('./dbConnection');
const express = require('express');

// mongoDB connection
connectToMongo();

// create express app
const app = express();
// set port to 5000
const port = 5000;


// create routes
app.get('/', (req,res) => {
    res.send("Hello the-zoomeee");
})

// starting the express server
app.listen(port, ()=> {
    console.log(`my-notebook backend listening at http://localhost:${port}`);
})