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
    border:"3px soid black",
    minHeight:"38px",
},
title: {
    fontSize:"18px",
    fontWeight:"bold",
    margin:"0px auto",
},
input: {
    position:"relative",
    border:"none",
    fontSize:"18px",
    fontWeight:"bold",
    color:"inherit",
    textAlign:"center",
    padding:"0.3rem",
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
    width:"100%",
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
    const [editedTitle, setEditedTitle] = useState(title);
    const handleEdit = (e:any) => {
        e.preventDefault();
        update({title:editedTitle});
        setOpen(false);
    }
/*     useEffect(()=>{
        console.log("title", editedTitle)
    }) */
    return (
        <Box className={classes.titleContainer}>
        { open ?
            <form className={classes.form} onSubmit={handleEdit}> 
                <input onChange={(e:any) =>  setEditedTitle(e.target.value)} autoFocus className={classes.input} type="text" value={editedTitle}></input> 
                <CloseIcon className={classes.closeIcon} onClick={() => setOpen(false)}/>
                <CheckIcon className={classes.checkIcon} onClick={handleEdit}/>
            </form>
            :
            <Box sx={{padding:"0.3rem",border:"1px soid black", gap:1, display:"flex", alignItems:"center"}}>
                <Typography className={classes.title}>{title}</Typography>
                <EditIcon sx={{border:"1px soid black", p:0, fontSize:"18px", cursor:"pointer"}} onClick={() => setOpen(true)} />
            </Box>
            
        }
        </Box>
    )}
