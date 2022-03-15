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
const  Register = ()  => {
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
    <form onSubmit={handleSubmit} style={{display:"flex", margin:"1rem auto", maxWidth:"80%",flexDirection:"column", gap:"1rem"}}>
      <Typography>Register</Typography>
      <TextField onChange={handleChange} value={form.username} name="username" id="username" label="name" variant="filled" />
      <TextField onChange={handleChange} value={form.password} name="password" type="password" id="password" variant="filled" />
      <TextField onChange={handleChange} value={form.passwordConfirm} name="passwordConfirm" type="password" id="passwordConfirm" variant="filled" />
      <Button type="submit" sx={{p:2}} variant="contained" color="success">Register</Button>
    </form>
  )
}
export default Register;