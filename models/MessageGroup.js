const mongoose = require('mongoose');
const Message = require('./Message')

const MessageGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    createdDate: {
        type: Date,
        default:Date.now
    },
    messages: [Message]
})

module.exports = mongoose.model('MessageGroup', MessageGroupSchema);