import { Box, Typography } from '@mui/material'
import React from 'react'
/* import ModalHeader from './ModalHeader'; */
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableTitle from '../EditableTitle';
import { makeStyles } from '@mui/styles';
import {deleteBoard, updateBoard} from "./BoardsSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
const useStyles = makeStyles ({
    root:{
        display:'grid', 
        gridTemplateRows:'auto 1fr auto',
        height:"400px",
        width:"100%",
    },
    header: {
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:"#1572A1",
        color:'white',
        padding:'0 0.5rem',
        position:'relative',
    },
    body: {
        padding:"1rem",
    },
    footer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#1572A1",
        color:"white",
        padding:'1rem',
        cursor:"pointer", 
        fontWeight:'bold',
        transition:'0.3s ease-in-out',
        '&:hover':{
            color:"#FF2442",
        }
    }
})

export default function BoardDetails({item, open}:any) {
  const dispatch = useDispatch<AppDispatch>();
  const boardDetails = useStyles();
  const handleDeleteBoard = () => {
    dispatch(deleteBoard(item.id));
    open();
  }
  const handleUpdateBoard = (title:any) => {
    dispatch(updateBoard({id:item.id, title}));
  }
  return (
    <Box className={boardDetails.root}>
        <Box className={boardDetails.header}>
            <EditableTitle update={handleUpdateBoard} title={item.title}/>
            <CloseIcon onClick={open} sx={{position:"absolute", top:0, right:0, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/>
        </Box>
        <Box>
        <Box className={boardDetails.body}>
            <Typography>Created At: {item.createdAt}</Typography>
            members...
        </Box>
        </Box>
        <Box onClick={handleDeleteBoard} className={boardDetails.footer}>
            <Typography>Delete This Board</Typography>
            <DeleteIcon/>
        </Box>
    </Box>
)}
