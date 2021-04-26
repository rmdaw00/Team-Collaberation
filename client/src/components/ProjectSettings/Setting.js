import React, { useState } from "react";
import axios from 'axios';

import { Link } from 'react-router-dom';



const Setting = () => {
  const [formData, setFormData] = useState({
   title: '',
   description: '',
  });

  const { name,key,category,projectlead } = formData;
  const onChange2 = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit2 = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    
    let data = {
      name : name,
      key : key,
      category : category,
      projectlead : projectlead,
    };
    console.log(data);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/setting/',
        data,
        config
      );
      console.log(response.data);
    } catch (e) {
      console.log('error ', e);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Project Setting</h1>
      <div className="project-setting ">
        <form onSubmit={(e)=> onSubmit2(e)}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type='text'
              name='name'
               placeholder='project name' 
               value={name}
               onChange={(e) => onChange2(e)}
               />
            </div>
          </div>
          <div className="field">
            <label className="label">Key</label>
            <div className="control">
            <input className="input" type='text'
              name='key'
               placeholder='key' 
               value={key}
               onChange={(e) => onChange2(e)}
               />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
            <input className="input" type='text'
              name='category'
               placeholder='category' 
               value={category}
               onChange={(e) => onChange2(e)}
               />
            </div>
            <div className="field">
            <label className="label">projectlead</label>
            <div className="control">
            <input className="input" type='text'
              name='projectlead'
               placeholder='lead' 
               value={projectlead}
               onChange={(e) => onChange2(e)}
               />
            </div>
          <div class="field">
            <div class="control">
              <button class="button is-link">Save</button>
              
             
      
        
              
            </div>
          </div>
      
         
      </div>
    
      </div>
      </form>
      </div>
      </div>
    
  );
}
export default Setting;