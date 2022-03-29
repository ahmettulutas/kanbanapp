import React from 'react'
import { Avatar,  IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CgDanger } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { deleteList } from './ListSlice';
import { AppDispatch } from '../../store';
export default function ListDetails({listId}:any) {
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteList = () => {
    // delete list api call only requires list id;
        dispatch(deleteList(listId));
    }
    return (
    <div>        
        <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{position:"absolute", top:0, right:0, ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
            <MoreVertIcon />
            </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            elevation: 0,
            sx: {
            padding:0,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 0,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 10,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleDeleteList}>
            <IconButton>
                <CgDanger style={{color:'red'}}/>
            </IconButton>
                Delete
            </MenuItem>
        </Menu>
    </div>
)}
