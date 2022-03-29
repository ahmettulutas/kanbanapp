import { Avatar, AvatarGroup, Grid, ListItem, Modal, Typography } from '@mui/material';
import { classes, getRandomColor } from './boardsStyling';
import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { SiTrello } from 'react-icons/si';
import BoardDetails from './BoardDetails';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function BoardLink({item, key}:any) {
    // selector to get board members
    const members = useSelector((state:any) => state.boardSlice.boards.find((board:any) => board.id === item.id)?.members)
    // function to control boarddetails modal
    const [openBoardDetails, setOpenBoardDetails] = useState(false);
    const handleOpenModal = () => {
        setOpenBoardDetails(!openBoardDetails);
    }
    return (
    <ListItem sx={{...classes.listItem}} button key={item.id}>
        <EditIcon onClick={handleOpenModal} sx={{...classes.editIcon}}  /> 
        <Modal
            open={openBoardDetails}
            onClose={handleOpenModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Grid container xs={11} md={6} sx={{borderRadius:"15px", ...classes.modal}}>
                <BoardDetails open={handleOpenModal} item={item} />
            </Grid>
        </Modal>
        <Link style={{height:"100%", width:"100%", cursor:"search", gap:'1rem', display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", textDecoration: 'none', color:"black"}} to={`/${item.id}`}>
            <SiTrello />
            <Typography sx={{fontSize:"70%"}}>{item.title}</Typography>
            <AvatarGroup sx={{...classes.smallIcons}} max={3}>
                {members && item.members.map((item:any) => <Avatar sx={{backgroundColor:`${getRandomColor()}`,...classes.avatarIcon}} key={item.id} alt='user1' >{item.username[0]}</Avatar>)}
            </AvatarGroup>
        </Link>
    </ListItem>
)}
