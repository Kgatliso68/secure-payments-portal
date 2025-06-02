import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullName, idNumber, accountNumber, password } = req.body;

  const namePattern = /^[a-zA-Z\s]+$/;
  const idPattern = /^\d{6,13}$/;
  const accountPattern = /^\d{8,20}$/;

  if (!namePattern.test(fullName)) {
    return res.status(400).json({ message: 'Full Name must contain only letters and spaces.' });
  }

  if (!idPattern.test(idNumber)) {
    return res.status(400).json({ message: 'ID Number must be 6–13 digits.' });
  }

  if (!accountPattern.test(accountNumber)) {
    return res.status(400).json({ message: 'Account Number must be 8–20 digits.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { accountNumber, password } = req.body;

  try {
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        accountNumber: user.accountNumber,
        role: 'customer'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(200).json({
      token,
      user: {
        fullName: user.fullName,
        accountNumber: user.accountNumber
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};





