import {Link} from 'react-router-dom';
import React, { useState }  from "react";
import {Table} from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AssignTask = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ]);

  
  return (

  <div className='profile-container'>
          <h1>
              <span className="text-primary">Assign task</span>
          </h1>
          
          <div className='profilelinks'>

            <ul >
                <li><Link to='/AssignTask'>Overview</Link></li>
                <li><Link to='#'>List</Link></li>
                <li><Link to='/Schedule'>Timeline</Link></li>
                <li><Link to='/Cal'>Calender</Link></li>
                

            </ul>
           
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
            </AgGridReact>
        </div>
         
{/* <Table >
  <thead>
    <tr>
      
      <th>Task name</th>
      <th>Assignee</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>mdo</td>
    </tr>
    <tr>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>fat</td>
    </tr>
    <tr>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>fat</td>
    </tr>
   
  </tbody>
</Table> */}
  
</div>



  );

};

export default AssignTask ;