const mongoose =require('mongoose');

//schema
const InviteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',

    },
    
    email:{
        type:String,
    },
    project:{   
        type:String,
    },
    
});

module.exports = mongoose.model('Invite',InviteSchema);