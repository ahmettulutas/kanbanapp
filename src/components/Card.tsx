import React from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles ({
    root: {
        backgroundColor:"#f5f5f5",
        borderRadius:"19px",
        margin:"0.4rem auto",
        padding:"0.7rem",
        width:"90%",
    }
  })
export default function Card({title}:any) {
    const classes = useStyles();
    return (
        <Paper sx={{border:`2px solid ${title}`}} className={classes.root}>
            <Typography>Contrary to popular belief, Lorem Ipsum is not simply random text. </Typography>
        </Paper>
    )
    }
