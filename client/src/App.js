import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Payment from './PaymentForm';
import Dashboard from './Dashboard';
import Register from './Register';
import EmployeeLogin from './EmployeeLogin';
import EmployeeDashboard from './EmployeeDashboard';

function App() {
  const token = localStorage.getItem('token');
  console.log("Token:", token); 

  return (
    <Router>
      <div>
        <h1>Payments Portal</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



