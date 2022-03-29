import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditableTitle from '../EditableTitle';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {deleteCard } from './CardSlice';
const useStyles = makeStyles ({
    root:{
        display:'grid', 
        gridTemplateRows:'auto 1fr auto',
        width:"100%",
        minHeight:"400px",
  
    },
    header: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#1572A1",
        borderRadius:"15px 15px 0 0",  
        color:'white',
        position:'relative',
        padding:"0.2rem",

    },
    title: {
        fontSize:'20px',
        padding:"auto",
    },
    body: {
        padding:"1rem",
        display:"flex",
        flexDirection:"column",
    },
    bodyDetails:{
        gap:"0.2rem", 
        flexWrap:"wrap", 
        display:"flex", 
        borderRadius:"20px", 
        margin:"1rem",
        padding:"0.6rem",
    
    },
    footer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#1572A1",
        borderRadius:"0 0 15px 15px", 
        color:"white",
        padding:'0.2rem',
        gap:"0.3rem",
        fontWeight:'bold',
    }
})


export default function CardDetails({card, open}:any) {
    const dispatch = useDispatch<AppDispatch>();
    const editMode = true;
    const cardDetails = useStyles();
    const handleDeleteCard = () => {
        dispatch(deleteCard({id:card.id, listId:card.listId}));
    }
  return (
    <Box className={cardDetails.root}>
        <Box className={cardDetails.header}>
            {editMode ? <EditableTitle /* update={handleUpdateBoard} */ title={card.title}/> : <Typography className={cardDetails.title}>{card.title}</Typography>}
            <CloseIcon onClick={open} sx={{position:"absolute", right:3, top:7, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/> 
        </Box>
        <Box>
            <fieldset className={cardDetails.bodyDetails}>
                <legend style={{ paddingRight:'5px', fontSize:"14px"}}>
                    <InfoRoundedIcon sx={{fontSize:'14px'}}/>
                    Details
                </legend>
                {editMode ? 
                <Box>
                    <Typography>Created at : {card.createdAt}</Typography>Since you are the owner of this board, you can delete, change name and manage members of it.
                </Box>                
                :
                <Box>
                    <Typography>Created at : {card.createdAt}</Typography>You are member of this board.Therefore, you can only display the details.
                </Box>}
            </fieldset>
        </Box>
        <Box className={cardDetails.footer} >
            <Typography>{editMode ? "Delete" : "Display Mode"}</Typography>
            {editMode ? <DeleteIcon onClick={handleDeleteCard} sx={{cursor:"pointer", transition:'0.3s ease-in-out', '&:hover' : {color:"red"}}}/> : <VisibilityIcon/>}
        </Box>
    </Box>
  )
}
