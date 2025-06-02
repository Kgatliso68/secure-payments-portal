import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('employeeToken');

    if (!token) {
      alert('Please log in as an employee.');
      navigate('/employee/login');
      return;
    }
    
    const fetchPayments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/payment', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        alert('Could not fetch payments. Please try again later.');
      }
    };

    fetchPayments();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('employeeToken'); 
    navigate('/employee/login'); 
  };

  return (
    <div>
      <h2>All Customer Payments</h2>
      {payments.length === 0 ? (
        <p>No payments available.</p>
      ) : (
        <ul>
          {payments.map((p) => (
            <li key={p._id}>
              {p.customerName} paid ${p.amount.toFixed(2)} on{' '}
              {new Date(p.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
        Logout
      </button>
    </div>
  );
}

export default EmployeeDashboard;

