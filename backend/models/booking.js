

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['DINEOUT', 'MOCKTAIL', 'EVENT'],
    required: true,
  },
  tableType: {
    type: String, // indoor / outdoor / premium (for dineout)
    default: null,
  },
  spaceType: {
    type: String, // mocktail / hookah / both (for mocktail)
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  noOfPeople: {
    type: Number,
    default: 0, // For EVENT or MOCKTAIL where this may not apply
  },
  price: {
    type: Number,
    required: true,
  },
  calculationNote: {
    type: String,
    default: "",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
    default: null,
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
