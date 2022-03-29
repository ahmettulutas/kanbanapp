import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {SiTrello} from 'react-icons/si';
import { Link } from 'react-router-dom';
import {FaUserEdit} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectList } from './List/ListSlice';

export default function ResponsiveAppBar () {
  const lists = useSelector(selectList);
  const boardTitle = lists.length > 0 ? lists[0].board.title : '';
  React.useEffect(() => {

  },[])

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event:any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container sx={{ boxShadow:"15px 0px 0px 0px", display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:"#1572A1", color: 'white'}} maxWidth="xl">
          <Link to={'/'}>
            <IconButton
              sx={{color:"white"}}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true">
              <SiTrello />
            </IconButton>
          </Link>
          <Typography sx={{fontWeight:"bold"}}>{boardTitle}</Typography>
          <Box>
            <Tooltip title="Open settings">
              <IconButton 
                sx={{color:"white", p:0}}             
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="primary" onClick={handleOpenUserMenu}>
                <FaUserEdit />  
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '30px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'top',horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top',horizontal: 'right',}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
            </Menu>
          </Box>
      </Container>
    </AppBar>
  );
};

