const mongoose = require('mongoose');

//schema
const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    
  },

 name: {
    type: String,
    required: true,
  },
  
 description: {
    type: String,
    required: true,

  }
  
  
});

module.exports = mongoose.model('Project', ProjectSchema);