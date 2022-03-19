import React from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const useStyles = makeStyles ({
    root: {
        backgroundColor:"#f5f5f5",
        borderRadius:"19px",
        margin:"0.3rem 1rem",
        cursor:"grab",
        position:"relative",
        padding:"1.2rem 0.5rem",
    }
  })
export default function Card({card}:any) {
    const classes = useStyles();
    return (
        <Paper sx={{border:`2px solid ${card.color}`}} className={classes.root}>
            <MoreHorizIcon sx={{position:"absolute", right:4, top:0}}/>
            <Typography>{card.title}</Typography>
        </Paper>
    )
    }
