import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
interface ILoginFormProps {
  username: string,
  password: string | number,
}
export default function Login() {
  const [form, setForm] = useState<ILoginFormProps>({username: '', password: ''});
  const dispatch = useDispatch();
  const handleChange = (event:any) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(login(form));
    setForm({username: '', password: ''});
  }
  return (
    <Grid sx={{m:"5rem auto"}} container xs={11} md={6}>
      <form onSubmit={handleSubmit} style={{ padding:"1rem", border:'2px solid black', margin:"1rem auto", minHeight:"300px", textAlign:"center", display:"flex", flexDirection:"column", gap:"0.2rem"}}>
        <Typography sx={{margin:"0rem auto", fontWeight:"bold"}}>Login</Typography>
        <TextField name="username" value={form.username} onChange={handleChange} id="filled-basic" label="name" variant="outlined" />
        <TextField name="password" value={form.password} onChange={handleChange} type="password" id="filled-basic" label="password" variant="outlined" />
        <Button type="submit" sx={{p:2}} variant="contained" color="success">Login</Button>
      </form>
    </Grid>
)}


