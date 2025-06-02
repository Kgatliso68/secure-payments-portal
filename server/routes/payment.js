import express from 'express';
import { body } from 'express-validator';
import { processPayment,getAllPayments, getCustomerPayments } from '../controllers/paymentController.js';
import { authenticateToken, authenticateEmployee } from '../middleware.js';


const router = express.Router();


router.post('/', [
  body('amount')
    .isFloat({ gt: 0 }).withMessage('Amount must be a number greater than 0'),
  body('recipient')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Recipient name must contain only letters and spaces')
], processPayment);

router.get('/customer', authenticateToken, getCustomerPayments);
router.get('/', authenticateEmployee, getAllPayments);
export default router;
