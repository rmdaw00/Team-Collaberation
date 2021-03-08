import React, {useState} from 'react'

function AddTask(props) {
    const [newName, SetNewName] = useState("");

    const handleInputChange = (e) => {
        SetNewName(e.target.value);
      };

    const addNewTask = (name) => {
        props.addTask(name);
        SetNewName("");
    }

    return (
        <div>    
            <div className="TG_form">
                <input type="text" id="group" name="group" placeholder="Add New Task" value={newName} onChange={handleInputChange}/> 
                <button onClick={() => addNewTask(newName)}>Add</button>    
            </div>
        </div>
    )
}

export default AddTask
