import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PaymentForm() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    currency: 'ZAR'
  });

  const [message, setMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to make a payment.');
      return;
    }
const recipientPattern = /^[a-zA-Z\s]+$/;
const amountPattern = /^\d+(\.\d{1,2})?$/; 

if (!recipientPattern.test(formData.recipient)) {
  setMessage('Recipient name must only contain letters and spaces.');
  return;
}

if (!amountPattern.test(formData.amount)) {
  setMessage('Amount must be a valid number (max 2 decimal places).');
  return;
}

    try {
      const res = await axios.post('http://localhost:5000/api/payment', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(res.data.message || 'Payment processed successfully');
      setPaymentSuccess(true); 
    } catch (err) {
      setMessage(err.response?.data?.message || 'Payment failed');
      setPaymentSuccess(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Make a Payment</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          name="recipient" 
          value={formData.recipient} 
          onChange={handleChange} 
          required 
          className="input-field" 
          placeholder="Recipient"
        />
        <input 
          type="number" 
          name="amount" 
          value={formData.amount} 
          onChange={handleChange} 
          required 
          className="input-field" 
          placeholder="Amount"
        />
        <select 
          name="currency" 
          value={formData.currency} 
          onChange={handleChange} 
          className="input-field"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ZAR">ZAR</option>
        </select>
        <button type="submit" className="button primary">Submit Payment</button>
      </form>

      {message && (
        <p className={paymentSuccess ? 'success' : 'error'}>
          {message}
        </p>
      )}

  
      {paymentSuccess && (
        <button onClick={() => navigate('/dashboard')} className="button secondary" style={{ marginTop: '1rem' }}>
          Go to Dashboard
        </button>
      )}
    </div>
  );
}

export default PaymentForm;

