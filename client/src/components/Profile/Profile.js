import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import * as FcIcons from "react-icons/fc";
 import './profile1.css';
 import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        role:'',
        team:'',
        aboutme:'',
       
       
    });
    const [firstnameError,setfirstnameError] = useState('');
    const [lastnameError,setlastnameError] = useState('');
    const [emailError,setemailError] = useState('');
    const [roleError,setroleError] = useState('');
    const [teamError,setteamError] = useState('');
    const [aboutmeError,setaboutmeError] = useState('');
    const{firstname,lastname,email,role,team,aboutme} = formData;
const onChange2 =(e) =>setFormData({...formData,[e.target.name]: e.target.value});

const onSubmit2 = async (e) => {
  e.preventDefault();

  let formValid = true;

  let firstnamePattern = /^[A-Z][a-zA-Z]*$/;
  let emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  //validation on firstname

  if(firstname == ''){
      formValid = false;
      setfirstnameError('Please enter first name')
  }
  else if(!firstname.match(firstnamePattern)){
    formValid = false;
    setfirstnameError('Please enter first name in a valid format');
  }
  else {
    formValid = true;
    setfirstnameError('');  
  }
  //validation on last name
  if(lastname == ''){
    formValid = false;
    setfirstnameError('Please enter last name')
}
else if(!lastname.match(firstnamePattern)){
  formValid = false;
  setlastnameError('Please enter Last name in a valid format');
}
else {
  formValid = true;
  setlastnameError('');  
}
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
  setlastnameError('');  
}
//validation on role 
if(role == ''){
    formValid = false;
    setroleError('Please enter role')
}
else if(!role.match(firstnamePattern)){
  formValid = false;
  setroleError('Please enter role in a valid format');
}
else {
  formValid = true;
  setroleError('');  
}
//validation on team
if(team == ''){
    formValid = false;
    setteamError('Please enter team')
}
else if(!team.match(firstnamePattern)){
  formValid = false;
  setteamError('Please enter team in a valid format');
}
else {
  formValid = true;
  setteamError('');  
}
//validation on about me
if(aboutme == ''){
    formValid = false;
    setaboutmeError('Please enter the field')
}
else if(!aboutme.match(firstnamePattern)){
  formValid = false;
  setaboutmeError('Please enter about me in a valid format');
}
else {
  formValid = true;
  setaboutmeError('');  
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
    firstname : firstname,
    lastname : lastname,
    email : email,
    role : role,
    team : team,
    aboutme : aboutme
  };
  console.log(data);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/profile/',
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
                <span className="text-primary">My Profile Settings</span>
            </h1>
          <div className='profilelinks'>
            <ul  >
                <li><Link to='/Profile'>Profile</Link></li>
                <li><Link to='/Notification'>Notifications</Link></li>
                <li><Link to='/'>Email Forwarding</Link></li>
                <li><Link to='/'>Account</Link></li>
                <li><Link to='/'>Display</Link></li>

            </ul>
            </div>
          
          <p style={{color:'#003699'}}>Your Photo</p>
          <Link to='/'><FcIcons.FcPicture/></Link> 
        <p><Link to='/'>Upload your picture</Link> </p>
       <form onSubmit={(e)=> onSubmit2(e)}>
          
               <p>
       <label  style={{color:'#003699'}} htmlFor="fname">First Name:</label>
                    <input id='fname' type='text'
                     name='firstname' 
                     placeholder ='first Name'
                     value={firstname}
                     onChange={(e)=> onChange2(e)}/> 
                     {firstnameError && <p style={{color: 'red'}}>{firstnameError}</p>}
                       
                     
                     </p>
                     <p>
                    <label id="label" style={{color:'#003699'}} htmlFor="lname">Last Name:</label>
                    <input id='fname' type='text'
                     name='lastname'
                     placeholder ='Last Name'
                     value={lastname}
                     onChange={(e)=> onChange2(e)} />
                     {lastnameError && <p style={{color: 'red'}}>{lastnameError}</p>}
                     </p> 
                   
                     <p>   
                    <label id="label" style={{color:'#003699'}} htmlFor="email">Email:</label>
                    <input id='fname' type='text'
                     name='email' 
                    placeholder ='Email'
                    value={email}
                    onChange={(e)=> onChange2(e)}/> 
                    {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                    </p>
                    <p>
                    <label id="label" style={{color:'#003699'}} htmlFor="role">Role:</label>
                    <input id='fname' type='text'
                     name='role'
                     placeholder ='Role'
                     value={role}
                     onChange={(e)=> onChange2(e)} /> 
                     {roleError && <p style={{color: 'red'}}>{roleError}</p>}
                     </p>
                    
                   <p>

                    <label id="label" style={{color:'#003699'}} htmlFor="depart">Team:</label>
                    <input id='fname' type='text'
                     name='team'
                     placeholder ='TeamName'
                     value={team}
                     onChange={(e)=> onChange2(e)} /> 
                     {teamError && <p style={{color: 'red'}}>{teamError}</p>}
                     </p>
                     <p>
                    <label id="label" style={{color:'#003699'}} htmlFor="about">About me:</label>
                    <input id='fname' type='text'
                     name='aboutme' 
                     placeholder ='About me'
                     value={aboutme}
                     onChange={(e)=> onChange2(e)}/> 
                     {aboutmeError && <p style={{color: 'red'}}>{aboutmeError}</p>}
                     </p>
                  
                    <input type="submit" value="Save Changes" className="btn btn-primary btn-block"/>
                   
       </form>

        
        </div>
    )
}

export default Profile