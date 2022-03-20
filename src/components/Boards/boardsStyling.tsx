export const classes = {
    root:{
      display:"flex",
      justifyContent:"center",
      backgroundColor:"lightyellow",
      minHeight:"100vh",
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
      gap:"1rem",
      padding:"1rem",
    },
    listItem: {
      border:'2px solid green',
      position:"relative",
      height:"100%",
      display:"flex",
      justifyContent:"center",
      flexDirection:"column",
      alginItems:"center",
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
      boxShadow: 10,
      display:'flex',
      justifyContent:"center",
      minHeight:"150px",
      
    },
    alertIcon:{
      '&:hover':{fill:'red'}, 
      position:"absolute", 
      height:"20px", 
      width:"20px", 
      top:0, 
      right:0
    }
  }