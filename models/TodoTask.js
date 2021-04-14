const mongoose = require('mongoose');

const TodoTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, status: {
        type: Boolean,
        default: false
    }, assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }, dueDate: {
        type: Date,
    }, urgency: {
        type: String,
        default: "none"
    }  
})

module.exports = TodoTaskSchema;