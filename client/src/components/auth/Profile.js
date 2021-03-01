import React from 'react'
import {Link} from 'react-router-dom';
import * as FcIcons from "react-icons/fc";

const Profile = () => {
    

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
       <form>
           <div className='Name'>
       <label style={{color:'#003699'}} htmlFor="fname">First Name:</label>
                    <input  id='fname' type='text' name='fname' /> 
                    <label style={{color:'#003699'}} htmlFor="lname">Last Name:</label>
                    <input type='text' name='lname' /> 
                    </div>
                    <div className='Name'>     
                    <label style={{color:'#003699'}} htmlFor="email">Email:</label>
                    <input type='text' name='email' /> 
                    <label style={{color:'#003699'}} htmlFor="role">Role:</label>
                    <input type='text' name='role' /> 
                    </div> 
                    <div className='Name'>

                    <label style={{color:'#003699'}} htmlFor="depart">Team:</label>
                    <input type='text' name='depart' /> 
                    <label style={{color:'#003699'}} htmlFor="about">About me:</label>
                    <input type='text' name='about' /> 
                    </div>
                    <input type="submit" value="Save Changes" className="btn btn-primary btn-block"/>
                   
       </form>

        
        </div>
    )
}

export default Profile