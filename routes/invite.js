const express = require('express');
const {check, validationResult} = require('express-validator');

const auth = require('../middleware/auth');

let Invite = require('../models/Invite');
const router =express.Router();
 router.get('/', async(req,res)=>{
    try{
        const invite = await Invite.find();
        res.send(invite);
    }
    catch(err){
        res.status(500).send('Server error');
    }
   
});

router.get('/:id', async(req,res)=>{
    try{
        const invite = await Invite.findById(req.params.id);
        if(!invite){
            return res.status(404).send('task not found');
        }
        res.send(invite);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

router.post('/',auth,

[
   
    check('email', 'Please include a valid email').isEmail(),
    check('project','project should not be empty').not().isEmpty(),
   


],

async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        const newInvite= new Invite({
            user:req.user.id,
            
            email:req.body.email,
            project:req.body.project,
            

        });
       
        const result = await newInvite.save();
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
/*router.delete('/:id',auth, async(req,res)=>{
    try{
        const invite = await Invite.findById(req.body.id);
        if(!invite){
            return res.status(404).json({msg: 'Task not found'});
        }
            const result = await Invite.findByIdAndDelete(req.body.id);
       
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
})*/
router.delete('/:id', auth, async (req, res) => {
    
    const id = req.params.id;
      try{
        await Invite.findByIdAndRemove(id).exec();
        res.send('Successfully deleted')
      }

      catch(error){
        console.log(error);
      }
      
  });
router.put('/',auth,
[
   
    check('email', 'Please include a valid email').isEmail(),
    check('project','please enter with 3 or more').isLength({
        min:3,
    }),
  

],
async (req,res)=>{
   
    try{
        const errors = validationResult(req);
        const invite = await Invite.findById(req.body.id);
        if(!invite){
            return res.status(404).json({msg: 'Task not found'});
        }
        else if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }

       
      
        invite.email=req.body.email,
        invite.project=req.body.project,
        
        await invite.save();
      
        res.send(invite);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;