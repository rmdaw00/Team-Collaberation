import React, {useState} from 'react';
import AddTask from './AddTask'
import Taskbox from './Taskbox';

const TaskGroup = (props) => {
    const [catName, setCatName] = useState(props.name);
    const [catEditState, setcatEditState] = useState(false);
    const [tasks, setTasks] = useState(props.tasks)

    const handleDelete = (e) => {
      props.deleteGroup(props.key)
    }

    const handleCategoryRename = (e) => {
        setCatName(e.target.value);
    }

    const addTask = (name) => {
        props.addTask(props.key, name)

        setTasks(tasks => [...tasks,{
            id: 1,
            name: name,
            dateDue:"",
            assigned: "",
            urgency:"none",
            status:false
        }]) 
        
    }   


    const toggleCatEdit = (e, force) => {
        console.log(e)
        
        let catInput = e.target.parentElement.querySelector(".categoryEdit");
        let catLabel = e.target.parentElement.querySelector(".category-name");
        let catButtonClose = e.target.parentElement.querySelector(".fa-close");

        let elements = [catInput,catLabel,catButtonClose]
        console.log(catEditState)
  
        setcatEditState(!catEditState | force)
        elements.forEach(element => {
          if (!catEditState) {
            element.classList.add("expanded");
          } else {
            element.classList.remove("expanded");
          }
        })
    }



    let i = 0;
    return (
        <div className='category'>
              <div className="formHeader hoverable" onDoubleClick={toggleCatEdit}> 
                <span className='category-name'>{catName}</span>
                <input className='categoryEdit' type="text" value={catName} onChange={handleCategoryRename} />
                <i id={props.id} class="fa fa-close appearable" onClick={handleDelete}></i> 
                <i id={props.id} class="fas fa-pen appearable" onClick={toggleCatEdit}></i> 
              </div>
              {
              tasks.map((t) => (
                <Taskbox category={props.name} task={t} id={i++} key={i}/> 
              ))}
              <AddTask addTask={addTask}/>
        </div>
    )
}



export default TaskGroup;
