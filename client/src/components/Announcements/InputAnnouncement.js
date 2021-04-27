import React, {useState} from 'react'
import axios from 'axios'
 function InputAnnouncement()
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const addToList= () =>{
        axios.post('http://localhost:5000/api/announcements',{title:title, description:description })
    };
    
    
    
    
        return (
            <div className="row text-center" >
                <div className="col-md-4">
                    <form >
                        <input required onChange = {(event)=> {setTitle(event.target.value)}} name='title' style={{marginLeft:'50px',marginTop:'20px'}}placeholder="Title" className="form-control"/>
                        <input required onChange = {(event)=> {setDescription(event.target.value)}} name='description' style={{marginLeft:'50px',marginTop:'20px'}}placeholder="Description" className="form-control"/>
                        <button style={{marginLeft:'50px', marginTop:'20px', width:'335px'}} onClick= {addToList} className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        );

    }


export default InputAnnouncement;