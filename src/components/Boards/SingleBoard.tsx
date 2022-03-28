import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ListComponent from '../List/ListComponent';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateListWithDnd, selectList, getLists} from '../List/ListSlice';
import AddItem from '../AddItem';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {createList} from '../List/ListSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {selectCards, updateCard} from '../Card/CardSlice';
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
      padding:"0 1rem",
      gridTemplateColumns:"repeat(auto-fit, minmax(150px,300px))",
      gridAutoFlow:"flow-row",
      margin:"0 1rem",
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
    const sourceList = lists.find((list:any) => list.id === Number(source.droppableId));
    const destinationList = lists.find((list:any) => list.id === Number(destination.droppableId));
    const sourceCards = [...sourceList.cards];
    const destinationCards = [...destinationList.cards];
    let followingCard;
    let prevCard;
    let orderValue = 0;
    console.log("destination index is: ", destination.index);
    // returns if item drops in a non-draggable area.
    if(!destination) return;
    // if the item is dropped in the different list.
    if(source.droppableId !== destination.droppableId) {
        if(destination.index === source.index) {
          return;
        }
        if(destination.index === 0) {
          const [removedCard] = sourceCards.splice(source.index, 1);
          destinationCards.splice(destination.index, 0, removedCard);
          followingCard = destinationCards[destination.index +1];
          console.log("followingCard is",followingCard)
          console.log("removedCard is",removedCard)
          orderValue = (followingCard.order + 0)/2;
          console.log("orderValue is",orderValue)
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));

        }
        if(destination.index === destinationCards.length) {
          const [removedCard] = sourceCards.splice(source.index, 1);
          destinationCards.splice(destination.index, 0, removedCard);
          prevCard = destinationCards[destination.index-1];
          console.log("destinationCards is",destinationCards);
          console.log("destinationIndex is",destination.index);
          console.log("prevCard is",prevCard);
          console.log("removedCard is",removedCard);
          orderValue = (prevCard.order *2);
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));
        }
        else {
          const [removedCard] = sourceCards.splice(source.index, 1);
          sourceCards.splice(destination.index, 0, removedCard);
          prevCard = destinationCards[destination.index - 1];
          followingCard = destinationCards[destination.index];
          if(prevCard === removedCard) { 
            prevCard = destinationCards[destination.index];
            followingCard = destinationCards[destination.index + 1];
          } 
          orderValue = (prevCard.order + followingCard.order)/2;
          console.log("prevCard is",prevCard, "followingCard is", followingCard, "orderValue is", orderValue);      
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));
        }
      } // Same List Condition // 
      else {
        if(destination.index === source.index) {
          return;
        }
        if(destination.index === 0) {
          const [removedCard] = sourceCards.splice(source.index, 1);
          sourceCards.splice(destination.index, 0, removedCard);
          followingCard = sourceCards[destination.index +1];
          orderValue = (followingCard.order + 0)/2;
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));
        }
        if(destination.index === sourceCards.length - 1) {
          const [removedCard] = sourceCards.splice(source.index, 1);
          sourceCards.splice(destination.index, 0, removedCard);
          prevCard = sourceCards[destination.index-1];   
          orderValue = (prevCard.order *2);;
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));
        }
        else {
          console.log("bu")
          const [removedCard] = sourceCards.splice(source.index, 1);
          sourceCards.splice(destination.index, 0, removedCard);
          prevCard = destinationCards[destination.index - 1];
          followingCard = destinationCards[destination.index];
          if(prevCard === removedCard) { 
            prevCard = destinationCards[destination.index];
            followingCard = destinationCards[destination.index + 1];
          } 
          orderValue = (prevCard.order + followingCard.order)/2;
          console.log("prevCard is",prevCard, "followingCard is", followingCard, "orderValue is", orderValue);      
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));

        }

      }
      /*       dispatch(updateListWithDnd({sourceId:Number(source.droppableId), destinationId:Number(destination.droppableId), sourceCards, destinationCards, draggableId}));
 */

}

  return (
  <DragDropContext onDragEnd={(result:any) => handleDrag(result)}>
    <div className={classes.root}>
      <Typography sx={{margin:"1rem auto", fontWeight:"bold"}}>title</Typography>
      <Box className={classes.lists}>
        {lists && lists.map((item:any, index:number) => <ListComponent key={index} list={item}/> )}       
        <Box sx={{height:"fit-content"}}>
          <AddItem display={true} add={handleAddNewList} />
        </Box>
      </Box>
    </div>
  </DragDropContext>
)}