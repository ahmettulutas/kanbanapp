import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from '../ResponsiveAppBar';
import ListComponent from '../List/ListComponent';
import { Box } from '@mui/system';
import AddNewList from '../List/AddNewList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { addList , selectList} from '../List/ListSlice';
import AddItem from '../AddItem';
import { useParams } from 'react-router-dom';
import EditableTitle from '../EditableTitle';

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
  const {id} = useParams();
  const list2 = useSelector(selectList);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const addNewList = (title:string) => {
    const newList = {title:title, id:new Date().getTime()};
    dispatch(addList(newList));
  }
  useEffect(()=>{
    console.log("param is", id);
  })
  return (
    <div className={classes.root}>

        <EditableTitle title={"title"}/>
        <Box className={classes.lists}>
          {list2 && list2.map((list:any) => (<ListComponent key={list.id} list={list}/>))} 
          <Box sx={{height:"fit-content"}}>
            <AddItem add={addNewList} />
          </Box>
      </Box>
    </div>
)}