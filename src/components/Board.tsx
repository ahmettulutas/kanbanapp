import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import ListComponent from './List/ListComponent';
import { Box } from '@mui/system';

const useStyles = makeStyles ({
  root: {
      display:"grid",
      gridTemplateRows: "auto 1fr",
      minHeight:"100vh",
  },
  lists:{
      display:"grid",
      padding:"1rem 1rem",
      gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
  }
})
export default function SingleBoard() {
  const [list, setList] = useState([{id:1, name:'project1'}, {id:2, name:'project2'}, {id:3, name:'project3'}])
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div>
          <ResponsiveAppBar />
        </div>
        <Box className={classes.lists}>
          <ListComponent list={list}/>
          <ListComponent list={list}/>
          <ListComponent list={list}/>   
        </Box>
 
    </div>
)}