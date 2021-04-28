const express = require('express');
const {check, validationResult} = require('express-validator');

const auth = require('../middleware/auth');

let Profile = require('../models/Profile');
const router =express.Router();
 router.get('/', async(req,res)=>{
    try{
        const profile = await Profile.find();
        res.send(profile);
    }
    catch(err){
        res.status(500).send('Server error');
    }
   
});

router.get('/:id', async(req,res)=>{
    try{
        const profile = await Profile.findById(req.params.id);
        if(!profile){
            return res.status(404).send('task not found');
        }
        res.send(profile);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

router.post('/',auth,

[
    check('firstname','first name is required').not().isEmpty(),
    check('lastname','last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('role','role should not be empty').not().isEmpty(),
    check('team','team is required').not().isEmpty(),
    check('aboutme','please enter with 3 or more').isLength({
        min:3,
    }),


],

async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        const newProfile= new Profile({
            user:req.user.id,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            role:req.body.role,
            team:req.body.team,
            aboutme:req.body.aboutme,

        });
       
        const result = await newProfile.save();
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
// router.delete('/',auth, async(req,res)=>{
//     try{
//         const profile = await Profile.findById(req.body.id);
//         if(!profile){
//             return res.status(404).json({msg: 'Task not found'});
//         }
//             const result = await Profile.findByIdAndDelete(req.body.id);
       
//         res.send(result);
     
//     }
//     catch(err){
//         res.status(500).send('Server error');
//     }
// })

router.delete('/:id', auth, async (req, res) => {
    
    const id = req.params.id;
      try{
        await Profile.findByIdAndRemove(id).exec();
        res.send('Successfully deleted')
      }

      catch(error){
        console.log(error);
      }
      
  });

router.put('/',auth,
[
    check('firstname','first name is required').not().isEmpty(),
    check('lastname','last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('role','please enter with 3 or more').isLength({
        min:3,
    }),
    check('team','team is required').not().isEmpty(),
    check('aboutme','please enter with 3 or more').isLength({
        min:3,
    }),

],
async (req,res)=>{
   
    try{
        const errors = validationResult(req);
        const profile = await Profile.findById(req.body.id);
        if(!profile){
            return res.status(404).json({msg: 'Task not found'});
        }
        else if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }

       
        profile.firstname=req.body.firstname,
        profile.lastname=req.body.lastname,
        profile.email=req.body.email,
        profile.role=req.body.role,
        profile.team=req.body.team,
        profile.aboutme=req.body.aboutme,
        await profile.save();
      
        res.send(profile);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;