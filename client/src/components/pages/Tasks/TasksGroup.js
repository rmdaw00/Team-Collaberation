import AddGroup from './sub/AddGroup';
import TaskNav from './sub/TasksNav'
import axios from 'axios';
import React,{ useState, useEffect } from 'react'
import TaskGroup from './sub/TaskGroup';


const TasksGroup =  (props) => {
    
    const [groups, setGroups] = useState([]);
    const [sendError, setSendError] = useState('');


     useEffect( () => {
        axios.get('http://localhost:5000/api/todoGroups').then((response) => {
            setGroups(response.data);
             
            }).catch((error) => {
                if (error.response) {
                    setSendError(error.response.data.msg);
                }
            });;
          
        }, []);


    const addGroup = (name) => {
  
        const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        let data = {name}
        axios.post('http://localhost:5000/api/todoGroups',data, config)
            .then((response) => {
              
                setGroups(groups => [...groups,{
                    _id: response.data._id,
                    id: response.data._id,
                    name: name,
                    tasks: []
                }]) 
                setSendError('')
                
                
            }).catch((error) => {
                if (error)
                    if (error.response) {
                        setSendError(error.response.data.msg);
                    }
            });
            
    }    
    


    const deleteGroup = (id) => {
        
       
        const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        
        
 
        axios.delete(`http://localhost:5000/api/todoGroups/${id}`, config)
            .then((response) => {
                setGroups(groups.filter((t) => t._id !== id))
                setSendError('')
               
                
                
            }).catch((error) => {
              
                if (error)
                    if (error.response) {
                        setSendError(error.response.data.msg);
                    }
                    return
            });
            //setGroups(groups.filter((t) => t._id !== id))
    }

 
    return (

        <div className="tasks">
            {sendError && <span class="sendErrors"> {sendError} </span>}
            <div className="tasksHeader" >
            
                <h1 className="PageHeaderText">Tasks By Group</h1>    
                <TaskNav active="Group"/>
            </div>
           
            { groups.map((s) => (
               <TaskGroup name={s.name} tasks={s.tasks} id={s._id} key={s._id} setSendError={setSendError} deleteGroup={deleteGroup} setGroups={setGroups} />
            ))}
            
            <AddGroup addGroup={addGroup} />

        </div>
    )
}

export default TasksGroup;
