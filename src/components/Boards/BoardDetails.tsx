import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
            <CloseIcon onClick={open} sx={{position:"absolute", right:3, top:7, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/> 
        </Box>
        <Box>
            <BoardMembers editMode={editMode} id={item.id}/>
        </Box>
        <Box className={boardDetails.footer} >
            <Typography>{editMode ? "Delete" : "Display Mode"}</Typography>
            {editMode ? <DeleteIcon sx={{cursor:"pointer", transition:'0.3s ease-in-out', '&:hover' : {color:"red"}}} onClick={handleDeleteBoard}/> : <VisibilityIcon/>}
        </Box>
    </Box>
)}
