const mongooose = require('mongoose');

const PostsSchema = new mongooose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        tyope: String,
        required: true
    },
    name:{
        type: String,
    }, 
    avatar: {
        type: String
    },
    likes: [
       { 
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String,
            }, 
            avatar: {
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Posts = mongooose.model('Posts', PostsSchema)