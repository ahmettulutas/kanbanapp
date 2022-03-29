import React, { useEffect } from 'react';
import { Box } from '@mui/material';
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
import { getRandomColor } from '../Card/cardsStyling';
const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"5px",
      display:"flex",
      flexDirection:"column",
      gap:"0.5rem",
      height:"fit-content", 
      position:"relative",
  }
})
export default function ListComponent({list}:any) {
  const {id} = list;
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
/*   const cards = useSelector(selectCards); */
  useEffect(() => {
    dispatch(getCards(id));
  }, [dispatch])

  const handleUpdateList = (title:any) => {
    dispatch(updateList({id:id, title}));
  }
  const handleAddNewCard = (title:any) => {
    // maxOrder gets the last cards order value.
    let maxOrder;
    if(list.cards.length === 0) {
      maxOrder = Math.pow(2, 16);
    } else {
      maxOrder = list.cards[list.cards.length-1].order ;
    }
    // and multiply it by 2 to make the new card added to the end of the list no matter how much is the last item's order.
    const args = {listId:id, title, order:2 * maxOrder};   
    dispatch(createCard(args));  
  }
   return (
      <Droppable droppableId={String(list.id)}>
        {(provided:any)=> (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Box className={classes.root}>    
              <ListDetails listId={id}/>
              <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", pr:2}}>
                <EditableTitle update={handleUpdateList} title={list.title}/>
              </Box>
              {list && list.cards.map((card:any, index:any) => <Card color={getRandomColor()} index={index} id={card.id} key={card.id} card={card}/>)}
                <AddItem display={true} add={handleAddNewCard}/>
                {provided.placeholder}
            </Box>
          </div>
         
        )}
      </Droppable>
)}

