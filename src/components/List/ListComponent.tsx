import React from 'react';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from './Title';
import Card from '../Card';
import AddCart from './Card/AddCart';

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
      margin:"0.5rem",
  }
})
export default function ListComponent({list}:any) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Title list={list}/>
      <Card title='#EB144C'/>
      <Card title='#72f1b7'/>
      <Card title='#f1c96f'/>
      <AddCart />
    </Box>
       
)}

