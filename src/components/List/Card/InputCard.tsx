import { Button, InputBase, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
const useStyles = makeStyles ({
  root:{
    display:"flex",
    flexDirection:"column",
  },
  form: {
    display:"flex",
    gap:"0.4rem",
    margin:"0.5rem auto",
    alignItems:"center",
    justifyContent:"center",
  },
  textfield:{
    width:"100%",
    border:"2px solid #7f7f7f",
    boxShadow: '0px 0px 4px 0px',
    padding:"0.2rem",
    "&:focus":{
      border:"none",
    },

  },
})
function InputCard({setOpen}:any) {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <InputBase className={classes.textfield} inputProps={{ onBlur:()=>setOpen(false), autoFocus:true,}} placeholder="type a name..." type="text" ></InputBase>
      <Button startIcon={<AddBoxIcon />} sx={{p:"0.6rem 20px", minWidth: '30px', backgroundColor:"#7f7f7f", "&:hover":{backgroundColor:"lightgreen"}}} type="submit" variant="contained">Add</Button>
    </form>
  )
}

export default InputCard;