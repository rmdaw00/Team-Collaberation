const mongoose = require('mongoose');

//schema
const AnnouncementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

 title: {
    type: String,
    required: true,
  },
  
 description: {
    type: String,
    required: true,

  }

  
  
  
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);