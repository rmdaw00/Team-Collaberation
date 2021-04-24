import React,{useState} from 'react'
import {Link} from 'react-router-dom';

 import './invite.css';
 import axios from 'axios';
 import InviteApi from './InviteApi';

const InviteTeams = () => {
    const [formData, setFormData] = useState({
       
        email:'',
        project:'',
       
       
       
    });
 
    const [emailError,setemailError] = useState('');
    const [projectError,setprojectError] = useState('');
    
    const{email,project} = formData;
const onChange2 =(e) =>setFormData({...formData,[e.target.name]: e.target.value});

const onSubmit2 = async (e) => {
  e.preventDefault();

  let formValid = true;

  let firstnamePattern = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
  let emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  //validation on firstname

  
//validation on email
if(email == ''){
    formValid = false;
    setemailError('Please enter email')
}
else if(!email.match(emailPattern)){
  formValid = false;
  setemailError('Please enter email in a valid format');
}
else {
  formValid = true;
  setemailError('');  
}
//validation on role 
if(project == ''){
    formValid = false;
    setprojectError('Please enter Project ')
}
else if(!project.match(firstnamePattern)){
  formValid = false;
  setprojectError('Please enter Project  in a valid format');
}
else {
  formValid = true;
  setprojectError('');  
}



  if(formValid){

  
  let token = localStorage.getItem('token');
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  let data = {
    
    email : email,
    project : project,
   
  };
  console.log(data);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/invite/',
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
        <div className='profile-container'>
            <h1>
                <span className="text-primary">Invite People</span>
            </h1>
            <h4>Team Members</h4>
            <InviteApi />
            {/* <div className='profilelinks'>
            <ul  >
                <li><Link to='/InviteApi'>Project Members</Link></li>
            </ul>
            </div> */}
       
          
          
       <form onSubmit={(e)=> onSubmit2(e)}>
          <p>Your teammates will get an email that gives them access to your team.</p>
              
                   
                     <p>   
                    <label id="label" style={{color:'#003699'}} htmlFor="email">Email addresses:</label>
                    <input id='fname' type='text'
                     name='email' 
                    placeholder ='name@gmail.com..'
                    value={email}
                    onChange={(e)=> onChange2(e)}/> 
                    {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                    </p>
                    <p>
                    <label id="label" style={{color:'#003699'}} htmlFor="role">Choose a starting Project:</label>
                    <input id='fname' type='text'
                     name='project'
                     placeholder ='Start typing to add a project'
                     value={project}
                     onChange={(e)=> onChange2(e)} /> 
                     {projectError && <p style={{color: 'red'}}>{projectError}</p>}
                     </p>
                    
                   <p>

                    
                  
                    <input type="submit" value="Send" className="btn btn-primary btn-block"/>
                    </p>
                   
       </form>

        
        </div>
    )
}

export default InviteTeams