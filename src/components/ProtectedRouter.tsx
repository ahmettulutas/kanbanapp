import React, { useEffect } from 'react'
import { Navigate, useNavigate, useLocation} from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectSuccess, selectToken, selectAuth } from "../auth/AuthSlice";
import LoadingComponent from '../components/LoadingComponent';
export default function ProtectedRoute({children}:any) {
  const {loading} = useSelector(selectAuth);
  const location = useLocation();
  const loginBool = useSelector(selectSuccess);
  useEffect(() => {

  }, [])
  if(loading) {
    return <LoadingComponent />
  }  
  if(!loginBool) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  } 
  else {
    return children
  } 
}
