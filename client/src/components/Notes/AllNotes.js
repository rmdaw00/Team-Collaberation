import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AllNotes = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/notes`).then((response) => {
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
  

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`).then ( () => {
            window.location.reload(false);
    })
}
const EditNote = (id) => {
  axios.put(`http://localhost:5000/api/notes/${id}`).then ( () => {

  
         
  })
}




  
  return (
    <div>
      {posts.map((note, key) => (
        // <Post post={post} key={post.id} />
       
         <tr key={key} >
        <td>{note.title}</td>
        <td>{note.description}</td>
        <td>
        <button  onClick={() => EditNote(note._id)} className='btn btn-dark btn-sm'>
       
            Edit
            </button >
            </td>
            <td> 
            <button  onClick={() => deleteNote(note._id)}  className='btn btn-danger btn-sm' >
            Delete
          </button> 
          </td> 
          </tr>  
       
  
      ))}
    </div>
  );
};

// const Post = (props) => {
//   return (
//    <div >  
//       <h4>{props.post.title}</h4>
//       <p>{props.post.description}</p>
//       <button  className='btn btn-dark btn-sm'>
     
//           Edit
//           </button>  
//           <button  onClick={() => deleteNote(note._id)}  className='btn btn-danger btn-sm' >
//           Delete
//         </button>   
//       </div>

//   );
// };
export default AllNotes;
