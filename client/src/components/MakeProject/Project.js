import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ShowProjects() {
  
  const classes = useStyles();
  
 
  const [projectsList, setProjectsList] = useState([])

  const deleteProject = (id) => {
          axios.delete(`http://localhost:5000/api/projects/${id}`).then ( () => {
                  window.location.reload(false);
          })
  }
  

  useEffect(() => {
          axios.get('http://localhost:5000/api/projects').then( (allProjects) => {
                  setProjectsList(allProjects.data);
  })
  
}, [])
  return (
          <>
          <h2>All Projects</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th"> Title </TableCell>
            <TableCell component="th"> Description</TableCell>
            <TableCell component="th"> Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {projectsList.map((project, key) => (
            <TableRow key={key}>
              <TableCell scope="row">
                {project.name}
              </TableCell>
              <TableCell  scope="row">{project.description}</TableCell>
              <TableCell  scope="row">
              <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteProject(project._id)} >
                   <DeleteIcon  fontSize="small" />
              </IconButton>
             

    
              
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}