import React, {useState} from 'react'

function AddGroup(props) {
    const [newName, SetNewName] = useState("");

    const handleInputChange = (e) => {
        SetNewName(e.target.value);
      };

    const addNewGroup = (name) => {
        props.addGroup(name);
        SetNewName("");
    }

    return (
        <div>
            {/* props.addGroup('haha') */}
            
            <div className="TG_form">
                <input type="text" id="group" name="group" placeholder="Add New Group" value={newName} onChange={handleInputChange}/> 
                <button onClick={() => addNewGroup(newName)}>Add</button>    
            </div>
        </div>
    )
}

export default AddGroup
