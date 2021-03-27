const express = require('express');
const bcrypt=require('bcryptjs');
const {check, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
let User = require('../../models/User');

 router.get('/', async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.status(500).send('Server error');
    }
   
});

router.get('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send('task not found');
        }
        res.send(user);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

//route post api/user
//desc indert user
//access public
router.post(
    '/',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Please enter valid email').isEmail(),
        check('password','please enter with 3 or more ').isLength({
            min:3,
        }),

    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        try{
            const hashpass = await bcrypt.hash(req.body.password,12);
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:hashpass,
            });
            await newUser.save();
            const payload = {
                user:{
                    id:newUser.id,
                    name:newUser.name,
                },
            };

            jwt.sign(payload,config.get('jwtsecret'),{expiresIn:'1h'},(err,token)=>{
                if(err) throw err;
                res.json({token});
            })
          
        }catch(err){
            res.status(500).send(err.message);
        }
    }
)
router.delete('/', async(req,res)=>{
    try{
        const user = await User.findById(req.body.id);
        if(!user){
            return res.status(404).json({msg: 'Task not found'});
        }
            const result = await User.findByIdAndDelete(req.body.id);
       
        res.send(result);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
})
router.put('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password','please enter with 3 or more ').isLength({
        min:3,
    }),

],
async (req,res)=>{
    try{
        const errors = validationResult(req);
        const user = await User.findById(req.body.id);
        if(!user){
            return res.status(404).json({msg: 'Task not found'});
        }
        else if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()}); 
        }

       
       user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
      
        res.send(user);
     
    }
    catch(err){
        res.status(500).send('Server error');
    }
});
module.exports = router;