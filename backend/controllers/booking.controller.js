import User from "../models/user.js";
import Booking from "../models/booking.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";
import razorpay from "../utils/razorpay.js";

import { generateOTPTemplate } from "../utils/emailTemplates.js"; 

dotenv.config();

const otpStore = {};

export const getBookingHistory = async (req, res) => {
  try {
    const { email } = req.query;

    const bookings = await Booking.find()
      .populate({
        path: "user",
        match: { email },
        select: "email",
      })
      .lean();

    
    const filtered = bookings.filter((b) => b.user !== null);

    res.status(200).json({ bookings: filtered });
  } catch (err) {
    console.error("❌ Error in booking history:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      tableType,
      spaceType,
      date,
      time,
      noOfPeople,
    } = req.body;

    // Basic validations
    if (
      !name ||
      !email ||
      !phone ||
      !serviceType ||
      !date ||
      !time ||
      !noOfPeople
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Conditional validations
    if (serviceType === "DINEOUT" && !tableType) {
      return res
        .status(400)
        .json({ error: "Table type is required for Dineout." });
    }

    if (serviceType === "MOCKTAIL" && !spaceType) {
      return res
        .status(400)
        .json({ error: "Space type is required for Mocktail." });
    }

    // Create or find user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }

    // Pricing logic
    let price = 0;
    let calculationNote = "";

    if (serviceType === "DINEOUT") {
      const pricePerPerson = 300;
      price = pricePerPerson * noOfPeople;
      calculationNote = `${noOfPeople} × ₹${pricePerPerson} per person`;
    } else if (serviceType === "MOCKTAIL") {
      const spacePriceMap = {
        mocktail: 800,
        hookah: 1000,
        both: 1500,
      };
      price = spacePriceMap[spaceType] || 1000;
      calculationNote = `Flat ₹${price} for ${spaceType}`;
    } else if (serviceType === "EVENT") {
      price = 5000;
      calculationNote = `Advance ₹${price} for event reservation`;
    }

    // Create booking
    const booking = await Booking.create({
      user: user._id,
      serviceType,
      tableType: tableType || null,
      spaceType: spaceType || null,
      date,
      time,
      noOfPeople,
      price,
      calculationNote,
    });

    res.status(201).json({
      message: "Booking created",
      bookingId: booking._id,
      calculatedAmount: price,
      note: calculationNote,
    });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Send OTP to email

export const sendOTP = async (req, res) => {
  try {
    const { email, name } = req.body; 

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = otp;
    const emailHtml = generateOTPTemplate(otp, name || "Guest");
    await sendEmail({
      to: email,
      subject: "Your Verification Code - Mitroz.", 
      text: `Your OTP is ${otp}. It expires in 10 minutes.`, 
      html: emailHtml, 
    });

    res.json({ message: "OTP sent successfully", success: true });

  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Failed to send OTP", success: false });
  }
};

// Verify OTP
export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ verified: true });
  }
  return res.status(400).json({ error: "Invalid OTP" });
};



// Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking || booking.isPaid) {
      return res.status(404).json({ error: "Invalid booking" });
    }

    const options = {
      amount: booking.price * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      amount: order.amount,
      orderId: order.id, 
    });
  } catch (err) {
    console.error("❌ Order Creation Error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// Verify Razorpay Signature
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    //  Mark booking as paid
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentId: razorpay_payment_id,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Payment Verification Error:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};


export const userUpdate = async (req, res) => {
  const { email, name, phone } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name, phone } },
      { new: true, upsert: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
}

