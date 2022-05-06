import React from 'react';
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({component}) {
  return (localStorage.getItem('jwt')) ? component : <Navigate to="/" />
}