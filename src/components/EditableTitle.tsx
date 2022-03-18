import { Box, InputBase, Paper, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';


const useStyles = makeStyles ({
titleContainer: {
    display:"flex",
    justifyContent:"center",
    padding:"0.5rem",
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
    border:"none",
    fontSize:"23px",
    fontWeight:"bold",
    margin:"0px auto",
    width:"100%",
    '&:focus':{
        outline:"none"
    }
},

})
export default function EditableTitle({list}:any) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <Box className={classes.titleContainer}>
        { open ? 
                <input autoFocus onBlur={()=> setOpen(false)} className={classes.input} type="text" value={list.name} style={{textAlign:"center"}}/> 
            :
            
                <Typography sx={{ fontSize:"23px", fontWeight:"bold"}} onClick={() => setOpen(true)} className={classes.title}>{list.title}</Typography>
        }
        </Box>
    )}
