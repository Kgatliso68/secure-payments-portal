import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
const namePattern = /^[a-zA-Z\s]+$/;
const idPattern = /^\d{6,13}$/;
const accountPattern = /^\d{8,20}$/;

if (!namePattern.test(formData.fullName)) {
  setMessage('Full Name must contain only letters and spaces.');
  return;
}

if (!idPattern.test(formData.idNumber)) {
  setMessage('ID Number must be 6–13 digits.');
  return;
}

if (!accountPattern.test(formData.accountNumber)) {
  setMessage('Account Number must be 8–20 digits.');
  return;
}

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      setMessage(err.response?.data?.errors?.[0]?.msg || 'Registration failed.');
    }
  };

  return (
    <div className="card">
      <h2 className="title">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <input 
          type="text" 
          name="idNumber" 
          placeholder="ID Number" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <input 
          type="text" 
          name="accountNumber" 
          placeholder="Account Number" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="input-field" 
        />
        <button type="submit" className="button primary">Register</button>
      </form>

      {message && (
        <p className={message.includes('failed') ? 'error' : 'success'}>
          {message}
        </p>
      )}

      <button 
        onClick={() => navigate('/login')} 
        className="button secondary"
      >
        Back to Login
      </button>
    </div>
  );
};

export default Register;


