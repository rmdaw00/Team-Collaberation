const mongoose = require('mongoose');
const TodoTask = require('./TodoTask')

const TodoGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    tasks: [TodoTask]
})

module.exports = mongoose.model('TodoGroup', TodoGroupSchema);