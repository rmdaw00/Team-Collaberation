import React from "react";
const EditNote = () => {


  const [notes,updateNotes] = React.useState([]);
  React.useEffect(function effectFunction() {
    async function fetchNotes() {
        const response = await fetch('http://localhost:5000/api/notes');
        const json = await response.json();
        updateNotes(json.data);
    }
    fetchNotes();
}, []);

return (
<ul>
{posts.map((note, key) => (
        // <Post post={post} key={post.id} />
       
         <tr key={key} >
        <td>{note.title}</td>
        <td>{note.description}</td>
        <td>
        <button  className='btn btn-dark btn-sm'>
       
            Edit
            </button>
            </td>
            <td> 
           
          </td> 
          </tr>  
       
  
      ))}
</ul>
    
//   return (
//     <div className="container">
//       <h1 className="heading">Edit Note</h1>
// ​
//       <div className="newnote-page ">
//         <form>
//           <div className="field">
//             <label className="label">Note Title</label>
//             <div className="control">
//               <input className="input" type="text" placeholder="Note Title" />
//             </div>
//           </div>
// ​
//           <div class="field">
//             <label class="label">Note Content</label>
//             <div class="control">
//               <textarea
//                 class="textarea"
//                 rows="10"
//                 cols="40"
//                 placeholder="Note Content here..."
//               ></textarea>
//             </div>
//           </div>
// ​
//           <div class="field">
//             <div class="control">
//               <button class="button is-link">Submit</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
  );
}
export default EditNote;