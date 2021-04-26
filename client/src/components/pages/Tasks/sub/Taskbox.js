import React, {useState} from 'react'
import TaskDetails from './TaskDetails'
import axios from 'axios';
  
  const Taskbox = (props) => {
    const [checked, setTaskState] = useState(props.task.status);
    const [expanded, setExpanded] = useState(false);
    const [taskName, setTaskName] = useState(props.task.name);
    const [urgency, setUrgency] = useState(props.task.urgency);
    const [dueDate, setDueDate] = useState(props.task.dueDate);
    let initialColor= "";
    

    const setTaskColor = (newUrgency) => {
      switch(newUrgency) {
        case "High":
          initialColor = "1em solid red";
          break;
        case "Medium":
          initialColor = "1em solid orange";
          break;
        case "Low":
          initialColor = "1em solid blue";
          break;
        default:
          initialColor = "1em solid var(--light-color)";
          
      }
      return initialColor;
  }
    const [urgencyColor, setUrgencyColor] = useState(setTaskColor(urgency));
    
  
    const handleDoneChange = (e) => {
      setTaskState(e.target.checked);
      toggleCheckbox(e.target.id);

      //send status to server
      if (expanded){
        if(!props.groupID) {
          props.setSendError('Editing only allowed from groups sections')
          return;
        }

        const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        let data = {
          "todoGroupID": props.groupID,
          "todoTaskID" : props.task._id,
          "name":taskName,
          "status":checked,
          "urgency":urgency,
          "assignedUser":'',
          "dueDate":dueDate
      }

      axios.put('http://localhost:5000/api/todoTasks',data, config)
        .then((response) => {
          //setTasks(tasks => [...tasks,response.data.tasks[response.data.tasks.length-1]]) 
          props.reload()
          props.setSendError('')

      }).catch((error) => {
          if (error.response) {
            if (error.response.data.msg){
              props.setSendError('Task Editing Error: ' + error.response.data.msg);
              
            } else if(error.response.data) 
              if(error.response.data.errors)
                if(error.response.data.errors[0])
                  if(error.response.data.errors[0].msg)
                    props.setSendError('Task Editing Error:' + error.response.data.errors[0].msg);
       
            } else {
              if (error.response)
                if(error.response.status)
                  props.setSendError('Task Editing Error:' + error.response.status)
            }
           
      });
      }
    }
    
    
    const handleDateChange = (e) => {
      setDueDate(e);
    }

    const handleUrgencyChange = (newUrgency) => {
      setUrgency(newUrgency); 
      setUrgencyColor(setTaskColor(newUrgency));
    }
    

    
    const urgencyStyle = {
      borderLeft: urgencyColor
    }

    //this does the strikethough effect on the label
    

    const toggleCheckbox = (idName) => {
      let element = document.querySelector("label[for='"+idName+"']");
  
      if (checked === false) {
        element.classList.add("checked");
      } else {
        element.classList.remove("checked");
      }
    }
    const toggleExpansion = (e) => {
      if (e.target.className!=="task hoverable") return
      let chevron = e.target.querySelector(".task .fa-chevron-down");
      let details = e.target.querySelector(".task .taskDetails");
      let editName = e.target.querySelector(".task .editName");
      let taskLabel = e.target.querySelector(".task .taskLabel");

      let elements = [chevron,details,editName,taskLabel]

      setExpanded(!expanded)
      elements.forEach(element => {
        if (!expanded) {
          element.classList.add("expanded");
        } else {
          element.classList.remove("expanded");
        }
      });

      if (expanded){
        if(!props.groupID) {
          props.setSendError('Editing only allowed from groups sections')
          return;
        }

        const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        let data = {
          "todoGroupID": props.groupID,
          "todoTaskID" : props.task._id,
          "name":taskName,
          "status":checked,
          "urgency":urgency,
          "assignedUser":'',
          "dueDate":dueDate
      }

      axios.put('http://localhost:5000/api/todoTasks',data, config)
        .then((response) => {
          //setTasks(tasks => [...tasks,response.data.tasks[response.data.tasks.length-1]]) 
         
          props.setSendError('')

      }).catch((error) => {
          if (error.response) {
            if (error.response.data.msg){
              props.setSendError('Task Editing Error: ' + error.response.data.msg);
              
            } else if(error.response.data) 
              if(error.response.data.errors)
                if(error.response.data.errors[0])
                  if(error.response.data.errors[0].msg)
                    props.setSendError('Task Editing Error:' + error.response.data.errors[0].msg);
       
            } else {
              if (error.response)
                if(error.response.status)
                  props.setSendError('Task Editing Error:' + error.response.status)
            }
           
      });
      }
    }

    

    const handleTaskChange = (e) => {
      setTaskName(e.target.value);
    }
    
      let idName= props.task._id
      
    
       
      const tasklabelclassname = checked?"taskLabel checked":"taskLabel";
      return (
        <div className='task hoverable' onClick={toggleExpansion} style={urgencyStyle}>
              <input type="checkbox" id={idName} checked={checked} onChange={handleDoneChange} />
              <label htmlFor={idName} class={tasklabelclassname}>{taskName}</label>      
              <input class="editName" value={taskName} onChange={handleTaskChange}></input>     
              <i class="fas fa-chevron-down"></i>
              <TaskDetails task={props.task} handleUrgencyChange={handleUrgencyChange} handleDateChange={handleDateChange} idName={idName}/>
        </div>
      );
    
      
  
  
  }
  

  export default Taskbox;