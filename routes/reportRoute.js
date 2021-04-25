const express = require('express');
const { check, validationResult } = require('express-validator');
const TodoGroup = require('../models/TodoGroup');
const auth = require ('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/', auth, async (req, res) => {
      try {
        let allAuthTasks = await TodoGroup.find();
        allAuthTasks = allAuthTasks.filter(s => (s.user == req.user.id))    //same user
                            .map(s => s.tasks.filter((s) => (s.dueDate))   //has due dates
                                              .shift()        //flattens into 1 array
                            );
        let completed, notCompleted, totalTasks;
        console.log(req.body.startDate,req.body.endDate)
          
          // If No Starting Date, use current date
          let date = req.body.startDate?new Date(req.body.startDate): new Date();
          date.setHours(0,0,0,0);
          
          // Get the previous Monday
          let monday = new Date(date);
          monday.setDate(monday.getDate() - monday.getDay() + 1);
          let startDate = monday;
        
          // Get next Sunday
          let sunday = new Date(date);
          sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

        //Starting And Ending Date
          let endDate = req.body.endDate?new Date(req.body.endDate):sunday;
          endDate.setHours(23,59,59,0);
          completed = allAuthTasks.filter((s) => {
            if (s)
              return (s.dueDate >= startDate && s.dueDate <= endDate && s.status)
          })

          notCompleted = allAuthTasks.filter(s => {
            if (s)
            return (s.dueDate >= startDate && s.dueDate <= endDate && !s.status)
          })
          totalTasks = completed.length+notCompleted.length;
        

        res.send({startDate:dateToString(startDate),
        endDate:dateToString(endDate),
        completionRatio: Number(completed.length/(totalTasks)*100).toFixed(2) + "%",
        totalTasks:totalTasks,
        completed:await taskArrFiltered(completed),
        notCompleted:await taskArrFiltered(notCompleted)
      }
        );
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')   
    }
});


const dateToString = (date) => (date.getFullYear() + '-' + Number(date.getMonth()+1) + '-' + date.getDate()) 

const taskArrFiltered = async (tasksArr) => {
      let promise =  tasksArr.map(async (s) => {
              const user = await User.findById(s.assignedUser)
              
                return ({   name:s.name,
                            dueDate:dateToString(s.dueDate),
                            user: user ? user.name:undefined })
                });
      return (await Promise.all(promise))

}

module.exports = router;