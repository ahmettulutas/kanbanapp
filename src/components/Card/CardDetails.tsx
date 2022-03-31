import { Box, InputBase, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableTitle from '../EditableTitle';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {deleteCard, getCards } from './CardSlice';
import { updateCard } from './CardSlice';
import CardComments from './CardComments';
/* import InputBase from '@mui/material/InputBase'; */

const useStyles = makeStyles ({
    root:{
        display:'grid', 
        gridTemplateRows:'auto 1fr auto',
        width:"100%",
        minHeight:"400px",
        height:"auto",
        backgroundColor:'#EBECF0',
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
    addButton: {
        width:"30%",
        position:"absolute",
        bottom:"0",
        margin:"0.6rem",
        left:"0",
        height:"30px",
        color:'white',
        backgroundColor:'#1572A1',
        border:"none",
        '&:disabled': {
            backgroundColor:'lightgray',
        }
    },
    form: {
        position:"relative",
        width:"100%",
        backgroundColor:"white",
    },
})

export default function CardDetails({card, open}:any) {
    useEffect(() => {
        console.log("card details rendered", card)
    })
    const dispatch = useDispatch<AppDispatch>();
    const [desceditMode, setDesceditMode ] = useState(false);
    const [description, setDescription] = useState(card.description)
    const cardDetails = useStyles();
    const handleDeleteCard = () => {
        dispatch(deleteCard({id:card.id, listId:card.listId}));
    }
    const handleUpdateCard = (item:any) => {
        // this function both updates card's title or card's description.
        console.log("item", item)
        dispatch(updateCard({...item, id:card.id}));
        dispatch(getCards(card.listId));
    }
  return (
    <Box className={cardDetails.root}>
        <Box className={cardDetails.header}>
            <EditableTitle update={handleUpdateCard} title={card.title}/>
            <CloseIcon onClick={open} sx={{position:"absolute", right:3, top:7, fontSize:"x-large", cursor:"pointer", fill:"white",'&:hover':{fill:"red"}}}/> 
        </Box>
        <Box className={cardDetails.bodyDetails}>
            <Box sx={{display:"flex", width:"100%", alignItems:"flex-start", gap:0.5, flexDirection:'row'}}>
                <form className={cardDetails.form} onSubmit={(e:any)=> {
                e.preventDefault();
                handleUpdateCard({description:description})}}>
                    <TextField 
                        value={description}
                        label="Description" 
                        fullWidth
                        multiline
                        rows={3}
                        onChange={(e:any) => setDescription(e.target.value)}
                        onBlur={() => setDesceditMode(false)} 
                        onFocus={() => setDesceditMode(!desceditMode)} 
                    />
                    {desceditMode && 
                    <button 
                        disabled={description.length === 0}
                        className={cardDetails.addButton}
                        onMouseDown={()=> handleUpdateCard({description:description})}>
                    Add</button>
                    }
                </form>
            </Box>
        <CardComments card={card}/>
        </Box>
        <Box className={cardDetails.footer} >
            <Typography>Delete</Typography>
            <DeleteIcon onClick={handleDeleteCard} sx={{cursor:"pointer", transition:'0.3s ease-in-out', '&:hover' : {color:"red"}}}/>
        </Box>
    </Box>
  )
}
