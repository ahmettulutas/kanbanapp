import './App.css';
import React from 'react';
import Auth from './auth/AuthComponent';
import {useSelector} from 'react-redux';
import { selectSuccess } from "./auth/AuthSlice";
import {Routes, Route, Navigate } from "react-router-dom";
import Boards from './components/Boards/Boards';
import SingleBoard from './components/Boards/Board';
import { Login } from '@mui/icons-material';
import Register from './auth/Register';

function App() {
  const loginBool = useSelector(selectSuccess);
  return (
  <Routes>
      {loginBool ? <Route path="/" element={<Boards />} /> : <Route path="/" element={<Auth />} />}
      <Route path="/:id" element={<SingleBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  );
}

export default App;
