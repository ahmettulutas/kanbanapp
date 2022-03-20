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
    minHeight:"60px",
    margin:"5px auto",
},
title: {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontSize:"23px",
    fontWeight:"bold",
    margin:"0px auto",
},
input: {
    position:"relative",
    color:"white",
    border:"1px solid white",
    fontSize:"23px",
    fontWeight:"bold",
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
    color:"white",
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
    color:"white",
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
                <input  onChange={(e:any) => setEditedTitle({title:e.target.value})} autoFocus className={classes.input} type="text" value={editedTitle.title} ></input> 
                <CloseIcon className={classes.closeIcon} onClick={() => setOpen(false)}/>
                <CheckIcon className={classes.checkIcon} onClick={handleEdit}/>
            </form>
            :
            <Typography sx={{ fontSize:"23px", fontWeight:"bold"}} onClick={() => setOpen(true)} className={classes.title}>{title}</Typography>
        }
        </Box>
    )}
