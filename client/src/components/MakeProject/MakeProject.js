import React from 'react';
import CreateProject from './CreateProject'
import Project from './Project'
import {Link} from 'react-router-dom';
const MakeProject = () => {


  return (
  <div> 
  
          <h1>
              <span className="text-primary">Create new project</span>
          </h1>
          <div className='profilelinks'>
            <ul  >
                <li><Link to='/MakeProject'>CreateProject</Link></li>
                <li><Link to='/AssignTask'>AssignTask</Link></li>
            </ul>
         <CreateProject/>
         <Project/>
            </div>

  
 

  
  </div>


  );

};

export default MakeProject;