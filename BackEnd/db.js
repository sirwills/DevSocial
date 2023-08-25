const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        
    }

};

module.exports = connectDB

