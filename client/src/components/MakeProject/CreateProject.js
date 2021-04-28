import React,{useState} from 'react';
import axios from 'axios';


function Create() {
  
  

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  const createProject = () => {
      axios.post('http://localhost:5000/api/projects',{name:title, description:description })
  };

  return (

    <div className="row text-center" >
    <div className="col-md-4">
    <h2> Create Project</h2>
    <form >
      
    <input required onChange = {(event)=> {setTitle(event.target.value)}} name='name' style={{marginTop:'50px'}}placeholder="Title" className="form-control"/>
                        <input required onChange = {(event)=> {setDescription(event.target.value)}} name='description' style={{marginTop:'30px'}}placeholder="Description" className="form-control"/>
                        <button style={{marginTop:'10px', width:'500px'}} onClick= {createProject} className="btn btn-primary">Create</button>
       
    </form>
    </div>
    </div>
  );
}

export default Create;
