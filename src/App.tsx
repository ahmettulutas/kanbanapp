import './App.css';
import Auth from './auth/AuthComponent';
import {useSelector} from 'react-redux';
import { selectSuccess } from "./auth/AuthSlice";
import {Routes, Route, Navigate } from "react-router-dom";
import Boards from './components/Boards/Boards';
import SingleBoard from './components/Boards/SingleBoard';
import { Login } from '@mui/icons-material';
import Register from './auth/Register';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  const loginBool = useSelector(selectSuccess);
  return (
    <main style={{minHeight:"100vh", display:"grid", gridTemplateRows:"auto 1fr "}}>
      <ResponsiveAppBar />
      <section>
        <Routes>
          {loginBool ? <Route path="/" element={<Boards />} /> : <Route path="/" element={<Auth />} />}
          <Route path="/:id" element={<SingleBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </main>
  )}

export default App;
