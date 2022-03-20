import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { classes } from './boardsStyling';
import EditableTitle from '../EditableTitle';
const style = {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    border:'2px solid black',
    backgroundColor:"#1572A1",
}
export default function ModalHeader({item}: any) {
  return (
    <div style={{...style}}>
        <DeleteIcon />
        <EditableTitle title={item.title}/>
        <CloseIcon sx={{color:"white",'&:hover':{}}}/>
    </div>
  )
}
