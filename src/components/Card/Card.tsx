import React from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import {deleteCard } from './CardSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Draggable } from 'react-beautiful-dnd';
const useStyles = makeStyles ({
    root: {
        backgroundColor:"white",
        borderRadius:"19px",
        margin:"0.1rem 1rem",
        cursor:"grab",
        position:"relative",
        padding:"2rem",
    }
  })
export default function Card({card, id, index}:any) {
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteCard = () => {
        dispatch(deleteCard(card.id));
    }
    const classes = useStyles();
    return (
        <Draggable index={index} draggableId={String(id)}>
        {(provided:any) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> {/* We need actual dom node to pass ref here becaue Paper component passes to an instance of paper compoennet in material ui*/}
                <Paper sx={{position:"relative", border:`2px solid ${card.color}`}} className={classes.root}>
                    <MoreHorizIcon onClick={handleDeleteCard} sx={{position:"absolute", right:4, top:0}}/>
                    <Typography>{card.title}</Typography>
                </Paper>
            </div>

        )}
        </Draggable>
)}
