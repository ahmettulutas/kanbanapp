import React, { useEffect } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Card from '../Card/Card';
import AddItem from '../AddItem';
import EditableTitle from '../EditableTitle';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, selectCards, createCard } from '../Card/CardSlice';
import ListDetails from './ListDetails';
import { updateList } from './ListSlice';
import {  Droppable } from 'react-beautiful-dnd';
const colorsPicker = [  
  '#f1c96f',
  '#f76e6e',
  '#8086ca',
  '#72f1b7',
  '#000000',
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];
const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"5px",
      display:"flex",
      flexDirection:"column",
      gap:"0.5rem",
      height:"fit-content", 
      minHeight:"80vh",
      position:"relative",
  }
})
export default function ListComponent({list}:any) {
  const {id} = list;
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectCards);
  useEffect(() => {
  dispatch(getCards(id));
   console.log("listId",id)
  }, [dispatch])

  const handleUpdateList = (title:any) => {
    dispatch(updateList({id:id, title}));
  }
  const handleAddNewCard = (title:any) => {
    const args = {listId:id, title, order:cards.length+1};
    dispatch(createCard(args));

  }

    return (
      <Droppable droppableId={String(list.id)}>
        {(provided:any)=> (
          <Box className={classes.root} {...provided.droppableProps} ref={provided.innerRef}>    
            <ListDetails listId={id}/>
            <Box sx={{display:"flex", justifyContent:"center" , alignItems:"center", pr:2}}>
              <EditableTitle update={handleUpdateList} title={list.title}/>
            </Box>
            {list && list.cards.map((card:any, index:any) => <Card index={index} id={card.id} key={card.id} card={card}/>)}
            <AddItem display={true} add={handleAddNewCard} />
            {provided.placeholder}
        </Box>
        )}
      </Droppable>
)}

