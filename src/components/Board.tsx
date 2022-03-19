import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import ListComponent from './List/ListComponent';
import { Box } from '@mui/system';
import AddNewList from './List/AddNewList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { addList , selectList} from './List/ListSlice';
import AddItem from './AddItem';

const useStyles = makeStyles ({
  root: {
      display:"grid",
      gridTemplateRows:"auto 1fr",
      minHeight:"100vh",
  },
  lists:{
      display:"grid",
      gap:"1rem",
      padding:"1rem 1rem",
      gridTemplateColumns:"repeat(auto-fit, minmax(150px,300px))",
      overflow:"scroll",
      gridAutoFlow:"flow-row",
      margin:"1rem 1rem",
  }
})
export default function SingleBoard() {
  const list2 = useSelector(selectList);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const addNewList = (title:string) => {
    const newList = {title:title, id:new Date().getTime()};
    dispatch(addList(newList));
  }

  return (
    <div className={classes.root}>
        <ResponsiveAppBar list={list2}/>
        <Box className={classes.lists}>
            {list2  && list2.map((list:any) => <ListComponent key={list.id} list={list}/>)} 
            <Box sx={{height:"fit-content"}}>
              <AddItem add={addNewList} />
            </Box>
        </Box>
    </div>
)}