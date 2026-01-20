import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String, // Will be hashed
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
