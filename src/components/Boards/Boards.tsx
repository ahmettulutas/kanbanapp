import React, { useEffect, useState } from 'react';
import { classes } from './boardsStyling';
import { IList } from '../../react-app-env';
import { Avatar, Grid, IconButton, List, ListItem, Menu, MenuItem, Modal,  Tooltip,  Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

import { Box } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectBoards, getBoards, createBoard, deleteBoard } from './BoardsSlice';
import AddItem from '../AddItem';
import BoardLink from './BoardLink';

export default function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {boards} = useSelector(selectBoards);
  useEffect(() => {
    dispatch(getBoards());
  },[dispatch])
  const addNewBoard = (title:string) => {
    dispatch(createBoard({title:title}));
    setOpenAddDialog(!openAddDialog);
  }
  return (
    <Box style={classes.root}>
      <List sx={{...classes.listContainer}}>
        {boards && boards.map((item:any, key:any) => <BoardLink key={key} item={item} />)}
        <ListItem sx={{...classes.listItem}} button onClick={()=> setOpenAddDialog(!openAddDialog)}><AddBoxIcon/><Typography>Add</Typography></ListItem>
      </List>
      <Modal
        open={openAddDialog}
        onClose={()=> setOpenAddDialog(!openAddDialog)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Grid container xs={11} md={6} sx={{...classes.modal}}>
        <AddItem add={addNewBoard}/>
      </Grid>
      </Modal>
    </Box>
)}
 