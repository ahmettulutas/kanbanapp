import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableTitle from '../EditableTitle';
import { makeStyles } from '@mui/styles';
import {deleteBoard, updateBoard} from "./BoardsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import BoardMembers from './BoardMembers';
import {selectUserId} from '../../auth/AuthSlice';  // we need userId to toggle edit board mode. 
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
        justifyContent:'center',
        backgroundColor:"#1572A1",
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
    },
    footer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#1572A1",
        color:"white",
        padding:'0.2rem',
        cursor:"pointer", 
        fontWeight:'bold',
        transition:'0.3s ease-in-out',
        '&:hover':{
            color:"#FF2442",
        }
    }
})
// item prop is the individual board object, open prop is the state of the modal
export default function BoardDetails({item, open}:any) {
const userId = useSelector(selectUserId);
useEffect(() => {
    if(userId === item.ownerId) {
        setEditMode(true);
    }
    console.log("editmode", item.ownerId, userId)
}, [])
const [editMode, setEditMode] = useState(false);
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
            {editMode ? <EditableTitle update={handleUpdateBoard} title={item.title}/> : <Typography className={boardDetails.title}>{item.title}</Typography>}
            <CloseIcon onClick={open} sx={{position:"absolute", top:0, right:0, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/> 
        </Box>
        <Box>
        <Box className={boardDetails.body}>
            <Typography>Created At: {item.createdAt}</Typography>
            <BoardMembers editMode={editMode} id={item.id}/>
        </Box>
        </Box>
        <Box className={boardDetails.footer} onClick={handleDeleteBoard} >
            <Typography>Delete This Board</Typography>
            <DeleteIcon/>
        </Box>
    </Box>
)}
