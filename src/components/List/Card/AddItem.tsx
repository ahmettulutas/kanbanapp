import { Grid, Paper, Typography } from '@mui/material';
import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import InputCard from './InputCard';
import { Box } from '@mui/system';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"19px",
      margin:"0.4rem auto",
      width:"90%",
      cursor:"pointer",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
  }
})


export default function AddItem() {
const [open, setOpen] = useState(false);
const classes = useStyles();
  return (
    <Box className={classes.root}>
      {
        open ? 
        <InputCard setOpen={setOpen} /> : 
        <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
          <Typography>Add...</Typography>
          <AddCircleOutlineRoundedIcon onClick={() => setOpen(true)}>Add a card...</AddCircleOutlineRoundedIcon>
        </Box>
      }
    </Box>
)}
