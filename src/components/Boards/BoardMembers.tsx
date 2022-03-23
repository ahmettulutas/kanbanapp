import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Button, IconButton, ListItem, ListItemIcon, Typography } from '@mui/material';
import {updateBoard, getBoards} from './BoardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import axios from 'axios';
import { selectToken } from '../../auth/AuthSlice';
const useStyles = makeStyles ({
    smallIcons:{
        height:'35px',
        display:'flex',
        alignItems:'center',
        bottom:"0",
        right:"4px",
        overflow:"hidden",
        ' & *':{
            height:'15px',
            width:'15px',
            padding:'5px',
            fontSize:"14px",
        }
    },
})
// this component's id param is the id of the board.
export default function BoardMembers({id, editMode}:any) {
  // select members from store
  const members = useSelector((state:any) => state.boardSlice.boards.find((board:any) => board.id === id)?.members)
  // get token from auth slice for api calls.
  const token = useSelector(selectToken);

  const [memberName, setMemberName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  // this function adds a member to the board. Since the response of addBoardmember doesn't fit with the board slice, I solved it by dispatching another action to update the board slice.
  const handleAdd = async(e:any) => {
      e.preventDefault();
      axios.post("http://localhost:80/board-member", {boardId:id, username:memberName}, {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
          console.log("adding member to the server", res.data);
      }).catch(err => {
          console.log("error adding member to the server", err);
        
      }).finally(() => {
        dispatch(getBoards());
        setMemberName("");
      })
  }
  // this function deletes a member from the board.Since the response of addBoardmember doesn't fit with the board slice, I solved it by dispatching another action to update the board slice.
  const handleDelete = async(item:any) => {
      axios.delete(`http://localhost:80/board-member/${item.BoardMember.id}`, {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
          console.log("deleting member from the server", res.data);
      }).catch(err => {
          console.log("error deleting member from the server", err);
        
      }).finally(() => {
        dispatch(getBoards());
      })
      console.log(item.BoardMember.id)
  }
  const classes = useStyles();
  return (
    <Box sx={{width:"100%", border:"2px solid black", display:"flex", flexDirection:"column", textAlign:"center"}}>
      <Typography>Members of this board..</Typography>
      <List sx={{m:0.5}}>
      {members && members.map((item:any) =>                
        <ListItem sx={{height:"auto", border:"2px solid blue", p:0}}
            secondaryAction={
            <IconButton edge="end" aria-label="delete">
              {editMode && <DeleteIcon onClick={() => handleDelete(item)} />} 
            </IconButton>
          }>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary={item.username}/>
          </ListItem>)}
    </List>
    {editMode && 
      <form style={{display:"flex", flexDirection:"column", width:"100%"}} onSubmit={handleAdd}>
        <input style={{padding:"5px",margin:"0.2rem 3rem" }} onChange={(e:any) => setMemberName(e.target.value)}value={memberName} type="text" placeholder="add member"></input>
{/*         <button style={{padding:"5px",margin:"0.2rem 3rem", backgroundColor:"#1572A1", color:'white' }} type="submit">add</button>
 */}        <Button type="submit" sx={{padding:"5px",margin:"0.2rem 3rem", }}variant='outlined' color='success' startIcon={<AddIcon />}>
  Add
</Button>
      </form>}
    </Box>

)}


