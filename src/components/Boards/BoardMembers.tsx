import {useEffect, useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Chip from '@mui/material/Chip';

import { IconButton, InputAdornment, InputBase,} from '@mui/material';
import {updateBoard, getBoards} from './BoardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import axios from 'axios';
import { selectToken } from '../../auth/AuthSlice';

const useStyles = makeStyles ({
    root:{
      gap:"0.2rem", 
      flexWrap:"wrap", 
      display:"flex",
      alignItems:'center', 
      borderRadius:"20px", 
      margin:"1rem",
      padding:"0.6rem",
    },
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
    memberButton: {
      margin: 10,
      borderRadius: '45px',
      height: '35px',
      padding: '10',
      gap: '15px',
      color: 'green',
      border: '1px solid black',
      '&:hover': {
        backgroundColor: 'lightgray',
        border: '1px solid black',
      },
    },
    fieldset: {

    },
    form: {
      display:"flex",
      maxWidth:"20%",
    },
    input: {
      fontSize:"14px",
      color: "green",
      border:"1px solid black",
      background:"#EBEBEB",
      borderRadius:"45px",
      padding:'0px 4px 0px 10px',
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(0, 0, 0, 0.23)", // default
          padding:"0px",
          height:"15px",
        },
        "&.Mui-focused fieldset": {
          border: "2px solid red" // customized
        }
      }
    }

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

      <fieldset className={classes.root}>
        <legend style={{ paddingRight:'5px', fontSize:"14px"}}><PersonIcon sx={{height:"14px"}} />Members</legend>
          {members && members.map((item:any) =>                
            <Chip
              sx={{overflow:"hidden"}}
              label={item.username}
              avatar={<AccountCircleIcon />}  
              onDelete={() => handleDelete(item)}
              deleteIcon={<IconButton disabled={!editMode}><PersonRemoveIcon/></IconButton>}  
          />
          )}
          {editMode && 
          <form className={classes.form} onSubmit={handleAdd}>
            <InputBase
              className={classes.input}
              placeholder='add member'
              onChange={(e:any) => setMemberName(e.target.value)}
              value={memberName} 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }/>
          </form>
}
      </fieldset>
)}


