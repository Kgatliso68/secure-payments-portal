import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import Employee from '../models/Employee.js';

const router = express.Router();


router.post('/login', [
  body('username')
    .matches(/^[a-zA-Z0-9_]{4,20}$/)
    .withMessage('Username must be alphanumeric (4–20 characters).'),
  body('password')
    .matches(/^[\w@-]{6,20}$/)
    .withMessage('Password must be 6–20 characters and include only letters, numbers, and _ @ -'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ username });
    if (!employee)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: employee._id, role: 'employee' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

