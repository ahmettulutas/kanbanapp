import { Box, InputBase, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableTitle from '../EditableTitle';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {deleteCard } from './CardSlice';
import { updateCard } from './CardSlice';
/* import InputBase from '@mui/material/InputBase'; */

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
    },
    descriptionForm: {
        width:"100%",
        display:"flex",
        flexDirection:"column",
    },
    descriptionButton: {
        width:"30%",
    },
    commentForm:{

    }
})

export default function CardDetails({card, open}:any) {
    const [description, setDescription] = useState(card.description)
    const dispatch = useDispatch<AppDispatch>();
    const [editMode, setEditMode ] = useState(false);
    const cardDetails = useStyles();
    const handleDeleteCard = () => {
        dispatch(deleteCard({id:card.id, listId:card.listId}));
    }
    const handleUpdateCard = (item:any) => {
        console.log("item", item)
        dispatch(updateCard({...item, id:card.id}));
    }
  return (
    <Box className={cardDetails.root}>
        <Box className={cardDetails.header}>
            <EditableTitle update={handleUpdateCard} title={card.title}/>
            <CloseIcon onClick={open} sx={{position:"absolute", right:3, top:7, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/> 
        </Box>
        <Box className={cardDetails.bodyDetails}>
            <Box className={cardDetails.descriptionForm}>
                <TextField 
                    onChange={(e:any) => setDescription(e.target.value)}
                    onBlur={() => setEditMode(false)} 
                    onFocus={() => setEditMode(!editMode)} 
                    value={description} 
                    label="Card Description"/>
                {editMode && 
                    <button className={cardDetails.descriptionButton}
                        onMouseDown={() => handleUpdateCard({description:description})}
                    >Add</button>
                }
            </Box>
            <Box className={cardDetails.commentForm}>
                <TextField value="comment" label="Add Comment" fullWidth    />
            </Box>
        </Box>
        <Box className={cardDetails.footer} >
            <Typography>Delete</Typography>
            <DeleteIcon onClick={handleDeleteCard} sx={{cursor:"pointer", transition:'0.3s ease-in-out', '&:hover' : {color:"red"}}}/>
        </Box>
    </Box>
  )
}
