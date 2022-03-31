import React, { useState } from 'react';
import {IconButton, Modal, Grid,  Paper, Typography, Tooltip, Chip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Draggable } from 'react-beautiful-dnd';
import CardDetails from './CardDetails';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { classes } from './cardsStyling';
import { Box } from '@mui/system';

export default function Card({card, id, index}:any) {
    const [openCardDetails, setOpenCardDetails] = useState(false);
    const handleOpenModal = () => {
        setOpenCardDetails(!openCardDetails);
    }
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Draggable index={index} draggableId={String(id)}>
            {(provided:any) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> {/* We need actual dom node to pass ref here becaue Paper component passes to an instance of paper compoennet in material ui*/}
                    <Paper sx={{...classes.root}}>
                        <Box sx={{position:"absolute", display:"flex", gap:0.5,top:3, left:5}}>
                            {card.labels.map((label:any) => (
                            <Chip sx={{p:0, height:8, backgroundColor: `${label.color}`}} />
                            ))}
                        </Box>
                        <Tooltip title="Card Details">
                            <EditIcon onClick={handleOpenModal} sx={{...classes.editIcon}} /> 
                        </Tooltip>
                        <Modal
                            disableScrollLock={true}
                            open={openCardDetails}
                            onClose={handleOpenModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Grid container xs={11} md={6} sx={{...classes.modal}}>
                                <CardDetails card={card} open={handleOpenModal}/>
                            </Grid>
                        </Modal>
                        <Typography>{card.title}</Typography>
                        <Chip sx={{position:"absolute", m:"5px", bottom:0, fontSize:10, width:45, right:0, height:15}} icon={<CommentIcon sx={{height:10}} />} label={card.comments.length} />
                    </Paper>
                </div>
            )}
        </Draggable>
)}
