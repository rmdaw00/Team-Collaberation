import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import NavbarSide from'./components/layout/NavbarSide';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components//layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import ReactCalendar from './components/datePicker/Calendar';
import Profile from './components/Profile/Profile';
import Notification from'./components/ProfileLinks/Notification';
import Notes from'./components/Notes/NewNote';
import MakeProject from './components/MakeProject/MakeProject';
import AssignTask from './components/MakeProject/AssignTask';
import Cal from './components/MakeProject/Cal';
import Schedule from './components/MakeProject/Schedule';
import TasksGroup from './components/pages/Tasks/TasksDate';
import TasksDate from './components/pages/Tasks/TasksGroup';

import ContactState from './context/contact/ContactState';
import EventState from './context/newEvent/EventState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

const App = () => {

  return (
    <AuthState>
      <EventState>
      <ContactState>
        <AlertState>
          <Router>
          {/* <NavbarSide /> */}
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/calendar' component={ReactCalendar} />
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
            <Route exact path='/Schedule' component={Schedule} />
                  {/* <ScheduleComponent currentView="Month" >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                  </ScheduleComponent> */}
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
      </EventState>
    </AuthState>
  );
};

export default App;