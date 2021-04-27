import React, {useEffect,useState} from 'react'
import axios from 'axios'
function Listannouncement()
{
    const [announcementList, setAnnouncementList] = useState([])
    
    const deleteAnnouncement = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5000/api/announcements/${id}`).then ( () => {
                window.location.reload(false);
        })
    }


    useEffect(() => {
        axios.get('http://localhost:5000/api/announcements').then( (allProjects) => {
            setAnnouncementList(allProjects.data);
});

}, []);


    return (
        <>
            <div>
                {
                      announcementList.map((val,key) => {
                          return(
                        <div key={key} className="card" style ={{borderRadius:'10px' ,padding:'15px',display:'inline-block', marginLeft:'15px', marginTop:'60px'}}>

                         <div className="card-body">
                             <h3> Title: {val.title}</h3>
                             <h3> Description: {val.description}</h3>
                             <button style={{marginLeft:'20px'}}  onClick={() => deleteAnnouncement(val._id)}className="btn btn-danger"> DELETE </button>
                         </div>
                        </div>
                    );
                          })
                }
            </div>
            </>
        );

    }
    export default Listannouncement;