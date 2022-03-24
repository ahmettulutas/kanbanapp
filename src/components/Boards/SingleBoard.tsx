import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ListComponent from '../List/ListComponent';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { /* addList */  selectList, getLists} from '../List/ListSlice';
import AddItem from '../AddItem';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {createList} from '../List/ListSlice';
const useStyles = makeStyles ({
  root: {
      display:"flex",
      flexDirection:'column',
      height:"100%",
      backgroundColor:"lightyellow",
  },
  lists:{
      display:"grid",
      gap:"1rem",
      padding:"1rem 1rem",
      gridTemplateColumns:"repeat(auto-fit, minmax(150px,300px))",
      gridAutoFlow:"flow-row",
      margin:"1rem 1rem",
  }
})
export default function SingleBoard() {
  const {boardId} = useParams(); // get boardId from url. Be careful boardId returns string.
  const lists = useSelector(selectList);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const handleAddNewList = (title:string) => {
    // convert the boardId to Number type and create args for the api call.
    const args = {boardId:Number(boardId), title:title};
    dispatch(createList(args));
}
  useEffect(()=> {
      dispatch(getLists(boardId))
  },[dispatch])
  return (
    <div className={classes.root}>
      <Typography sx={{margin:"1rem auto", fontWeight:"bold"}}>title</Typography>
      <Box className={classes.lists}>
        {lists && lists.map((item:any) => <ListComponent item={item}/> )}       
        <Box sx={{height:"fit-content"}}>
          <AddItem display={true} add={handleAddNewList} />
        </Box>
      </Box>
    </div>
)}