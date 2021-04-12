import React, { useState, useContext, useEffect } from 'react';
import './calender.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import ContactContext from '../../context/newEvent/eventContext';

const CalenderApp = (props) => {
const contactContext = useContext(ContactContext);
const { events ,loading, getContacts , addContact, updateContact, clearCurrent, current,deleteContact, setCurrent } = contactContext;

useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

const [eventsdata,seteventsdata] = useState([]);

const [eventDate,seteventDate] = useState('');
const [eventName,seteventName] = useState('');
const [newevent,setnewevent] = useState(false);



const closeForm = () => {
    setnewevent(false);
}


const handleDateClick = (arg) => { // bind with an arrow function
    setnewevent(true);
    seteventDate(arg.dateStr);
}

const updateEventName = (event) => {
    seteventName(event.target.value);
}

const addEventHandler = (event) => {
    event.stopPropagation();
    const events = [...eventsdata];
    events.push({
        title: eventName, date: eventDate
    });
    seteventsdata(events);
    seteventDate('');
    seteventName('');
    setnewevent(false);

    event.preventDefault();
    addContact({title: eventName, date: eventDate});

}

// if (events !== null && events.length === 0 && !loading) {
//     debugger;
//     return <h4>Please add a events</h4>;
//   }
//   if(events !== null && events.length > 0 ) {
//     console.log(events)
//   }

    return (
    <>

    {newevent && <div className="form-popup" id="myForm">
        <form className="form-container">
            <h1>Add New Event</h1>
            <input type="text" name="date" placeholder="Enter Event Name" disabled  value={eventDate} />
            <input type="text" placeholder="Enter Event Name" name="event" required onChange={updateEventName} value={eventName} />
            <button type="button" className="btn" onClick={addEventHandler}>Add Your Event</button>
            <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
        </form>
    </div>}

      <FullCalendar
        plugins={[ dayGridPlugin , interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
      />
    </>
    )
  }

export default CalenderApp;

