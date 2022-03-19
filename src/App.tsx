import './App.css';
import React from 'react';
import Auth from './auth/AuthComponent';
import {useSelector} from 'react-redux';
import { selectSuccess } from "./auth/AuthSlice";
import {Routes, Route, Navigate } from "react-router-dom";
import Boards from './components/Boards';
import SingleBoard from './components/Board';

function App() {
  const loginBool = useSelector(selectSuccess);
  return (
  <Routes>
      {loginBool ? <Route path="/" element={<Boards />} /> : <Route path="/" element={<Auth />} />}
      <Route path="/:id" element={<SingleBoard />} />
      <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  );
}

export default App;
