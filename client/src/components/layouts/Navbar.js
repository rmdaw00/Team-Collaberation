import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



const Navbar = ({title, icon}) => {
    
    
    return (
        
       
        
        <div className=" navbar bg-primary">
          
        
      
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/About'>About</Link>
                </li>
                <li>
                    <Link to='/Register'>Register</Link>
                </li>
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
                <li>
                    <Link to='/Profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/Makeproject'>CreateProject</Link>
                </li>
            </ul>
      
           
        </div>
        
    );
};

Navbar.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Computer Crew',
    //icon: <img src={this.props.icon}/>
    //icon: 'fas fa-id-card-alt'
};

export default Navbar