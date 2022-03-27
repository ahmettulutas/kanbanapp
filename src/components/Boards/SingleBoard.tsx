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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {selectCards} from '../Card/CardSlice';
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
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectCards);
  const {boardId} = useParams(); // get boardId from url. Be careful boardId returns string.
  const lists = useSelector(selectList);
  useEffect(()=> {
    dispatch(getLists(boardId))
  },[dispatch, cards])

  const handleAddNewList = (title:string) => {
    // convert the boardId to Number type and create args for the api call.
    const args = {boardId:Number(boardId), title:title, order:lists.length};
    dispatch(createList(args));
  }
  const handleDrag = (result:any) => {
    const {destination, source, draggableId} = result;
    if(!destination) return;
    if(source.droppableId !== destination.droppableId) {
        const sourceList = lists.find((list:any) => list.id === Number(source.droppableId));
        const destinationList = lists.find((list:any) => list.id === Number(destination.droppableId));
        const sourceCards = [...sourceList.cards];
        console.log("sourceCardsFirst",sourceCards)
        const destinationCards = [...destinationList.cards];
        console.log("destinationCardsFirst",destinationCards);
        const [removedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, removedCard);
        console.log(removedCard)
        console.log("sourceCardsThen",sourceCards)
        console.log("destinationCardsThen",destinationCards);
    }
  }
  return (
  <DragDropContext onDragEnd={(result:any) => handleDrag(result)}>
    <div className={classes.root}>
      <Typography sx={{margin:"1rem auto", fontWeight:"bold"}}>title</Typography>
      <Box className={classes.lists}>
        {lists && lists.map((item:any) => <ListComponent list={item}/> )}       
        <Box sx={{height:"fit-content"}}>
          <AddItem display={true} add={handleAddNewList} />
        </Box>
      </Box>
    </div>
  </DragDropContext>
)}