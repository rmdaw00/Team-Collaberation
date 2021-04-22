const mongoose =require('mongoose');

//schema
const UploadSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',

    },
    sentto:{
        type:String,
        required:true,

    },
    from:{
        type:String,
        required:true,

    },
    message:{
        type:String,
    },
   
});

module.exports = mongoose.model('Upload',UploadSchema);