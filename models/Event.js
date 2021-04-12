const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('event', EventSchema);