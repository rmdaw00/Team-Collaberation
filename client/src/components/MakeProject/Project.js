import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MakeProject.css';
//import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import * as AiIcons from "react-icons/ai";
function ShowProjects() {
  
 
  
 
  const [projectsList, setProjectsList] = useState([])

  const deleteProject = (id) => {
          axios.delete(`http://localhost:5000/api/projects/${id}`).then ( () => {
                  window.location.reload(false);
          })
  }
  

  useEffect(() => {
          axios.get('http://localhost:5000/api/projects').then( (allProjects) => {
                  setProjectsList(allProjects.data);
  })
  
}, [])
  return (
    <div id="project" className="col-md-8">
          <h2>All Projects</h2>
    <table  className="table table-bordered">
      <thead>
        <tr>
          
            <th> Title </th>
            <th> Description </th> 
            <th> Action</th>
            
          </tr>
        </thead>
        <tbody>
          {projectsList.map((project, key) => (
            <tr key={key}>
              <td>
                {project.name}
              </td>
              <td> {project.description}</td>
              <td>
              <button aria-label="delete"  onClick={() => deleteProject(project._id)} >
                 
                   <AiIcons.AiFillDelete/>
              </button>
             

    
              
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}

export default ShowProjects;