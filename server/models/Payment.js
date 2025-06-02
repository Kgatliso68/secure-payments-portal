import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  accountNumber: { type: String }, 
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
