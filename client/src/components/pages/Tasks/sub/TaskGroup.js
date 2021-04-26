import React, {useState} from 'react';
import AddTask from './AddTask'
import Taskbox from './Taskbox';
import axios from 'axios';
var i = 0;
const TaskGroup = (props) => {
    const [catName, setCatName] = useState(props.name);
    const [catEditState, setcatEditState] = useState(false);
    const [tasks, setTasks] = useState(props.tasks)

    const handleDelete = () => {
      
      props.deleteGroup(props.id)
    }

    const handleCategoryRename = (e) => {
        setCatName(e.target.value);

    }

    const addTask = (name) => {

      const token = localStorage.getItem('token')

        let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            }
          };
        let data = {"todoGroupID": props.id,name}

      axios.post('http://localhost:5000/api/todoTasks',data, config)
        .then((response) => {
          setTasks(tasks => [...tasks,response.data.tasks[response.data.tasks.length-1]]) 
          
      }).catch((error) => {
          if (error.response) {
            if (error.response.data.msg){
              props.setSendError('Task Adding Error: ' + error.response.data.msg);
              
            } else if(error.response.data) 
              if(error.response.data.errors)
                if(error.response.data.errors[0])
                  if(error.response.data.errors[0].msg)
                    props.setSendError('Task Adding Error:' + error.response.data.errors[0].msg);
       
            } 
           
      });
    }   


    const toggleCatEdit = (e, force) => {
                
        let catInput = e.target.parentElement.querySelector(".categoryEdit");
        let catLabel = e.target.parentElement.querySelector(".category-name");
        let catButtonClose = e.target.parentElement.querySelector(".fa-trash");

        let elements = [catInput,catLabel,catButtonClose]
        
  
        setcatEditState(!catEditState | force)
        elements.forEach(element => {
          if (!catEditState) {
            element.classList.add("expanded");
          } else {
            element.classList.remove("expanded");
          }
          
        })

        if (catEditState) {
          const token = localStorage.getItem('token')

            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                }
              };
            let data = {"todoGroupID": props.id, "name": catName}

              axios.put('http://localhost:5000/api/todoGroups',data, config)
                .then((response) => {
                  setTasks(tasks => [...tasks,response.data.tasks[response.data.tasks.length-1]]) 
                  
              }).catch((error) => {
                  if (error.response) {
                    if (error.response.data.msg){
                      props.setSendError('Task Adding Error: ' + error.response.data.msg);
                    } else if(error.response.data) 
                      if(error.response.data.errors)
                        if(error.response.data.errors[0])
                          if(error.response.data.errors[0].msg)
                            props.setSendError('Task Adding Error:' + error.response.data.errors[0].msg);
              
                    } 
                  
              });
        }
    }



  
    
    return (
        <div className='category'>
              <div className="formHeader hoverable" onDoubleClick={toggleCatEdit}> 
                <span className='category-name'>{catName}</span>
                <input className='categoryEdit' type="text" value={catName} onChange={handleCategoryRename} />
                <i id={props.id} class="fa fa-trash appearable" onClick={handleDelete}></i> 
                <i id={props.id} class="fas fa-pen appearable" onClick={toggleCatEdit}></i> 
              </div>
              {
              tasks.map((t) => {
                if (t)
                  return  <Taskbox category={props.name} task={t} groupID= {props.id} id={i++} setSendError={props.setSendError} key={i}/> 
              })}
              <AddTask addTask={addTask}/>
        </div>
    )
}



export default TaskGroup;
