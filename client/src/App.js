import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarSide from'./components/layouts/NavbarSide';
import Navbar from'./components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import TasksGroup from './components/pages/Tasks/TasksDate';
import TasksDate from './components/pages/Tasks/TasksGroup';
import icon from './img/comCrew.png';
import Notification from'./components/ProfileLinks/Notification';
import Notes from'./components/Notes/NewNote';
import MakeProject from './components/MakeProject/MakeProject';
import AssignTask from './components/MakeProject/AssignTask';
import Cal from './components/MakeProject/Cal';
import Schedule from './components/MakeProject/Schedule';
import CreateProject from './components/MakeProject/CreateProject';

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
            <Route exact path='/Notes' component={Notes} />
            <Route exact path='/Tasks' component={TasksGroup} />
            <Route exact path='/Tasks/Date' component={TasksDate} />
            <Route exact path='/Tasks/Group' component={TasksGroup} />
            <Route exact path='/Makeproject' component={MakeProject} />
            
            <Route exact path='/AssignTask' component={AssignTask} />
            <Route exact path='/Cal' component={Cal} />
            <Route exact path='/Schedule' component={Schedule} />
            
        </Switch>
      </div>
    </Fragment>
    </Router>
  );
}

export default App;
