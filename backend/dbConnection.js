const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/my-notebook';

const dbConnect = async () => {
    try {
        mongoose.connect(mongooseURI);
        console.log("message: mongoose connected successfully !!");
    }
    catch (error) {
        console.error("message: ", error.message);
        process.exit(1);
    }
}

module.exports = dbConnect;