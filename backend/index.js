const connectToMongo = require('./dbConnection');
const express = require('express');

// mongoDB connection
connectToMongo();

// create express app
const app = express();
// set port to 5000
const port = 5000;


// create routes
app.get('/',(req,res) => {
    res.send('Server is up and running !!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// starting the express server
app.listen(port, ()=> {
    console.log(`my-notebook backend listening at http://localhost:${port}`);
});