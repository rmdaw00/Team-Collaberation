import React from 'react';
import CreateProject from './CreateProject'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Project from './Project';

import useStyles from '../styles'


function MakeProject () {
const classes = useStyles();

  return (
    
  <div className = "MakeProject">
     <div className='profilelinks'>
     
     <Container maxWidth ="lg">
       <AppBar className = {classes.appBar} position="static" color= "inherit" >
         <Typography className = {classes.heading} variant="h1" align = "center"> Create new project

         </Typography>
       </AppBar>

       <Grow in>
         <Container>
           <Grid container justify="space-between" alignItems="stretch">
              <Grid item xs={12} sm={7}>
                 <AppBar className={classes.appBar} position="static" color= "inherit">
                   <Project/>
                 </AppBar>
              </Grid>
              <Grid item xs={12} sm={4}>
              <AppBar className={classes.appBar} position="static" color= "inherit">
              <CreateProject/>
              </AppBar>
              </Grid>

           </Grid>
         </Container>
       </Grow>
  
          
         
            
        
           

  
            </Container> 
            </div>
  
  </div>


  );

};

export default MakeProject;