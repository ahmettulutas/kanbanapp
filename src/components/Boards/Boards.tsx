import React, { useEffect, useState } from 'react';
import { classes } from './boardsStyling';
import { IList } from '../../react-app-env';
import {  Grid, List, ListItem, Menu,  Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectBoards, getAllBoards, createBoard } from './BoardsSlice';
import {selectUserId} from '../../auth/AuthSlice';  
import AddItem from '../AddItem';
import BoardLink from './BoardLink';
import {SiAddthis} from 'react-icons/si';
import illustration from '../../assets/boardillustration.jpg';

export default function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {boards} = useSelector(selectBoards);
  const userId = useSelector(selectUserId);
  useEffect(() => {
    dispatch(getAllBoards());
  },[dispatch])
  const addNewBoard = (title:string) => {
    dispatch(createBoard({title:title}));
    setOpenAddDialog(!openAddDialog);
    console.log(userId)
  }
  return (
    <Box style={classes.root}>
      <List sx={{zIndex:100, ...classes.listContainer}}>
        {boards && boards.map((item:any, key:any) => <BoardLink key={key} item={item} />)}
        <ListItem sx={{...classes.listItem}} button onClick={()=> setOpenAddDialog(!openAddDialog)}><SiAddthis/><Typography>Add</Typography></ListItem>
      </List>
      <Modal
        open={openAddDialog}
        onClose={()=> setOpenAddDialog(!openAddDialog)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container xs={11} md={6} sx={{...classes.modal}}>
          <AddItem display={true} add={addNewBoard}/>
        </Grid>
      </Modal>
      <img style={{zIndex:'0', position:"absolute", bottom:0, right:0, width:"auto", height:"450px"}} alt="kanban" src={illustration}/>
    </Box>
)}
 