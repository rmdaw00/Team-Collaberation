import AddGroup from './sub/AddGroup';
import TaskNav from './sub/TasksNav'
import axios from 'axios';
import React,{ useState, useEffect } from 'react'
import TaskGroup from './sub/TaskGroup';


const TasksGroup =  (props) => {
    
    const [groups, setGroups] = useState([]);


     useEffect( () => {
        axios.get('http://localhost:3000/tasks.json').then((response) => {
            setGroups(response.data);
            // console.log(response);
          });
          
        }, []);

  

    const addGroup = (name) => {
        setGroups(groups => [...groups,{
            id: groups.length+1,
            name: name,
            tasks: []
        }]) 
    }    

    const addTask = (id, name) => {
        console.log(groups.find((t) => t.id === id))

        // setTasks(tasks => [...tasks,{
        //     id: 1,
        //     name: name,
        //     dateDue:"",
        //     assigned: "",
        //     urgency:"none",
        //     status:false
        // }])


    }

    const deleteGroup = (id) => {
        console.log(id)
        setGroups(groups.filter((t) => t.id !== id))
    }

    return (

        <div className="tasks">
            <div className="tasksHeader" >
                <h1 className="PageHeaderText">Tasks By Group</h1>    
                <TaskNav active="Group"/>
            </div>
           
            { groups.map((s) => (
               <TaskGroup name={s.name} tasks={s.tasks} id={s.id} key={s.id} addTask={addTask} deleteGroup={deleteGroup} />
            ))}
            
            <AddGroup addGroup={addGroup} />

        </div>
    )
}

export default TasksGroup;
