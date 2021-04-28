const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let Project = require('../models/Project');
router.get('/', auth,  async(req, res) => {
    
    try {
        const projects = await Project.find();
        res.send(projects);
      } catch (err) {
        res.status(500).send('Server error');
      }
    });
    

    router.get('/:id', auth, async (req, res) => {
        try{
        const project = await Project.findById(req.params.id);
        if (!project) {
          return res.status(404).send('project not found');
        }
        res.send(project);
      } catch (err) {
        res.status(500).send('Server error');
      }
    });
  


  router.post('/', auth, async (req, res) => {
    try {
      const newProject=  new Project ({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description
        
    });
      
      const result = await newProject.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


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
  

  router.put('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.body.id);
        if (!project) {
          return res.status(404).json({ msg: 'Project not found' });
        }
        
        project.name = req.body.name;
        project.description= req.body.description;
        
       
        await project.save();
        res.send(project);
      } catch (err) {
        res.status(500).send('Server error');
      }
    });


  module.exports = router;