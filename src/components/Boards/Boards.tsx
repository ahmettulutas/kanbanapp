import React, { useEffect, useState } from 'react';
import { IList } from '../../react-app-env';
import { makeStyles } from '@mui/styles';
import {Button, Grid, List, ListItem, Modal, TextField, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import InputCard from '../Card/InputCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, Route, Routes } from 'react-router-dom';
import SingleBoard from './Board';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectBoards, getBoards, createBoard } from './BoardsSlice';
import AddItem from '../AddItem';
const classes = {
  root:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"lightyellow",
    minHeight:"100vh",
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
      border:"2px solid green",
    },
  },
  submitbutton:{
    padding:"0.5rem 2rem",
  },
  listContainer: {
    display: 'flex',
    margin:"auto",
    gap:"1rem",
  },
  listItem: {
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alginItems:"center",
    '& svg': {
      fontSize:"40px",
      transition:"0.2s ease-out",
      color:"#7f7f7f",
      margin:"0px auto",
    },
    "& svg:hover": {
      color:"#625959",
  },
  },
  modal:{
    display:"flex",
    flexDirection:"column",
    position: 'absolute',
    margin:"10rem auto",
    backgroundColor: 'white',
    padding: '0.5rem',
  },

}
// This function maps and creates a list of boards;
const createBoardLink = (item:any, key:any) => (
  <Link key={key} style={{textDecoration: 'none', color:"black"}} to={`/${item.id}`}>
    <ListItem sx={{...classes.listItem}} button key={item.id}>
      <ArticleIcon/>
      <Typography>{item.title}</Typography>
    </ListItem> 
  </Link>
) 

export default function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const {boards} = useSelector(selectBoards);
  useEffect(() => {
    dispatch(getBoards());
  },[dispatch])
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = () => {
    setOpenDialog(!openDialog);
  }
  const addNewBoard = (title:string) => {
    dispatch(createBoard({title:title}));
  }
  return (
    <Box style={classes.root}>
      <List style={classes.listContainer}>
        {boards && boards.map(createBoardLink)}
        <ListItem sx={{...classes.listItem}} button onClick={handleOpen}><AddBoxIcon/><Typography>New Board</Typography></ListItem>
      </List>
      <Modal
            open={openDialog}
            onClose={handleOpen}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{display:"flex", flexDirection:"column", gap:"1rem", justifyContent:"center", padding:"1rem", margin:"1rem auto",alignItems:"center"}}
          >
          <Grid sx={{...classes.modal}} item xs={6} m={3}>
              <Box sx={{p:1, display:"flex", width:"100%", justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:"bold"}}>Add New Board</Typography>
                <CloseIcon onClick={handleOpen} sx={{cursor:"pointer","&:hover":{fill:"red"}}}/>
              </Box>
              <AddItem add={addNewBoard}/>
          </Grid>  
      </Modal>
    </Box>
)}
 