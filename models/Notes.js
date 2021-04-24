const mongoose = require('mongoose');

//schema
const NoteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    title: {
        type:String,
        required:true,
    },
    description:{
        type: String,
    },
   
});

module.exports = mongoose.model('Notes', NoteSchema);