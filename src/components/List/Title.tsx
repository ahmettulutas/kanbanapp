import { Box, InputBase, Paper, Typography } from '@mui/material'
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const useStyles = makeStyles ({
    titleContainer: {
        backgroundColor:"#f5f5f5",
        display:"flex",
        justifyContent:"space-between",
        padding:"0.5rem",
    },
    title: {
        width:"100%",
        fontSize:"20em",
        margin:"0.2rem",
    },
    input: {
        width:"100%",
        border:"1px solid blue",
        fontSize:"26px",
    '&:focus': {
        backgroundColor:"#D8D8D8",
    },
    },

})
function Title({list}:any) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    return (
        <Box>
            {open ?
             <Box className={classes.titleContainer}>
                 <InputBase className={classes.input} inputProps={{
                    onBlur:()=>setOpen(false),
                    autoFocus:true,
                    }} value={list.name}></InputBase>
            </Box>
            :<Box className={classes.titleContainer}>
                <Typography onClick={() => setOpen(!open)} className={classes.title}>{list.name}</Typography>
                <MoreHorizIcon onClick={() => setOpen(!open)}/>
            </Box>
            } 
        </Box>

)}

export default Title;