import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', idNumber: '', accountNumber: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered!');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" onChange={handleChange} required pattern="^[a-zA-Z ]{3,}$" />
      <input name="idNumber" onChange={handleChange} required pattern="\d{6,}" />
      <input name="accountNumber" onChange={handleChange} required pattern="\d{10,}" />
      <input name="password" type="password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
