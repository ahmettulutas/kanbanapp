import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from './AuthSlice';
interface IRegisterFormProps {
  username: string,
  password: string | number,
  passwordConfirm: string | number,
}
export default function Register () {
  const [form, setForm] = useState<IRegisterFormProps>({username: '', password: '', passwordConfirm: ''});
  const dispatch = useDispatch();
  // controls the form
  const handleChange = (event:any) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }
  // handles the submit
  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(register(form));
    setForm({username: '', password: '', passwordConfirm: ''});
  }
  return (
    <form onSubmit={handleSubmit} style={{minHeight:"300px", textAlign:"center", display:"flex", margin:"1rem auto", width:"100%",flexDirection:"column", gap:"1rem"}}>
      <Typography sx={{margin:"0rem auto", fontWeight:"bold"}}>Register</Typography>
      <TextField onChange={handleChange} value={form.username} name="username" id="username" label="name" variant="outlined" />
      <TextField onChange={handleChange} value={form.password} name="password" type="password" label="password" id="password" variant="outlined" />
      <TextField onChange={handleChange} value={form.passwordConfirm} name="passwordConfirm" label="password" type="password" id="passwordConfirm" variant="outlined" />
      <Button type="submit" sx={{p:2}} variant="contained" color="success">Register</Button>
    </form>
  )
}
