import express from 'express';
import { login, register } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('fullName').notEmpty(),
  body('idNumber').isLength({ min: 6 }),
  body('accountNumber').notEmpty(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('accountNumber').notEmpty(),
  body('password').notEmpty()
], login);

export default router;


