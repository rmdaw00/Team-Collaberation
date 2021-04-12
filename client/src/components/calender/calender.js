import React from 'react';
import './calender.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

class CalenderApp extends React.Component {

state = {
    eventsdata: [
        { title: 'event 1 new', date: '2021-04-08' },
        { title: 'event 2', date: '2021-04-10' }
    ],
    eventDate:'',
    eventName:'',
    newevent: false
}

closeForm = () => {
    this.setState({
        newevent : false
    })
}


handleDateClick = (arg) => { // bind with an arrow function
    this.setState({
        newevent : true,
        eventDate: arg.dateStr
    })
    alert(arg.dateStr)
}

updateEventName = (event) => {
    this.setState({
        eventName: event.target.value
    })
}

addEventHandler = (event) => {
    event.stopPropagation();
    const events = [...this.state.eventsdata];
    events.push({
        title: this.state.eventName, date: this.state.eventDate
    });
    this.setState({
        eventsdata: events,
        eventDate:'',
        eventName:'',
        newevent: false
    })
}

render() {
    return (
    <>

    {this.state.newevent && <div className="form-popup" id="myForm">
        <form className="form-container">
            <h1>Add New Event</h1>
            <input type="text" name="date" placeholder="Enter Event Name" disabled  value={this.state.eventDate} />
            <input type="text" placeholder="Enter Event Name" name="event" required onChange={this.updateEventName} value={this.state.eventName} />
            <button type="button" className="btn" onClick={this.addEventHandler}>Add Your Event</button>
            <button type="button" className="btn cancel" onClick={this.closeForm}>Close</button>
        </form>
    </div>}

      <FullCalendar
        plugins={[ dayGridPlugin , interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
        events={this.state.eventsdata}
      />
    </>
    )
  }

}

export default CalenderApp;

