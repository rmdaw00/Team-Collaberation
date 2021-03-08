import React,{useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Cal = () => {
    
    const [date, setDate] = useState(new Date());

    const onChange = date => {

        setDate(date);
    };
    
    return (
        <div id="cal">
        
            <Calendar onChange = {onChange} value = {date} />


            </div>  


);

};

export default Cal;