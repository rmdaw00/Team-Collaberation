const express = require('express');


// const uuid = require('uuid');

const auth = require('../middleware/auth');
let Notes = require('../models/PSetting');


const { check,validationResult} = require('express-validator');
const PSetting = require('../models/PSetting');

const router =express.Router();

router.get('/', async (req,res)=>{
    try{
        
        const setting = await PSetting.find();
        res.send(setting);
    }
    catch(err){
        res.status(500).send('Server error');
    }
   
});

router.get('/:id', async (req,res)=>{
    try{
        const setting = await PSetting.findById(req.params.id);
        if(!setting){
            return res.status(404).send('task not found');
        }
        res.send(setting);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

router.post(
    '/', 
    auth,

[
    check('name','Name is required').not().isEmpty(),
    check('key','Key is required').not().isEmpty(),
    check('category','Category is required').not().isEmpty(),
    check('projectlead','Project Lead is required').not().isEmpty(),
    
],



async (req,res)=>{
    
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors:errors.array()});
            }
        const newSetting= new PSetting({
            user: req.user.id,
            name:req.body.name,
            key:req.body.key,
            category:req.body.category,
            projectlead:req.body.projectlead,
            

        });
        const result = await newSetting.save();
  
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
router.delete('/', async (req,res)=>{
    try{
        const setting = await PSetting.findById(req.body.id);
        if(!setting){
            return res.status(404).json({msg: 'Task not found'});
        }
            const result = await PSetting.findByIdAndDelete(req.body.id);
       
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
router.put('/',
auth,

[
   
    check('name','Name is required').not().isEmpty(),
    check('key','Key is required').not().isEmpty(),
    check('category','Category is required').not().isEmpty(),
    check('projectlead','Project Lead is required').not().isEmpty(),
    
    
],
 async (req,res)=>{
    try{
        const errors= validationResult(req);    
        const setting = await PSetting.findById(req.body.id);
        if(!setting){
            return res.status(404).json({msg: 'Task not found'});
        }
        else if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }

        
        setting.name = req.body.name;
        setting.key = req.body.key;
        setting.category = req.body.category;
        setting.projectlead = req.body.projectlead;
      

        await setting.save();
        res.send(setting);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;