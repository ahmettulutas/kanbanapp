import React, { useState } from 'react';
import {IconButton, Modal, Grid,  Paper, Typography, Tooltip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Draggable } from 'react-beautiful-dnd';
import CardDetails from './CardDetails';
import {classes} from './cardsStyling';

export default function Card({ card, id, index}:any) {
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
                    <Tooltip title="Card Details">
                        <MoreHorizIcon onClick={handleOpenModal} sx={{position:"absolute", right:4, top:0}}/>
                    </Tooltip>
                    <Modal
                        open={openCardDetails}
                        onClose={handleOpenModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Grid container xs={11} md={6} sx={{borderRadius:"15px", ...classes.modal}}>
                            <CardDetails card={card} open={handleOpenModal}/>
                        </Grid>
                    </Modal>
                    <Typography>{card.title}</Typography>
                </Paper>
            </div>

        )}
        </Draggable>
)}
