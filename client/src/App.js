import React, { useState,useEffect,Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

 import NavbarSide from'./components/layout/NavbarSide';

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
import TasksGroup from './components/pages/Tasks/TasksGroup';
import TasksDate from './components/pages/Tasks/TasksDate';
import Report from './components/pages/Report/Report';
import Messages from './components/pages/messages/MainChat';

import AllNotes from './components/Notes/AllNotes';
import Settings from './components/ProjectSettings/Setting';

import Invite from './components/Invite/InviteTeams';
import InviteApi from './components/Invite/InviteApi';

import Announcementdisplay from './components/Announcements/Announcementdisplay';

import ContactState from './context/contact/ContactState';
import EventState from './context/newEvent/EventState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
import './switcher.scss';
// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

function App()  {

  //state
  const [colorTheme, setColorTheme] = useState('theme-white');

  //effect
  useEffect(()=>{
//check for selected theme color/// local storage value
    const currentThemeColor = localStorage.getItem('theme-color');
    //if found set selected theme value in state
    if (currentThemeColor){
      setColorTheme(currentThemeColor);
    }
  }, []);
  //set theme
  const handleClick = (theme) =>{
    setColorTheme(theme);
    localStorage.setItem('theme-color', theme)
  }

  return (
   
    <AuthState>
      <EventState>
      <ContactState>
        <AlertState>
          <Router>

          {<NavbarSide /> }


            <Fragment>
              <Navbar />
              <div className={`App ${colorTheme}`}>
                <div className='theme-options'>
                  <div id='theme-white' onClick={() =>handleClick('theme-white')} className="active"/>
                  <div id='theme-blue' onClick={() =>handleClick('theme-blue')} className="active" />
                    <div id='theme-orange' onClick={() =>handleClick('theme-orange')} className="active"/>
                      <div id='theme-purple' onClick={() =>handleClick('theme-purple')} className="active" />
                        <div id='theme-green' onClick={() =>handleClick('theme-green')} className="active"/>
                          <div id='theme-black' onClick={() =>handleClick('theme-black')} className="active"/>

                          </div>
]
              
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/calendar' component={ReactCalendar} />
                  <PrivateRoute exact path='/Profile' component={Profile} />


            <Route exact path='/Notification' component={Notification} />
            <Route exact path='/Notes' component={Notes} />
            <Route exact path='/Setting' component={Settings} />
            <Route exact path='/Tasks' component={TasksGroup} />
            <Route exact path='/Tasks/Date' component={TasksDate} />
            <Route exact path='/Tasks/Group' component={TasksGroup} />
            <Route exact path='/Report' component={Report} />
            <Route exact path='/Messages' component={Messages} />
            <PrivateRoute exact path='/Makeproject' component={MakeProject} />
            <Route exact path='/announcements' component={Announcementdisplay} />
            

            
              <Route exact path='/AllNotes' component={AllNotes} />

            <Route exact path='/Invite' component={Invite} />
            <Route exact path='/InviteApi' component={InviteApi} />
            

                  {/* <ScheduleComponent currentView="Month" >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                  </ScheduleComponent> */}
                </Switch>
                </div>
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