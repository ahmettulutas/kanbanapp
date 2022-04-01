import {useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import axios from 'axios';
import { selectToken } from '../../auth/AuthSlice';
import { getCards } from './CardSlice';
import { Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles ({
    chipBox:{
        display:"flex",
        gap:5
    },
    fieldset: {
        display:"grid",
        gridTemplateRows:"auto 1fr",
        position:"relative",
        marginBottom:0,
        width:"100%",
        height:"100%",
        padding:"0 1rem",
        backgroundColor:"white",    
    },
})

export default function CardLabels({card}:any) {
    const classes = useStyles()
    const [labels, setLabels] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(selectToken);
    useEffect(() => {
            axios.get('http://localhost:80/label', {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
                console.log(res.data);
                setLabels(res.data);
                
            }).catch(err => {
                console.log(err);
            })

    },[])
    const handleAddLabel = (labelId:any) => {
        console.log("labelId", labelId);
            axios.post('http://localhost:80/card-label', {cardId:card.id, labelId:Number(labelId)}, {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                dispatch(getCards(card.listId));
            });
    }
    const handleDelete = (labelId:any) => {
        console.log("labelId", labelId);
            axios.delete(`http://localhost:80/card-label/${labelId}`, {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                dispatch(getCards(card.listId));
            });
    }
        return (
            <fieldset className={classes.fieldset}>
                <legend style={{padding:"0 0.4rem"}}>Labels</legend>
                <Box>
                    <Tooltip title="Add Label">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{position:"absolute", top:0, right:0, ml:2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            >
                            <AddIcon sx={{fill:"#1572A1"}} />
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
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <MenuItem>
                            <FormGroup sx={{gap:0}}>
                                {labels && labels.map((label:any) => (
                                <FormControlLabel control={<Checkbox checked={card.labels.some((item:any) => item.id === label.id)} value={label.id} onChange={(e:any) => handleAddLabel(e.target.value)}  defaultChecked />} label={label.title} />))}
                            </FormGroup>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box className={classes.chipBox}>
                    {card.labels.map((label:any) => (
                        <Chip 
                            onDelete={() => handleDelete(label.CardLabel.id)}
                            sx={{p:0, height:25, backgroundColor: `${label.color}`}} 
                            label={label.title}
                            deleteIcon={<IconButton><DeleteIcon sx={{fill:"white"}}/></IconButton>}
                        />
                    ))}
                </Box>
            </fieldset>

)}