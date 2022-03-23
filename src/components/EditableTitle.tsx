import { Box, InputBase, Paper, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles ({
titleContainer: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
},
title: {
    fontSize:"23px",
    fontWeight:"bold",
    margin:"0px auto",
},
input: {
    position:"relative",
    border:"1px solid inherit",
    fontSize:"23px",
    fontWeight:"bold",
    color:"inherit",
    textAlign:"center",
    width:"100%",
    background:"transparent",
    '&:focus':{
        outline:"none"
    }
},
form:{
    display:"flex",
    position:"relative",
    alignItems:"stretch",
},
checkIcon:{
    color:"orange",
    position:"absolute",
    fontWeight:"bold",
    fontSize:"30px",
    top:0,
    right:"0",
    height:"100%",
    cursor:"pointer",
    margin:"auto",
    '&:hover':{
        color:"green",
    }
},
closeIcon:{
    cursor:"pointer",
    color:"orange",
    position:"absolute",
    fontWeight:"bold",
    fontSize:"15px",
    '&:hover':{
        color:"red",
    }
},
})
export default function EditableTitle({title, update}:any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState({title:title});
    const handleEdit = (e:any) => {
        e.preventDefault();
        update(editedTitle);
        setOpen(false);
    }
    return (
        <Box className={classes.titleContainer}>
        { open ?
            <form className={classes.form} onSubmit={handleEdit}> 
                <input onChange={(e:any) => setEditedTitle({title:e.target.value})} autoFocus className={classes.input} type="text" value={editedTitle.title} ></input> 
                <CloseIcon className={classes.closeIcon} onClick={() => setOpen(false)}/>
                <CheckIcon className={classes.checkIcon} onClick={handleEdit}/>
            </form>
            :
            <Box sx={{gap:1, display:"flex", alignItems:"center"}}>
                <Typography className={classes.title}>{title}</Typography>
                <EditIcon sx={{cursor:"pointer"}} onClick={() => setOpen(true)} fontSize="small" />
            </Box>
            
        }
        </Box>
    )}
