import Payment from '../models/Payment.js';
import jwt from 'jsonwebtoken';

export const processPayment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const customerName = decoded.fullName;
    const accountNumber = decoded.accountNumber;


    const { amount, recipient } = req.body;



    const newPayment = new Payment({
      customerName,
      accountNumber,
      amount,
      date: new Date()
    });

    await newPayment.save();

    return res.status(200).json({ message: 'Payment processed and saved successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Payment processing failed.', error: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 }).limit(10);
    return res.status(200).json(payments);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching payments.', error: err.message });
  }
};

export const getCustomerPayments = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const payments = await Payment.find({ accountNumber: decoded.accountNumber }).sort({ date: -1 });

    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch customer payments', error: error.message });
  }
};