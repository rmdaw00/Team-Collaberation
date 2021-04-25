import React, {useState} from 'react'

const TaskDetails = (props) => {

    
    const [date, setDate] = useState(new Date(props.task.dueDate))
    const [urgency, setUrgency] = useState(props.task.urgency)
    
    const handleDateChange = (e) => {
        props.handleDateChange(e.target.value)
        setDate(new Date(e.target.value));
       
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
                <input id={dateID} type="date" value={dateToInputString(date)} onChange={handleDateChange}/>
            </div>
            <div class="col">
                <label htmlFor={urgencyID}>Urgency</label>      
                <select id={urgencyID} value={urgency} onChange={handleUrgencyChange} >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
    )
}

const dateToInputString = (date) => {
    if (!isNaN(date)){
        let day = date.getDate()+1;
        let month = date.getMonth()+1;
        if (String(day).length == 1) day='0'+day;
        if (String(month).length == 1) month='0'+month;
        
        return `${date.getFullYear()}-${month}-${day}`
    }
    else return('') 
    
    

} 


export default TaskDetails
