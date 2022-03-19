import { Button, InputBase, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
/* THIS COMPONENT WILL BE DELETED LATER ON */
const useStyles = makeStyles ({
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
})
/* THIS COMPONENT WILL BE DELETED LATER ON */
function InputCard({setOpen}:any) {
  /* THIS COMPONENT WILL BE DELETED LATER ON */
const classes = useStyles();
    return (
      /* THIS COMPONENT WILL BE DELETED LATER ON */
      <form className={classes.form}>
        <input className={classes.textfield} onBlur={()=>setOpen(false)} autoFocus placeholder="type a name..." type="text" ></input>
        <Button sx={{p:"0.4rem 20px", minWidth: '30px', backgroundColor:"#7f7f7f", "&:hover":{backgroundColor:"green"}}} type="submit" variant="contained">Add</Button>
      </form>
  )
}

export default InputCard;