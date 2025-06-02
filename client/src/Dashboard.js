import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in.');
      navigate('/');
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/payment/customer', {
  headers: { Authorization: `Bearer ${token}` },
});

        const data = await res.json();
        if (res.ok) {
          setPayments(data);
        } else {
          console.error(data.message || 'Failed to fetch payments');
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome to Your Personal Dashboard</h2>

      <button onClick={() => navigate('/payment')}>Go to Payment</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>

      <h3>Your Payments</h3>
      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments made yet.</p>
      ) : (
        <ul>
          {payments.map((p) => (
            <li key={p._id}>
              Paid R{p.amount.toFixed(2)} on {new Date(p.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;

