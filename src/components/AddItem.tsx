import { Button, Grid, Paper, Typography } from '@mui/material';
import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import InputCard from './Card/InputCard';
import { Box } from '@mui/system';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"19px",
      margin:"0.3rem 1rem",
      p:2,
      cursor:"pointer",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      border:"2px solid lightgreen",
  },
  form: {
    display:"grid",
    gridTemplateColumns:"1fr auto",
    gap:"0.4rem",
    padding:"1rem",
  },
  textfield:{
    padding:"0.6rem",
    "&:focus":{
      outline:"none",
      border:"2px solid red",
    },
  },
})


export default function AddItem({add}:any) {
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    add(title);
  }
    return (
      <Box className={classes.root}>
        { open ? 
          <form onSubmit={handleSubmit} className={classes.form}>
            <input onChange={(e:any) => setTitle(e.target.value)} className={classes.textfield} onBlur={()=>setOpen(false)} autoFocus placeholder="type a name..." type="text" ></input>
            <Button sx={{p:"0.4rem 20px", minWidth: '30px', backgroundColor:"#7f7f7f", "&:hover":{backgroundColor:"#72f1b7"}}} type="submit" variant="contained">Add</Button>
          </form> : 
          <Box sx={{p:2, display:"flex", justifyContent:"flex-start ", width:"100%"}}>
            <Typography>Add...</Typography>
            <AddCircleOutlineRoundedIcon onClick={() => setOpen(true)}>Add a card...</AddCircleOutlineRoundedIcon>
          </Box>
        }
      </Box>
)}
