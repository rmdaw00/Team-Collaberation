const mongoose = require('mongoose');

//schema
const SettingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    name: {
        type:String,
        required:true,
    },
    key:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    projectlead:{
        type: String,
        required:true,
    },
   
});

module.exports = mongoose.model('PSetting', SettingSchema);