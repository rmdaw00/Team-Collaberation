const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let Announcement = require('../models/Announcement');
router.get('/', auth,  async(req, res) => {
    
    try {
        const announcements = await Announcement.find();
        res.send(announcements);
      } catch (err) {
        res.status(500).send('Server error');
      }
    });
    

    router.get('/:id', auth, async (req, res) => {
        try{
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
          return res.status(404).send('announcement not found');
        }
        res.send(announcement);
      } catch (err) {
        res.status(500).send('Server error');
      }
    });
  


  router.post('/', auth, async (req, res) => {
    try {
      const newAnnouncement=  new Announcement ({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description
       
        
    });
      
      const result = await newAnnouncement.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


  

    router.delete('/:id', auth, async (req, res) => {
    
      const id = req.params.id;
        try{
          await Announcement.findByIdAndRemove(id).exec();
          res.send('Successfully deleted')
        }

        catch(error){
          res.status(500).send('Server error');
        }
        
    });
  

  router.put('/id', auth, async (req, res) => {
        const id = req.params.id;
        const newTitle = req.body.newTitle;
        const newDescription = req.body.newDescription;
       
        try {
              await Announcement.findById(id, (err, updatedAnnouncement)=>{
              updatedAnnouncement.title,
              updatedAnnouncement.description
              updatedAnnouncement.save();
              res.send('updated');
            });
       
        } catch (err) {
        res.status(500).send('Server error');
      }
    });


  module.exports = router;