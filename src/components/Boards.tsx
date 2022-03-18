import React, { useState } from 'react';
import { IList } from '../react-app-env';
import { makeStyles } from '@mui/styles';
import {Grid, List, ListItem, Modal, TextField, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import InputCard from './Card/InputCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, Route, Routes } from 'react-router-dom';
import SingleBoard from './Board';
const useStyles = makeStyles ({
  root:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"lightyellow",
    minHeight:"100vh",
  },

  textfield:{
    border:"2px solid #7f7f7f",
    padding:"0.7rem",
    "&:focus":{
      color:"1px solid black",
    }
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
  form: {
    margin:"1rem auto",
  },
})

export default function Boards() {
  const [boards, setBoards] = useState([{id:1, name:'project1'}, {id:2, name:'project2'}, {id:3, name:'project3'}])
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const createBoardLink = (item:any) => (
    <Link style={{textDecoration: 'none', color:"black"}} to={`/${item.id}`}>
      <ListItem className={classes.listItem} button key={item.id}>
        <ArticleIcon/>
        <Typography>{item.name}</Typography>
      </ListItem> 
    </Link>
  )  
  const handleOpen = () => {
    setOpenDialog(!openDialog);
  }
  return (
    <Box className={classes.root}>
      <List className={classes.listContainer}>
        {boards.map(createBoardLink)}
        <ListItem className={classes.listItem} button onClick={handleOpen}><AddBoxIcon/><Typography>New Board</Typography></ListItem>
      </List>
      <Modal
            open={openDialog}
            onClose={handleOpen}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{display:"flex", flexDirection:"column", gap:"1rem", justifyContent:"center", padding:"1rem", margin:"1rem auto",alignItems:"center"}}
          >
          <Grid className={classes.modal} container xs={8} lg={6}>
              <Box sx={{p:1, display:"flex", width:"100%", justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:"bold"}}>Add New Board</Typography>
                <CloseIcon onClick={handleOpen} sx={{cursor:"pointer","&:hover":{fill:"red"}}}/>
              </Box>
              <InputCard />
          </Grid>  
      </Modal>
    </Box>
)}
