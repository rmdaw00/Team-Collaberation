import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

export default function TasksDate() {

    const [report, setReport] = useState('')

    const token = localStorage.getItem('token')
    const [sendError, setSendError] = useState('');
    const [startDate, setStartingDate] = useState('');
    const [endDate, setEndingDate] = useState('');

    const handleDateChange = (e) => {
       
        if (e.target.id === 'end') {
            setEndingDate(e.target.value)
        } else {
            setStartingDate(e.target.value)
        }

        axios.post('http://localhost:5000/api/report',data,config).then((response) => {
            setReport(response.data);
            
            console.log(response)
          }).catch((error) => {
            if (error.response) {
                setSendError(error.response.data.msg);
                
              }
        });
       
    }

    let config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        }
      };
      const data = { startDate, endDate}

     //useEffect( () => {
    //    axios.post('http://localhost:5000/api/report',data,config).then((response) => {
    //         setReport(response.data);
    //         console.log(response)
    //       }).catch((error) => {
    //         if (error.response) {
    //             setSendError(error.response.data.msg);
                
    //           }
    //     });
          
    //    }, []);
       
    return (
        <div className="report">
            {sendError && <span class="sendErrors"> {sendError} </span>}
            <div className="ReportHeader" >
                <h1 className="PageHeaderText">Weekly Report</h1>
                <div>
                    <div class="col">
                        <label htmlFor="start" >Start Date</label>      
                        <input id="start" type="date" value={startDate} onChange={handleDateChange}/>
                    </div>
                    <div class="col">
                        <label htmlFor="end" >End Date</label>      
                        <input id="end" type="date" value={endDate} onChange={handleDateChange}/>
                    </div>
                </div>
                {report && <div class="col">
                        <label htmlFor="start" >Completion rate: </label>      
                        <input id="start" type="text" value={report.completionRatio} onChange={handleDateChange} disabled/>
                </div>}
                {report && <div class="col">
                        <label htmlFor="start" >Starting Week: </label>      
                        <input id="start" type="text" value={report.startDate} onChange={handleDateChange} disabled/>
                </div>}
                {report && <div class="col">
                        <label htmlFor="start" >Ending Week: </label>      
                        <input id="start" type="text" value={report.endDate} onChange={handleDateChange} disabled/>
                </div>}
              
            </div>

            { report.completed && 
            <div className="reportTables">
                <h2>Completed Tasks</h2>
                <table >
                    <tr>
                        <th>Tasks</th><th>DueDate</th><th>User</th>
                    </tr>
                        {report.completed.map((t) => {
                            console.log(t)
                            if (t) 
                                return (
                                    <tr >
                                        <td>
                                        {t.name}
                                        </td> 
                                        <td>
                                        {t.dueDate}
                                        </td> 
                                        <td>
                                        {t.user}
                                        </td> 
                                    </tr>)
                                    })}
                                    
                </table> 
            </div>
                        
            }
            { report.notCompleted && 
            <div className="reportTables">
                <h2>Not Completed Tasks</h2>
                <table >
                    <tr>
                        <th>Tasks</th><th>DueDate</th><th>User</th>
                    </tr>
                        {report.notCompleted.map((t) => {
                            console.log(t)
                            if (t) 
                                return (
                                    <tr >
                                        <td>
                                        {t.name}
                                        </td> 
                                        <td>
                                        {t.dueDate}
                                        </td> 
                                        <td>
                                        {t.user}
                                        </td> 
                                    </tr>)
                                    })}
                                    
                </table> 
            </div>
                        
            }
        </div>
    )
}
