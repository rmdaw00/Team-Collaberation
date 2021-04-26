import React from 'react';
import TaskNav from './sub/TasksNav'
import Taskbox from './sub/Taskbox';
import axios from 'axios';
import { useState, useEffect } from 'react'

export default function TasksDate() {

    const [tasks, setTasks] = useState([]);

    const token = localStorage.getItem('token')
    const [sendError, setSendError] = useState('');

    let config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        }
      };
     useEffect( () => {
        axios.get('http://localhost:5000/api/todoTasks',config).then((response) => {
            setTasks(response.data);
            
          }).catch((error) => {
            if (error.response) {
                setSendError(error.response.data.msg);
                
              }
        });
          
        }, []);
        let i=0;
       
    return (
        <div className="tasks">
            {sendError && <span class="sendErrors"> {sendError} </span>}
            <div className="tasksHeader" >
                <h1 className="PageHeaderText">Tasks By Date</h1>
                <TaskNav active="Date"/>
            </div>
            { tasks.map((t) => {
                if (t)
                    return  <Taskbox task={t} id={i++} setSendError={setSendError} key={i}/> 
            })}
        </div>
    )
}
