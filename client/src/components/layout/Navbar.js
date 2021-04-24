import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import EventContext from '../../context/newEvent/eventContext';


const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const eventContext = useContext(EventContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearContacts } = contactContext;
  const { clearEvents } = eventContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearContacts();
    //clearEvents();
  };

  const authLinks = ( //registered
   
    <Fragment>

      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li>
        <Link to='/calendar'>Calendar</Link>
         <Link to='/Profile'>Profile</Link>
        
         <Link to='/Makeproject'>CreateProject</Link>
         {/* <Link to='/NavbarSide'></Link>
         <Link to='/SidebarData'></Link> */}
                
        {/* <Link to='/calendar'>Calendar</Link>  */}
      </li>
    </Fragment>
  );

  const guestLinks = ( //for everyone not registered
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'COMPUTER CREW',
  //icon: 'fas fa-id-card-alt'
};

export default Navbar;
