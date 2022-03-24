import React, { useEffect } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Card from '../Card/Card';
import AddItem from '../AddItem';
import EditableTitle from '../EditableTitle';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, selectCards } from '../Card/CardSlice';
import ListDetails from './ListDetails';
import { updateList } from './ListSlice';
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
export default function ListComponent({item}:any) {
  const cards = useSelector(selectCards);
  useEffect(() => {
  }, [cards])
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateList = (title:any) => {
    dispatch(updateList({id:item.id, title}));
  }

  const addNewCard = (title:string) => {
    const newCard = {title:title, listId:item.id, id:new Date().getTime(), color:colorsPicker[Math.floor(Math.random() * colorsPicker.length)]};
    dispatch(addCard(newCard));
  } 
  const classes = useStyles();
    return (
      <Box className={classes.root}>    
        <ListDetails listId={item.id}/>
        <Box sx={{display:"flex", justifyContent:"center" , alignItems:"center", pr:2}}>
          <EditableTitle update={handleUpdateList} title={item.title}/>
        </Box>
        {cards && cards.map((card:any) => <Card key={card.id} card={card}/>)}
        <AddItem display={true} add={addNewCard} />
      </Box>
)}

