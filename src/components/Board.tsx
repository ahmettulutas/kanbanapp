import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import ListComponent from './List/ListComponent';
import { Box } from '@mui/system';
import AddNewList from './List/AddNewList';

const useStyles = makeStyles ({
  root: {
      display:"grid",
      gridTemplateRows:"auto 1fr",
      minHeight:"100vh",
  },
  lists:{
      display:"grid",
      padding:"1rem 1rem",
      gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",
      gridAutoFlow:"flow-row",
      margin:"1rem auto",
      width:"100%",
  }
})
export default function SingleBoard() {
  const [list, setList] = useState([{id:1, name:'list1'}, {id:2, name:'list2'}, {id:3, name:'list3'}])
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Box>
          <ResponsiveAppBar list={list[0]}/>
        </Box>
        <Box className={classes.lists}>
          {list.map((list:any) => <ListComponent key={list.id} list={list}/>)}
          <AddNewList />
        </Box>
    </div>
)}