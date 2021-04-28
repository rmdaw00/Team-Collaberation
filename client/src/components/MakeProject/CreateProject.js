import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreateProject() {
  const classes = useStyles();
  const [project, setProject] = useState ({
    name: ' ',
    description :  ' '
  });

  const createProject = () => {
      axios.post('http://localhost:5000/api/projects',project).then (() =>
    {
          window.location.reload(false);
    })
  }

  return (
    <>
    <h2> Create Project</h2>
    <form className={classes.root} noValidate autoComplete="off">
      
      <TextField id="outlined-basic" align="center" label="Project Title" variant="outlined" value={project.name} onChange= {(event)=> {
        setProject({ ...project, name: event.target.value})
      }}/>
      <TextField id="outlined-basic" align="center" label="Description" variant="outlined" value={project.description} onChange={(event)=>{
        setProject({ ...project, description: event.target.value})
      }}/>
      <Button variant="contained" color="primary" onClick={createProject}>
        Create
      </Button>
    </form>
    </>
  );
};

export default CreateProject;

