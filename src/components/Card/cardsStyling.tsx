import { colors } from "@mui/material";
import { makeStyles } from '@mui/styles';
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
export const getRandomColor = () => {
  let i = Math.floor(Math.random()* colorsPicker.length)
  return colorsPicker[i];
}
export const classes = {
    root: {
        backgroundColor:"white",
        borderRadius:"8px",
        margin:"0.1rem 1rem",
        cursor:"grab",
        position:"relative",
        padding:"1rem",
        '&:hover': {
          "& $editIcon": {
            fontSize:"24px"
          }
        },
    },
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: "50",
        display:'flex',
        justifyContent:"center",
        minHeight:"150px",  
        border:"none",
        p:0
      },
    editIcon:{
     /*  display:"none", */
      '&:hover':{fill:'orange'}, 
      fill:"#1572A1",
      position:"absolute", 
      fontSize:"16px", 
      top:0, 
      right:4,
      cursor:"pointer",
  },
}