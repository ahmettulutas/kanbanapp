import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
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
    <form onSubmit={handleSubmit} style={{ minHeight:"300px", display:"flex", margin:"0.5rem auto", width:"100%",flexDirection:"column", gap:"0.3rem"}}>
      <Typography sx={{margin:"0rem auto", fontWeight:"bold"}}>Login</Typography>
      <TextField name="username" value={form.username} onChange={handleChange} id="filled-basic" label="name" variant="outlined" />
      <TextField name="password" value={form.password} onChange={handleChange} type="password" id="filled-basic" label="password" variant="outlined" />
      <Button type="submit" sx={{p:2}} variant="contained" color="success">Login</Button>
    </form>
  )
}


