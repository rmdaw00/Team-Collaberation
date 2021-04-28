const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require ('../middleware/auth');
const MessageGroup = require('../models/MessageGroup');
const User = require('../models/User');
const crypto = require("crypto");
const config = require('config');
const router = express.Router();

//TODO: encryption2

//this will show the read groups and preview of latest message
router.get('/read', auth, async (req, res) => {
    try {

        let allAuthGroups = await MessageGroup.find()
        let lastMessage; 

        allAuthGroups = allAuthGroups.filter (x => {
          lastMessage = x.messages.sort((a, b) => {
            let da = new Date(a.sentDate),
                db = new Date(b.sentDate);
              return db - da;
            })[0]
            
            if (!lastMessage) return false;
            
            //if last message is same user = read
            //console.log(lastMessage)
            if (lastMessage.sender == req.user.id) return true;

             //filters group if last message was read by user and authorized user
            return lastMessage.read.find(r => (r.userid == req.user.id))!=null && x.members.find(s => (s == req.user.id))!=null
        });

        //sending back only last message within thread (this is just meant for thread preview)
        if (lastMessage) allAuthGroups.messages = [lastMessage] //doesnt work as intended
        

        return res.status(200).send(allAuthGroups);

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
});

//this will show the undread groups and preview of latest message
router.get('/unread', auth, async (req, res) => {
  try {

    let allAuthGroups = await MessageGroup.find()

    allAuthGroups = allAuthGroups.filter (x => {
      
      lastMessage = x.messages.sort((a, b) => {
        let da = new Date(a.sentDate),
            db = new Date(b.sentDate);
          return db - da;
        })[0]

        if (!lastMessage) return false;
        //if last message is sender = read
        if (lastMessage.sender == req.user.id) return false;

        //filters group if last message was not read by user and authorized user
        return lastMessage.read.find(r => (r.userid == req.user.id))==null && x.members.find(s => (s == req.user.id))!=null
    });

    //sending back only last message within thread (this is just meant for thread preview)
    if (lastMessage) allAuthGroups.messages = [lastMessage]  //doesnt work as intended
    
    return res.status(200).send(allAuthGroups); 

} catch (error) {
    console.log(error)
    res.status(500).send('server error')
}
});

//this will show the read groups and preview of latest message
router.get('/:messageGroupID', auth, [
  check('messageGroupID','message group is required').not().isEmpty()
], async (req, res) => {
    try {
      const group = await MessageGroup.findById(req.params.messageGroupID);
      if (!group) {
        return res.status(404).send('Group not found');
      }
  
      if (group.members.find(x => (x == req.user.id)) == null) {
        if (group.user != req.user.id) {
          return res.status(403).json({ msg: 'not authorized' });
        }
      }

      newReadObj = {
        userid: req.user.id,
        readDate: new Date()
      }
      
      group.messages.map(m => {
        if (m.read.find(r => (r.userid == req.user.id))==null) {
           m.read.push(newReadObj)
        }
      })

      await group.save()
      


      res.send(group);
    } catch (err) {
      console.log(err)
      res.status(500).send('Server error');
    }
  });


  //Creates a Message Group
router.post('/group', auth, [
    check('groupName', 'name should not be empty').not().isEmpty(),
    check('members', 'members should not be empty').isArray().notEmpty(),
  ],

  async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let members = req.body.members;

        members.forEach(async (element) => {
          user = await User.exists({_id:element})
          if(!user)
            return res.status(422).json({ error: `id:${element} doesnt exist`});
        });

        
        let group = new MessageGroup({
            name: req.body.groupName,
            members: req.body.members,
        });

        const result = await group.save();
        res.send(result)

  
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')   
    }
})


//Creates a new message 
router.post('/', auth, [
    check('content', 'message content should not be empty').not().isEmpty(),
    check('messageGroupID','message group is required').not().isEmpty()
  ],

  async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
          
          const group = await MessageGroup.findById(req.body.messageGroupID);
          if (!group) {
            return res.status(404).send('Group not found');
          }
          
          if (group.members != null) {
            // console.log(group.members)
            // console.log(req.user.id)
            // console.log(group.members.find(s=>(s== req.user.id)))
            if (!group.members.find(s=>(s== req.user.id))) {
              return res.status(403).json({ msg: 'not authorized' });
            }
          }
        
          const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
          const key = config.get('messagesKey')
          const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);
          let encryptedMsg = encrypter.update('0000000000000000'+req.body.content, "utf8", "hex");
          encryptedMsg += encrypter.final("hex");

        const newMessage = {
            sender: req.user.id,
            content: encryptedMsg,
            read: [{
              userid: req.user.id,
              readDate: new Date()
            }]
        }

        group.messages.push(newMessage);

        const result = await group.save();
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')   
    }
})

//Deletes users owned messages in a group
router.delete('/', auth, [
              check('messageID','message ID is required').not().isEmpty(),
              check('messageGroupID','message group is required').not().isEmpty(),
            ],
              async (req, res) => {
                try {
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                      return res.status(422).json({ errors: errors.array() });
                    }
                    
                    const group = await MessageGroup.findById(req.body.messageGroupID);
                    if (!group) {
                      return res.status(404).send('Group not found');
                    }
              
                    if (group.members != null) {
                      if (!group.members.find(s=>(s== req.user.id))) {
                        return res.status(403).json({ msg: 'not authorized' });
                      }
                    }
                    
                    if (group.messages.find(m => {
                          // console.log(m._id == req.body.messageID)
                          // console.log("access:",m.sender == req.user.id)
                          // console.log(m._id)
                          // console.log(req.body.messageID)
                          if (m._id == req.body.messageID && m.sender == req.user.id) {
                            m.content =  "deleted";
                          }
                          return (m._id == req.body.messageID)
                                                    }) == null)  {
                            return res.status(404).send('Message not found');
                    } 

            
                  const result = await group.save();
                  res.send(result)
                
              } catch (error) {
                  console.log(error)
                  res.status(500).send('server error')   
              }
  });

//edits group, member changes, name change, user quiting also here
  router.put('/group', auth, [
    check('groupName', 'name should not be empty').not().isEmpty(),
    check('members', 'members should not be empty').isArray().notEmpty(),
    check('messageGroupID', 'Group ID is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        
        const group = await MessageGroup.findById(req.body.messageGroupID);
        if (!group) {
          return res.status(404).send('Group not found');
        }
  
        if (group.members != null) {
          if (!group.members.find(s=>(s== req.user.id))) {
            return res.status(403).json({ msg: 'not authorized' });
          }
        }

        let members = req.body.members;

        members.forEach(async (element) => {
          user = await User.exists({_id:element})
          if(!user)
            return res.status(422).json({ error: `id:${element} doesnt exist`});
        });

        group.name= req.body.groupName;
        group.members= req.body.members;
        

      const result = await group.save();
      res.send(result)
    
  } catch (error) {
      console.log(error)
      res.status(500).send('server error')   
  }
});


module.exports = router;