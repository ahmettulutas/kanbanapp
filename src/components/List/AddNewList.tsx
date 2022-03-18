import { makeStyles } from '@mui/styles';
import React from 'react';
import AddItem from '../AddItem';

const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"5px",
      display:"flex",
      flexDirection:"column",
      width:"90%",
      gap:"0.5rem",
      height:"fit-content",
      margin:"0.5rem",
      position:"relative",
  }
})
export default function AddNewList() {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <AddItem />
      </div>
    )
}
