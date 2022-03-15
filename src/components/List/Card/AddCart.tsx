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
        justifyContent:"flex-end",
    }
})


export default function AddCart() {
  const [open,setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>       
        <Box  className={classes.root}>
          {
            open ? <InputCard setOpen={setOpen} /> : <AddCircleOutlineRoundedIcon onClick={() => setOpen(true)}>Add a card...</AddCircleOutlineRoundedIcon>
          }

        </Box>
    </div>
  )
}
