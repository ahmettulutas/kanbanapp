import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import ListComponent from '../List/ListComponent';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateListWithDnd , selectList, getLists} from '../List/ListSlice';
import AddItem from '../AddItem';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {createList} from '../List/ListSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {selectCards, updateCard} from '../Card/CardSlice';
import { updateList } from '../List/ListSlice';
import { getSingleBoard, selectSingleBoard, updateSingleBoardWithDnd } from './BoardsSlice';
const useStyles = makeStyles ({
  root: {
      display:"flex",
      flexDirection:'column',
      height:"100%",
      padding:"1rem",
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
  const singleBoard = useSelector(selectSingleBoard);
  useEffect(()=> {
    dispatch(getSingleBoard(boardId));
    dispatch(getLists(boardId))
  },[dispatch, cards])

  const handleAddNewList = (title:string) => {
    // Convert the boardId to Number type and create args for the api call.
    const args = {boardId:Number(boardId), title:title, order:lists.length +1};
    dispatch(createList(args));
    dispatch(getLists(boardId));
  }
  const handleDrag = (result:any) => {
    const {destination, source, draggableId, type} = result;
    if (type === 'list') {
      const allList = [...singleBoard.lists];
      const [removedList] = allList.splice(source.index, 1);
      allList.splice(destination.index, 0, removedList); 
      dispatch(updateSingleBoardWithDnd(allList));
      allList.forEach((list:any, index:number) => {
        dispatch(updateList({...list, order:index}));
        dispatch(getLists(boardId))
      })
    }
    const sourceList = lists.find((list:any) => list.id === Number(source.droppableId));
    const destinationList = lists.find((list:any) => list.id === Number(destination.droppableId));
    const sourceCards = [...sourceList.cards];
    const destinationCards = [...destinationList.cards];
    let followingCard;
    let prevCard;
    let orderValue = 0;

    console.log("destination index is: ", destination.index);
    // returns if item drops in a non-draggable area.
    if (!destination) return;
/*  ------------------ if the item is dropped in the different list. ----------------- */
    if (source.droppableId !== destination.droppableId) {
      const [removedCard] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removedCard);
      destinationCards.forEach((card:any, index:number) => {
        dispatch(updateCard({id:card.id, order:index, listId:Number(destination.droppableId)}));
      })
      /* if (destination.index === 0) {
        console.log("adding to the top in different list")
        followingCard = destinationCards[destination.index +1];
        console.log("followingCard is",followingCard);
        console.log("destinationCards is",destinationCards);
        console.log("removedCard is",removedCard);
        followingCard ? orderValue = (followingCard.order / 2) : orderValue = removedCard.order;
        console.log("orderValue is", orderValue)
        dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));
      }
      else if (destination.index === destinationCards.length-1) {
        console.log(destinationCards.length)
        console.log("adding to the end in different list" )
        prevCard = destinationCards[destination.index -1];
        console.log("destinationCards is",destinationCards);
        console.log("destinationIndex is",destination.index);
        console.log("prevCard is",prevCard);
        console.log("removedCard is",removedCard);
        prevCard ? orderValue = (prevCard.order * 2) : orderValue = removedCard.order;
        dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));
      }
      else {
        console.log("adding to the inbetween in different list")
        prevCard = destinationCards[destination.index - 1];
        followingCard = destinationCards[destination.index +1];
        if (prevCard === removedCard) { 
          prevCard = destinationCards[destination.index];
          followingCard = destinationCards[destination.index + 1];
        } 
        orderValue = (prevCard.order + followingCard.order)/2;
        console.log("prevCard is",prevCard, "followingCard is", followingCard, "orderValue is", orderValue);      
        dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(destination.droppableId)}));
      } */
        dispatch(updateListWithDnd({sourceId:Number(source.droppableId), destinationId:Number(destination.droppableId), sourceCards, destinationCards, draggableId}));
      } 
/* ---------------------------- Same List Condition --------------------- */ 
      else {
        const [removedCard] = sourceCards.splice(source.index, 1);
        sourceCards.splice(destination.index, 0, removedCard);
        console.log("sourceCards", sourceCards)
        console.log("destinationCards", destinationCards)
        sourceCards.forEach((card:any, index:number) => {
            dispatch(updateCard({id:card.id, order:index, listId:Number(destination.droppableId)}));
        })
        /* if(destination.index === 0) {
          console.log("adding to the top in the same list");
          followingCard = sourceCards[destination.index +1];
          orderValue = (followingCard.order + 0)/2;
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));
        }
        if (destination.index === sourceCards.length - 1) {
          console.log("adding to the end in the same list");
          prevCard = sourceCards[destination.index-1];   
          orderValue = (prevCard.order *2);;
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));
        }
        else {
          console.log("adding to the inbetween in the same list")
          prevCard = destinationCards[destination.index - 1];
          followingCard = destinationCards[destination.index +1];
          if(prevCard === removedCard) { 
            // if prevcard is the same as removed card, then prevCard is the card the card after the removed card in initial position.
            prevCard = destinationCards[destination.index];
            followingCard = destinationCards[destination.index + 1];
          } 
          if(followingCard === removedCard) {
            // if followingCard is the same as removed card, then followingCard is the card before the removed card in initial position.
            followingCard = destinationCards[destination.index];
            prevCard = destinationCards[destination.index - 1];
          }
          orderValue = (prevCard.order + followingCard.order)/2;
          console.log("prevCard is",prevCard, "followingCard is", followingCard, "orderValue is", orderValue);      
          dispatch(updateCard({id:removedCard.id, order:orderValue, listId:Number(source.droppableId)}));
        } */
        dispatch(updateListWithDnd({sourceId:Number(source.droppableId), destinationId:Number(destination.droppableId), sourceCards, destinationCards, draggableId}));
      }
}
  return (
  <DragDropContext onDragEnd={(result:any) => handleDrag(result)}>
    <Droppable droppableId={String(boardId)} direction="horizontal" type="list">
      {(provided:any) => (
        <div className={classes.root}>
          <div className={classes.lists} {...provided.droppableProps} ref={provided.innerRef}>
            {lists && lists.map((item:any, index:number) => <ListComponent index={index} list={item}/> )}       
            <Box sx={{backgroundColor:"#EBECF0",borderRadius:"5px",display:"flex",flexDirection:"column",height:"fit-content", padding:"1rem auto",}}>
              <AddItem display={false} add={handleAddNewList} />
            </Box>
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  </DragDropContext>
)}