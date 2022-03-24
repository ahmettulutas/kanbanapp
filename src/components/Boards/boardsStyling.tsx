import { colors } from "@mui/material";

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
    root:{
      display:"flex",
      justifyContent:"center",
      height:"100%",
      backgroundColor:"lightgreen",
    },
    form: {
      display:"grid",
      gridTemplateColumns:"1fr auto",
      gap:"0.4rem",
      padding:"1rem",
    },
    textfield:{
      padding:"0.6rem",
      "&:focus":{
        outline:"none",
        border:"2px solid green",
      },
    },
    submitbutton:{
      padding:"0.5rem 2rem",
    },
    listContainer: {
      maxWidth:'100%',
      display:'grid',
      gridTemplateColumns:"repeat(auto-fill, minmax(150px,150px))",
      gridAutoFlow:"row",
      margin:"auto",
      padding:'1rem',
      gap:"1rem",
    },
    listItem: {  
      overflow: "hidden", 
      backgroundColor:"white",
      border:'2px solid #1572A1',
      position:"relative",
      height:"150px",
      gap:'1rem',
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alginItems:"center",
      transition:"0.2s ease-in",
      '&:hover':{
        boxShadow:'0px 0px 5px #1572A1',
        backgroundColor:"lightgray",
      },
     '& svg': {
        fontSize:"40px",
        transition:"0.2s ease-out",
        color:"#7f7f7f", 
        margin:"0px auto",
      },
      "& svg:hover": {
       color:"#625959", 
      },
    },
    modal:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'white',
      boxShadow: 50,
      display:'flex',
      justifyContent:"center",
      minHeight:"150px",    
    },
    editIcon:{
      '&:hover':{fill:'#1572A1'}, 
      position:"absolute", 
      height:"20px", 
      width:"20px", 
      top:0, 
      right:0
    },
    smallIcons:{
      height:'30px',
      display:'flex',
      alignItems:'center',
      position:'absolute',
      bottom:"0",
      right:"4px",
      overflow:"hidden",

      },
      avatarIcon:{
        border:"none",
        height:'11px',
        width:'11px',
        padding:'4px',
        fontSize:"12px",
        
  },
}