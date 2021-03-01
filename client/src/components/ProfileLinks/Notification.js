import React from 'react'
import {Link} from 'react-router-dom';


const Notification = () => {
    

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
          <h1 style={{color:'#003699'}}>Schedule</h1>
          <p style={{color:'#003699'}}>Email notifications </p>

          <form>
          <label style={{color:'#003699'}} htmlFor="email">Preferred Email:</label>
                    <input  id='email' type='text' name='email' /> 
          </form>
          

        
        </div>
    )
}

export default Notification