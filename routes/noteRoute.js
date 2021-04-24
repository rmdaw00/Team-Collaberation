const express = require('express');


// const uuid = require('uuid');

const auth = require('../middleware/auth');
let Notes = require('../models/Notes');


const { check,validationResult} = require('express-validator');

const router =express.Router();

router.get('/', async (req,res)=>{
    try{
        
        const notes = await Notes.find();
        res.send(notes);
    }
    catch(err){
        res.status(500).send('Server error');
    }
   
});

router.get('/:id', async (req,res)=>{
    try{
        const notes = await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send('task not found');
        }
        res.send(notes);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

router.post(
    '/', 
    auth,

[
    check('title','Title is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    
    
],



async (req,res)=>{
    
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors:errors.array()});
            }
        const newNotes= new Notes({
            user: req.user.id,
            title:req.body.title,
            description:req.body.description,
            

        });
        const result = await newNotes.save();
  
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
// router.delete('/', async (req,res)=>{
//     try{
//         const notes = await Notes.findById(req.body.id);
//         if(!notes){
//             return res.status(404).json({msg: 'Task not found'});
//         }
//             const result = await Notes.findByIdAndDelete(req.body.id);
       
//         res.send(result);
     
//     }
//     catch(err){
//         res.status(500).send('Server error');
//     }
// });


router.delete('/:id', auth, async (req, res) => {
    
    const id = req.params.id;
      try{
        await Project.findByIdAndRemove(id).exec();
        res.send('Successfully deleted')
      }

      catch(error){
        console.log(error);
      }
      
  });
router.put('/',
auth,

[
    check('title','Title is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
   
    
],
 async (req,res)=>{
    try{
        const errors= validationResult(req);    
        const notes = await Notes.findById(req.body.id);
        if(!notes){
            return res.status(404).json({msg: 'Task not found'});
        }
        else if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }

        
        notes.title = req.body.title;
        notes.description = req.body.description;
      

        await notes.save();
        res.send(notes);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;