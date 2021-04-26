const express = require('express');
const { check, validationResult } = require('express-validator');
const TodoTask = require('../models/TodoTask');
const TodoGroup = require('../models/TodoGroup');
const User = require('../models/User');
//const config = require('config')
const auth = require ('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const allAuthGroups = await TodoGroup.find();
        res.send(allAuthGroups.filter((t) => t.user == req.user.id))
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
});

router.get('/:todoGroupID', auth, async (req, res) => {
    try {
      const group = await TodoGroup.findById(req.params.todoGroupID);
      if (!group) {
        return res.status(404).send('Group not found');
      }

      if (group.user != null) {
        if (group.user != req.user.id) {
          return res.status(403).json({ msg: 'not authorized' });
        }
      }

      res.send(group);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


router.post('/', auth, [
    check('name', 'name is required').not().isEmpty(),
  ],

  async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

        const newGroup = new TodoGroup({
            user: req.user.id,
            name: req.body.name,
        })

        const result = await newGroup.save();
        res.send(result)
    } catch (error) {
        res.status(500).send('server error')   
    }
})


router.delete('/:todoGroupID', auth, check('todoGroupID', 'Task Group ID is required').not().isEmpty(), async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const group = await TodoGroup.findById(req.params.todoGroupID);
      if (!group) {
        return res.status(404).json({ msg: 'group not found' });
      }
  
      if (group.user != null) {
        if (group.user != req.user.id) {
          return res.status(403).json({ msg: 'not authorized' });
        }
      }
  
  
      const result = await TodoGroup.findByIdAndDelete(req.params.todoGroupID);
      res.send(" deleted");
    } catch (err) {
        console.log(err)
      res.status(500).send('Server error');
    }
  });


  router.put('/', auth, [
    check('name', 'name is required').not().isEmpty(),
    check('todoGroupID', 'Group ID is required').not().isEmpty()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }


    const group = await TodoGroup.findById(req.body.todoGroupID);
    
    if (!group) {
      return res.status(404).json({ msg: 'group not found' });
    }
    
    if (group.user != null) {
        if (group.user != req.user.id) {
          return res.status(403).json({ msg: 'not authorized' });
        }
      }

    group.name= req.body.name;
   
    
    await group.save();
    res.send(group)
    
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error');
  }
});


module.exports = router;