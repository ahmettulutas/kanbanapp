import './App.css';
import {useSelector} from 'react-redux';
import { selectSuccess } from "./auth/AuthSlice";
import {Routes, Route } from "react-router-dom";
import Boards from './components/Boards/Boards';
import SingleBoard from './components/Boards/SingleBoard';
import Login from './auth/Login';
import Register from './auth/Register';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ProtectedRoute from './components/ProtectedRouter';
import { useEffect } from 'react';

function App() {
  const loginBool = useSelector(selectSuccess); 
  return (
    <main style={{minHeight:"100vh", display:"grid", gridTemplateRows:"auto 1fr "}}>
      <ResponsiveAppBar />
      <section>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Boards/></ProtectedRoute>} />
          <Route path="/:boardId" element={<ProtectedRoute><SingleBoard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </section>
    </main>
  )}

export default App;
