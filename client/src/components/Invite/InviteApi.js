import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import Dropdown from 'react-dropdown';
import {Link} from 'react-router-dom';


const InviteApi = () => {
  const [posts, setPosts] = useState([]);

  

  
 
  useEffect(() => {
    axios.get('http://localhost:5000/api/invite').then((response) => {
      setPosts(response.data);
      console.log(response);
    });
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPosts(data);
    //     console.log(data);
    //   });
  }, []);

 

  const removeData = (id) => {
    // const URL = `http://localhost:5000/api/invite/${id}`

    axios.delete(`http://localhost:5000/api/invite/${id}`).then ( () => {
      window.location.reload(false);
})
}


    
  return (
    
    
    <div>
      {posts.map((post,key) => (
        // <Post post={post} key={post.id} />
        <tr key={post.id}>
        {/* <td>{id}</td> */}
       
        <td><Avatar  name={post.email} size="40" round={true} />{post.email} 


</td>
       
        <td className='opration'>
        <button className='btn btn-danger btn-sm' style={{marginLeft: "100px"}} onClick={() => removeData(post._id)}>
Remove From Project
</button>
        </td>
    </tr>


        
      ))}
     
    </div>
    
  );

};





const Post = (props) => {
  return (
      
    <div>
        
       <div id="al">
      {/* <p><Avatar  name={props.post.email} size="40" round={true} />{props.post.email} 
      
     
      </p>  */}
<p>

      {/* <Link to='/InviteApi' id="dropdown">Remove From Project</Link>  */}
      </p>
      {/* <p><select id="dropdown" value="Can edit" >
      <option id="sz" value="Orange">Set as Project Owner</option>
      <option value="Remove">Remove From Project</option>
      <option value="Cherry">Can edit</option>
       </select></p> */}

      </div><br></br>
   
     
    </div>
  );
};
export default InviteApi;
