import React, { useState } from "react";
import axios from 'axios';
import AllNotes from './AllNotes';
import { Link } from 'react-router-dom';



const NewNote = () => {
  const [formData, setFormData] = useState({
   title: '',
   description: '',
  });

  const [titleError, setTitleError] = useState('');
  const [desError, setDesError] = useState('');

  const { title,description } = formData;
  const onChange2 = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit2 = async (e) => {
    e.preventDefault();


    let formValid= true;

    let titlePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(title == ''){
      formValid = false;
      setTitleError('Please enter the Title');
    
    }else if (!title.match(titlePattern)){
      formValid = false;
      setTitleError('Enter in valid format');
    }else{
      formValid = true;
      setTitleError('');
    }

    let DesPattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(description == ''){
      formValid = false;
      setDesError('Please enter the Content');
    
    }else if (!description.match(DesPattern)){
      formValid = false;
      setDesError('Enter content in valid format');
    }else{
      formValid = true;
      setDesError('');
    }

     if (formValid){
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    
    let data = {
      title : title,
      description : description,
    };
    console.log(data);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/notes/',
        data,
        config
      );
      console.log(response.data);
    } catch (e) {
      console.log('error ', e);
    }
  }
  };

  return (
    <div className="container">
      <h1 className="heading">New Note</h1>
      <div className="newnote-page ">
        <form onSubmit={(e)=> onSubmit2(e)}>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type='text'
              name='title'
               placeholder='Note Title' 
               value={title}
               onChange={(e) => onChange2(e)}
               />
               {titleError && <p style={{color: 'red'}}>{titleError}</p>}
               {desError && <p style={{color: 'red'}}>{desError}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Note Content</label>
            <div className="control">
              <textarea className="textarea" rows="10" cols="40" 
              name='description'
              placeholder="Note Content here"
              value={description}
              onChange={(e) => onChange2(e)}
              ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link">Add Note</button>
              
              &nbsp;&nbsp;&nbsp;
        <Link to='/AllNotes'>View Notes</Link>
        
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewNote;