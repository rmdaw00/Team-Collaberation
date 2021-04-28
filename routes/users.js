const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require ('../middleware/auth');
const {check, validationResult } = require('express-validator');

const User = require('../models/User');

router.get('/', auth, async (req,res) => {
    let user = await User.find();
    return res.status(200).json(user.map(s => { 
        return {
            user: s.name,
            id: s._id
        }
    }))
})



// @route  POST api/users
// @desc   Register a user
// @access Public
router.post('/', [
    check('name', 'Please add name')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters'
    ).isLength({min: 6})
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payLoad = {
            user: {
                id: user.id
            }
        };
        debugger;
        console.log(config.get('jwtSecret'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        jwt.sign(payLoad, 
            config.get('jwtSecret'), 
        {
            expiresIn: 360000
        }, 
        (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch(err){
        console.error("Server Error");
    }
});

module.exports = router;