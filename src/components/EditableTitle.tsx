import { Box, InputBase, Paper, Tooltip, Typography } from '@mui/material'
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
    editIcon:{
        '&:hover':{fill:'#1572A1'}, 
        fontSize:"15px",  
        cursor:"pointer",
        padding:"auto",
        margin:"auto",
    }
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
        {open ?
            <form onBlur={()=> setOpen(!open)} className={classes.form} onSubmit={handleEdit}> 
                <input onChange={(e:any) => setEditedTitle(e.target.value)} autoFocus className={classes.input} type="text" value={editedTitle}></input> 
                <CloseIcon className={classes.closeIcon} onClick={() => setOpen(false)}/>
                <CheckIcon className={classes.checkIcon} onMouseDown={handleEdit}/>
            </form>
            :
            <Tooltip sx={{mt:0}} title="Click to edit">
                <Box onClick={() => setOpen(true)} sx={{padding:"0.3rem",border:"1px soid black", gap:1, display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Typography className={classes.title}>{title}</Typography>
                </Box> 
            </Tooltip>
  
        }
        </Box>
    )}
