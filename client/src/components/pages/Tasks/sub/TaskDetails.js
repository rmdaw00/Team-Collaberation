import React, {useState} from 'react'

const TaskDetails = (props) => {
    const [date, setDate] = useState(props.task.dateDue)
    const [urgency, setUrgency] = useState(props.task.urgency)
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    
    
    const handleUrgencyChange = (e) => {
        setUrgency(e.target.value);
        props.handleUrgencyChange(e.target.value);
    }

    
    const dateID = props.idName+"Date"
    const urgencyID = props.idName+"Urgency"

    return (
        <div class="taskDetails">
            <div class="col">
                <label htmlFor={dateID} >Due Date</label>      
                <input id={dateID} type="date" value={date} onChange={handleDateChange}/>
            </div>
            <div class="col">
                <label htmlFor={urgencyID}>Urgency</label>      
                <select id={urgencyID} onChange={handleUrgencyChange} value={urgency}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
    )
}

export default TaskDetails
<<<<<<< HEAD

=======
>>>>>>> 672c67ecdfbbbeb5725880283310eaf60ba2ab4b
