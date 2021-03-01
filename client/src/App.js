import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarSide from'./components/layouts/NavbarSide';
import Navbar from'./components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import icon from './img/comCrew.png';
import Notification from'./components/ProfileLinks/Notification';

import './App.css';

const App = () => {
  return (
    <Router>
     <NavbarSide />
    <Switch>
      <Route path='/'/>
    </Switch>
   
    
    <Fragment>
      <Navbar icon={icon} />
      <div className="container">
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/About' component={About} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Profile' component={Profile} />
            <Route exact path='/Notification' component={Notification} />
        </Switch>
      </div>
    </Fragment>
    </Router>
  );
}

export default App;
