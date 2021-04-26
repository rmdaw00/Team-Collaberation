const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    sentDate: {
        type: Date,
        default:Date.now
    },
    read: [{
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        readDate: {
            type: Date
        }
    }]
})

module.exports = MessageSchema;