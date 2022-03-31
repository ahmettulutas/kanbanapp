import React, {useEffect} from 'react'
import { Avatar,  IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import { CgDanger } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
export default function CardLabels({card}:any) {
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value:any) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked]; 
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <div>        
    <Tooltip title="Card Labels">
        <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
        <LabelIcon sx={{fill:"white"}} />
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
      <MenuItem >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {card.labels.map((value:any) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value.title}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  </MenuItem>
</Menu>
</div>
  )
}
