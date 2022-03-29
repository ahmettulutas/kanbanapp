import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
export default function ProtectedRoutee({auth, children}:any) {
  let navigate = useNavigate();
  return (
    <div>
      {auth ? children : <Navigate to="/register" replace />}
    </div>
  )
}
