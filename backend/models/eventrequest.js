
import mongoose from 'mongoose';

const eventRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },

  eventType: {
    type: String, // birthday, anniversary, custom
    required: true,
  },
  noOfGuests: {
    type: Number,
    required: true,
  },
  addOns: [String], // e.g., ['cake', 'decoration', 'music']
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },

  // ✅ New fields below 👇
  estimatedPrice: {
    type: Number,
    default: 5000, // default advance
  },
  calculationNote: {
    type: String,
    default: "Flat ₹5000 advance for event",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
    default: null,
  },

  isConfirmed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('EventRequest', eventRequestSchema);
