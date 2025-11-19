import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportForm from './pages/ReportForm';
import AdminDashboard from './pages/AdminDashboard';

export default function App(){
  return (
    <div>
      <nav style={{display:'flex',gap:10,padding:10}}>
        <Link to="/">Home</Link>
        <Link to="/report">Report</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div style={{padding:20}}>Welcome to Smart Waste</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/report" element={<ReportForm/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </div>
  );
}
