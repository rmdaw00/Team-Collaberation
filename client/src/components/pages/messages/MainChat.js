
import axios from 'axios';
import React,{ useState, useEffect } from 'react';
import ChatGroup from './sub/ChatGroup.js';
import AddGroup from './sub/AddGroup.js';
import ChatMessages from './sub/ChatMessages'
import AddMessage from './sub/AddMessage'
import config from './default.json'
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

function Main() {


    const [groups, setGroups] = useState([]);
    const [activeGroup, setActiveGroup] = useState('');
    const [activeMessages, setActiveMessages] = useState([]);
    const [groupsRead, setGroupsRead] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [sendError, setSendError] = useState('');

    const getUserName = (id) => {
        return users.find(s => s.id === id).user
    }

    const sendMessage= (msg) => {
        const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        let data = {"messageGroupID": activeGroup,
                    "content": msg}

      axios.post('http://localhost:5000/api/messages',data, config)
        .then((response) => {
          //setTasks(tasks => [...tasks,response.data.tasks[response.data.tasks.length-1]]) 
          //reload();
        //   setGroups(groups.map(s=> {
        //       }
        //   }))
          console.log(response.data)

      }).catch((error) => {
        //   if (error.response) {
        //     console.log(error.response)
        //     if (error.response.data.msg){
        //       setSendError('Task Adding Error: ' + error.response.data.msg);
              

        //     } else if(error.response.data) 
        //       if(error.response.data.errors)
        //         if(error.response.data.errors[0])
        //           if(error.response.data.errors[0].msg)
        //             setSendError('Task Adding Error:' + error.response.data.errors[0].msg);
       
        //     } 
           
      });
    }

    const reload= () => {
        axios.get('http://localhost:5000/api/messages/unread').then((response) => {
            console.log('success',response)    
            setGroups(response.data);
            
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    setSendError(error.response.data.msg);
                }
            });;
    }
    const decryptMessage = (msg) =>{
        let decryptedMsg = 'Error Decrypting'
        try {

            const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
            const key = config.messagesKey;
            const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);

            let decryptedMsg = decrypter.update(msg, "hex", "utf8");

            decryptedMsg += decrypter.final("utf8");
            // var bytes = CryptoJS.AES.decrypt(msg, config.messagesKey);
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            
            return decryptedMsg.substring(16);
        } catch (Exception){
            
            return decryptedMsg;
        }
       

        
    } 

    const getCurrentUser = () => {
        return currentUser;
    }

    const makeActiveGroup = (id) => {
        //let group = setActiveGroup(groups.find(s => s._id === id))
        let group = groups.find(s => s._id === id);
        if (!group) group = groupsRead.find(s => s._id === id);
        console.log(group);
        if (group) setActiveGroup(group._id);
        if (group) setActiveMessages(group.messages)
        return group;
    }

    const FxObj = {
        getUserName,
        makeActiveGroup,
        getCurrentUser,
        decryptMessage,
        sendMessage,
    }

    useEffect( () => {
        axios.get('http://localhost:5000/api/users').then((response) => {
            console.log(response)    
            setUsers(response.data);
            

            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    setSendError(error.response.data.msg);
                }
            });;

        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, config.jwtSecret);
        setCurrentUser(decoded.user.id);  
             

        axios.get('http://localhost:5000/api/messages/unread').then((response) => {
            console.log(response)    
            setGroups(response.data);
            
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    setSendError(error.response.data.msg);
                }
            });;

        axios.get('http://localhost:5000/api/messages/read').then((response) => {
            console.log(response)    
            setGroupsRead(response.data);
            

            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    setSendError(error.response.data.msg);
                }
            });;
          
        }, []);


        {/* <TaskGroup name={s.name} tasks={s.tasks} id={s._id} key={s._id} setSendError={setSendError} deleteGroup={deleteGroup} setGroups={setGroups} /> */}
    return (
        <div className="chat">
            <div id="groupSection">
                { groups.map((s) => (
                    <ChatGroup group={s} classname={'ChatGroup'} FxObj={FxObj} key={s.id}/>
                ))}
                { groupsRead.map((s) => (
                    <ChatGroup group={s} classname={'ChatGroup Read'} FxObj={FxObj} key={s.id}/>
                ))}

                <AddGroup />
            </div>
            <div id="chatSection">
                <ChatMessages activeMessages={activeMessages} FxObj={FxObj} />
                <AddMessage activeGroup={activeGroup} FxObj={FxObj}   />
            </div>
        </div>
    )
}

export default Main
