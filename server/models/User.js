import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  idNumber: String,
  accountNumber: String,
  password: String,
});

export default mongoose.model('User', userSchema);
