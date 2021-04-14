const express = require('express');
const { check, validationResult } = require('express-validator');
const TodoTask = require('../models/TodoTask');
const TodoGroup = require('../models/TodoGroup');
const User = require('../models/User');
const auth = require ('../middleware/auth')

const router = express.Router();

//Gets All Authorized Notes from All Groups that have due date set
//Regular Access for task is going to be through groups

router.get('/', auth, async (req, res) => {
    try {
        const allAuthTasks = await TodoGroup.find();
        res.send(allAuthTasks.filter(s => (s.user == req.user.id))    //same user
                             .map(s => s.tasks.filter((s) => (s.dueDate))   //has due dates
                                              .shift()        //flattens into 1 array
                             ));
        
    } catch (error) {
        res.status(500).send('server error')   
    }
});

//I dont think I am going to use it, the access to these is going to come from the groups directly
router.get('/:todoGroupID', auth, 
    async (req, res) => {
      try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
          }
          
          const group = await TodoGroup.findById(req.params.todoGroupID);
          if (!group) {
            return res.status(404).send('Group not found');
          }
    
          if (group.user != null) {
            if (group.user != req.user.id) {
              return res.status(403).json({ msg: 'not authorized' });
            }}

          const tasks = group.tasks
          res.send(tasks);

    } catch (err) {
      res.status(500).send('Server error');
    }
  });

// Creates a new task with given name and default other parameters, when supplied with group ID
router.post('/', auth, [
    check('name', 'name is required').not().isEmpty(),
    check('todoGroupID', 'Task Group is required').not().isEmpty(),
  ],

  async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
          
          const group = await TodoGroup.findById(req.body.todoGroupID);
          if (!group) {
            return res.status(404).send('Group not found');
          }
    
          if (group.user != null) {
            if (group.user != req.user.id) {
              return res.status(403).json({ msg: 'not authorized' });
            }
          }
        
        const newTask = {
            name: req.body.name
        }
        // group.tasks = [...group.tasks, newTask];
        // Another way
        group.tasks.push(newTask);

        const result = await group.save();
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')   
    }
})


router.delete('/', auth, [
  check('todoTaskID', 'Task ID is required').not().isEmpty(),
  check('todoGroupID', 'Task Group is required').not().isEmpty(),
  ]
  , async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      const group = await TodoGroup.findById(req.body.todoGroupID);
      if (!group) {
        return res.status(404).send('Group not found');
      }

      if (group.user != null) {
        if (group.user != req.user.id) {
          return res.status(403).json({ msg: 'not authorized' });
        }
      }

      if (!group.tasks.find((t) => (t.id === req.body.todoTaskID)))
        return res.status(404).send('Task not found');

      group.tasks.filter((s) => (s.id !== req.body.todoTaskID))
      const result = await group.save();
      res.send(result);

    } catch (err) {
        console.log(err)
      res.status(500).send('Server error');
    }
  });


router.put('/', auth, [
  check('todoTaskID', 'Task ID is required').not().isEmpty(),
  check('todoGroupID', 'Task Group is required').not().isEmpty(),
  check('name', 'Task name is required').not().isEmpty(),
  check('status', 'Task status is required').isBoolean(),
  check('assignedUser', 'Assigned User ID is required').exists(),
  check('urgency', 'Task Urgency is required').not().isEmpty(),
  check('dueDate', 'Task Due Date is required').exists(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const group = await TodoGroup.findById(req.body.todoGroupID);
    if (!group) {
      return res.status(404).send('Group not found');
    }

    if (group.user != null) {
      if (group.user != req.user.id) {
        return res.status(403).json({ msg: 'not authorized' });
      }
    }
    
    if (!group.tasks.find((t) => (t.id === req.body.todoTaskID)))
       return res.status(404).send('Task not found');

    const name= req.body.name;
    const status= req.body.status;
    const urgency= req.body.urgency;
    const dueDate= (req.body.dueDate===''?undefined:new Date(req.body.dueDate));
    const assignedUser= (req.body.assignedUser===''?undefined:req.body.assignedUser);
    console.log(dueDate)
    console.log(assignedUser)
    group.tasks = group.tasks.map((s) => {
         if (req.body.todoTaskID === s.id) 
            {
              return { name,
                        status,
                        assignedUser,
                        dueDate,
                        urgency,
                     } 
            } else return s;
        } 

        //above can be further simplified to this (but hard to understand)
        // group.tasks = group.tasks.map((s) => 
        //   (req.body.todoTaskID !== s.id ? s : { name, status, assignedUser, dueDate, urgency})) 
    )

    await group.save();
    res.send(group)
    
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error');
  }
});


module.exports = router;