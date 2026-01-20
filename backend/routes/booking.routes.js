import express from 'express';
import {
  createBooking,
  sendOTP,
  verifyOTP,
  createPaymentOrder,
  verifyPayment,
  getBookingHistory,
  userUpdate,
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/create', createBooking);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/payment/order', createPaymentOrder);
router.post('/payment/verify', verifyPayment);
router.get("/history", getBookingHistory);
router.put("/user-update", userUpdate )

export default router;
