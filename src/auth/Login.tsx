import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './AuthSlice';
import { Link, Navigate } from 'react-router-dom';
import {selectAuth} from './AuthSlice';
interface ILoginFormProps {
  username: string,
  password: string | number,
}
export default function Login() {
  const [form, setForm] = useState<ILoginFormProps>({username: '', password: ''});
  const dispatch = useDispatch();
  const {token, loading, success } = useSelector(selectAuth);
  const handleChange = (event:any) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    dispatch(login(form));
    setForm({username: '', password: ''});
  }
  if(token && success) {
    return <Navigate to="/"/>
  }
  return (
    <Grid sx={{m:"5rem auto"}} item xs={7} sm={5} md={4} lg={3}>
      <form onSubmit={handleSubmit} style={{position:"relative", padding:"1rem", border:'2px solid black', margin:"1rem auto", minHeight:"300px", textAlign:"center", display:"flex", flexDirection:"column", gap:"0.5rem"}}>
        <Typography sx={{margin:"0rem auto", fontWeight:"bold"}}>Login</Typography>
        <TextField name="username" value={form.username} onChange={handleChange} id="filled-basic" label="name" variant="outlined" />
        <TextField name="password" value={form.password} onChange={handleChange} type="password" id="filled-basic" label="password" variant="outlined" />
        <Button type="submit" sx={{p:2}} variant="contained" color="success">Login</Button>
        <Link style={{position:"absolute", bottom:5, right:5}} to="/register">Dont have an account? </Link>
      </form>
    </Grid>
)}


