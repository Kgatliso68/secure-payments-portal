import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountPattern = /^\d{8,20}$/;

if (!accountPattern.test(formData.accountNumber)) {
  setMessage('Invalid account number format.');
  return;
}
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;

      localStorage.setItem('token', token);

      setMessage('Login successful!');
      navigate('/payment'); 
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="card">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          name="accountNumber" 
          value={formData.accountNumber} 
          onChange={handleChange} 
          required 
          className="input-field" 
          placeholder="Account Number"
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          className="input-field" 
          placeholder="Password"
        />
        <button type="submit" className="button primary">Login</button>
      </form>
      {message && (
        <p className={message.includes('failed') ? 'error' : 'success'}>
          {message}
        </p>
      )}
      <button onClick={redirectToRegister} className="button secondary">
        Don't have an account? Register here.
      </button>
    </div>
  );
}

export default Login;


