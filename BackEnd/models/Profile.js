const mongoose = require('mongoose');

 const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location:{
        type: String,
        require: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    occupation: {
        type: String,
        required: true
    },
    badge:{
        type: String,
    },
    bio:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
 }); 

 module.exports = Profile = mongoose.model('profile', ProfileSchema)

 