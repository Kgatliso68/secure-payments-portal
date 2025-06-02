import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log('Login form submitted');

  const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
  const passwordPattern = /^[\w@-]{6,20}$/;

  if (!usernamePattern.test(username)) {
    alert('Username must be alphanumeric (letters, numbers, underscores) and 6–20 characters.');
    return;
  }

  if (!passwordPattern.test(password)) {
    alert('Password must be between 6–20 characters (letters, numbers, and symbols).');
    return;
  }

  try {
    console.log('Sending login request...');
    const res = await fetch('http://localhost:5000/employee/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log('Response:', data); 

    if (res.ok) {
      localStorage.setItem('employeeToken', data.token);
      navigate('/employee/dashboard');
    } else {
      alert(data.message || 'Unsuccessful Login');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Employee Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default EmployeeLogin;
