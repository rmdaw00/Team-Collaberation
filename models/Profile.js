const mongoose =require('mongoose');

//schema
const ProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',

    },
    firstname:{
        type:String,
        required:true,

    },
    lastname:{
        type:String,
        required:true,

    },
    email:{
        type:String,
    },
    role:{   
        type:String,
    },
    team:{   
        type:String,
    },
    aboutme:{   
        type:String,
    },
});

module.exports = mongoose.model('Profile',ProfileSchema);