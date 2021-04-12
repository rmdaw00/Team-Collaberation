import React from "react";
// import EditIcon from '@material-ui/icons/Edit';
import * as AiIcons from "react-icons/ai";

function Project (){

  return (
  <> 
     <div className="project">
             <h1> title</h1>
             <br/>
             <p>this is the content</p>
             <button  className="btn">
              {/* <EditIcon className="deleteicon"/> */}
              <AiIcons.AiFillEdit/>
             
             </button>

     </div>

     <div className="project">
             <h1> title</h1>
             <br/>
             <p>this is the content</p>
             <button className="btn">
              {/* <EditIcon className="deleteicon"/> */}
              <AiIcons.AiFillEdit/>
             
             </button>

     </div>
     <div className="project">
             <h1> title</h1>
             <br/>
             <p>this is the content</p>
             <button className="btn">
              {/* <EditIcon className="deleteicon"/> */}
              <AiIcons.AiFillEdit/>
             
             </button>

     </div>
  
     <div className="project">
             <h1> title</h1>
             <br/>
             <p>this is the content</p>
             <button className="btn">
              {/* <EditIcon className="deleteicon"/> */}
              <AiIcons.AiFillEdit/>
             
             </button>

     </div>
  
  
  
  </>


  );

};

export default Project;