import React, {useState} from 'react'
import TaskDetails from './TaskDetails'
  
  const Taskbox = (props) => {
    const [checked, setTaskState] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [taskName, setTaskName] = useState(props.task.name);
    const [urgency, setUrgency] = useState(props.task.urgency);
    let initialColor= "";

    const setTaskColor = (newUrgency) => {
      switch(newUrgency) {
        case "high":
          initialColor = "1em solid red";
          break;
        case "medium":
          initialColor = "1em solid orange";
          break;
        case "low":
          initialColor = "1em solid blue";
          break;
        default:
          initialColor = "1em solid var(--light-color)";
          
      }
      return initialColor;
  }
    const [urgencyColor, setUrgencyColor] = useState(setTaskColor(urgency));

    console.log(props.task)
    
  
    const handleDoneChange = (e) => {
      setTaskState(e.target.checked);
      toggleCheckbox(e.target.id);
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
      let element = document.querySelector("label[for="+idName+"]");
  
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
    }

    

    const handleTaskChange = (e) => {
      setTaskName(e.target.value);
    }
    
      let idName= props.category+props.id;
      
    
      

      return (
        <div className='task hoverable' onClick={toggleExpansion} style={urgencyStyle}>
              <input type="checkbox" id={idName} checked={checked} onChange={handleDoneChange} />
              <label htmlFor={idName} class="taskLabel">{taskName}</label>      
              <input class="editName" value={taskName} onChange={handleTaskChange}></input>     
              <i class="fas fa-chevron-down"></i>
              <TaskDetails task={props.task} handleUrgencyChange={handleUrgencyChange} idName={idName}/>
        </div>
      );
    
      
  
  
  }
  

  export default Taskbox;