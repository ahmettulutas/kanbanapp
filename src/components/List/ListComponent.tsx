import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Card from '../Card/Card';
import AddItem from '../AddItem';
import EditableTitle from '../EditableTitle';

import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { addList } from './ListSlice';
const colorsPicker = [
  '#f1c96f',
  '#f76e6e',
  '#8086ca',
  '#72f1b7',
  '#000000',
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];
const useStyles = makeStyles ({
  root: {
      backgroundColor:"#f5f5f5",
      borderRadius:"5px",
      display:"flex",
      flexDirection:"column",
      width:"90%",
      gap:"0.5rem",
      height:"fit-content", 
      minHeight:"80vh",
      minWidth:"300px",
  }
})
export default function ListComponent({list}:any) {

  const classes = useStyles();
    return (
      <Box className={classes.root}>
        <Box sx={{display:"flex", justifyContent:"space-between" , alignItems:"center", pr:2}}>
          <EditableTitle list={list}/>
        </Box>
        <Card title='#EB144C'/>
        <Card title='#72f1b7'/>
        <Card title='#f1c96f'/>
        <AddItem />
      </Box>
)}
