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
import { Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles ({
  root: {
      backgroundColor:"#EBECF0",
      borderRadius:"5px",
      display:"flex",
      flexDirection:"column",
      gap:"0.5rem",
      height:"fit-content", 
      position:"relative",
      padding:"0 0 1rem 0",
  }
})
export default function ListComponent({list}:any, {index}:any) {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectCards); 
  useEffect(() => {
    dispatch(getCards(list.id));
    console.log("cards in the list is", cards);
    console.log("list is", list.id, "typeof list is", typeof list.id);
  }, [dispatch])

  const handleUpdateList = (item:any) => {
    dispatch(updateList({...item, id:list.id}));
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
    const args = {listId:list.id, title, order:2 * maxOrder};   
    dispatch(createCard(args));  
  }
   return (
     <Draggable draggableId={list && String(list.id)} key={list.id} index={Number(index)}>
       {(provided:any) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <Droppable droppableId={String(list.id)}>
        {(provided:any)=> (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              <Box className={classes.root}>    
                <ListDetails listId={list.id}/>
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", pr:2}}>
                  <EditableTitle update={handleUpdateList} title={list.title}/>
                </Box>
                {list && list.cards.map((card:any, index:any) => <Card index={index} id={card.id} key={card.id} card={card}/>)}
                  <AddItem display={false} add={handleAddNewCard}/>
                  {provided.placeholder}
              </Box>
            </div>         
        )}
      </Droppable>
      {provided.placeholder}
      </div>
       )}
     </Draggable>
      
)}

