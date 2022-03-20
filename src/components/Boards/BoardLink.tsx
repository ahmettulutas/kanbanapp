import { Grid, ListItem, Modal } from '@mui/material';
import { classes } from './boardsStyling';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { SiTrello } from 'react-icons/si';
import BoardDetails from './BoardDetails';
import { Link } from 'react-router-dom';

export default function BoardLink({item, key}:any) {
    const [openBoardDetails, setOpenBoardDetails] = useState(false);
    const handleOpenModal = () => {
        setOpenBoardDetails(!openBoardDetails);
    }
    return (
        <div>  
        <ListItem sx={{...classes.listItem}} button key={item.id}>
            <EditIcon onClick={handleOpenModal} sx={{...classes.alertIcon}}  /> 
            <Modal
                open={openBoardDetails}
                onClose={handleOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Grid container xs={11} md={6} sx={{...classes.modal}}>
                    <BoardDetails open={handleOpenModal} item={item} />
                </Grid>
            </Modal>
            <Link key={key} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", textDecoration: 'none', color:"black"}} to={`/${item.id}`}>
                <SiTrello />
                <p>{item.title}</p>
            </Link>
        </ListItem>
        </div>
  )
}
