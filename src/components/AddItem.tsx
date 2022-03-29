import { Button, Grid, Paper, Typography } from '@mui/material';
import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const useStyles = makeStyles ({
  root: {
      backgroundColor:"EBECF0",
      margin:"0.1rem 1rem",
      cursor:"pointer",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:"1rem",
  },
  form: {
    display:"grid",
    gridTemplateColumns:"1fr auto",
    gap:"0.4rem",
    width:"100%",
  },
  textfield:{
    padding:"0.6rem",
    "&:focus":{
      outline:"none",
      border:"2px solid green",
      borderRadius:"5px",
    },
  },
  submitbutton:{
    border:"2px solid green",
    padding:"0.4rem",
    minWidth: '30px', 
    fontWeight:"bold",
    color:"green",
    borderRadius:"5px",
    backgroundColor:"white", 
    cursor:"pointer",
    "&:hover":{
      color:"white",
      backgroundColor:"green",
    }
  },
})


export default function AddItem({display, add}:any) {
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = useState(display);
  const classes = useStyles();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(title.length > 0){
      add(title);
      setTitle("");
    }
    return;
  }
    return (
      <Box onBlur={()=> setOpen(false)} className={classes.root}>
        {open ?
          <form onSubmit={handleSubmit} className={classes.form}>
            <input value={title} onChange={(e:any) => setTitle(e.target.value)} className={classes.textfield} autoFocus placeholder="type a name..." type="text" ></input>
            <button onMouseDown={handleSubmit} className={classes.submitbutton} type="submit">Add</button>
          </form> 
          : 
          <Box onClick={() => setOpen(true)} sx={{ width:"auto", display:"flex", gap:"1rem", justifyContent:"flex-start"}}>
            <Typography>Add</Typography>
            <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>
          </Box>
        } 
      </Box>
)}
