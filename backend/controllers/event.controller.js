import EventRequest from "../models/eventrequest.js";
import sendEmail from "../utils/sendEmail.js";

import crypto from "crypto";
import razorpay from "../utils/razorpay.js";

//  User: Submit new event request
export const submitEventRequest = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      noOfGuests,
      addOns,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    const newEvent = await EventRequest.create({
      name,
      email,
      phone,
      eventType,
      noOfGuests,
      addOns,
      preferredDate,
      preferredTime,
      message,
    });

    await sendEmail({
      to: email,
      subject: "Event Request Received",
      text: `Hi ${name},\n\nWe've received your request for a ${eventType} event on ${preferredDate} at ${preferredTime}. Our team will contact you soon.\n\nThank you!`,
    });

    //send event ID and price back to frontend
    res.status(201).json({
      message: "Event request submitted successfully",
      bookingId: newEvent._id,
      calculatedAmount: newEvent.estimatedPrice,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit event request" });
  }
};


export const createEventPaymentOrder = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await EventRequest.findById(eventId);
    if (!event || event.isPaid) {
      return res.status(404).json({ error: "Invalid or already paid event" });
    }

    const amount = event.estimatedPrice * 100; // ₹ to paise

    const options = {
      amount,
      currency: "INR",
      receipt: `event_receipt_${event._id}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ Failed to create Razorpay order for event:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const verifyEventPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      eventId,
    } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Missing eventId in request" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = await EventRequest.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.isPaid = true;
    event.paymentId = razorpay_payment_id;
    await event.save();

    res.json({ success: true, message: "Event payment verified " });
  } catch (error) {
    console.error("❌ Error verifying event payment:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

// Admin: Get all event requests
export const getAllEventRequests = async (req, res) => {
  try {
    const events = await EventRequest.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event requests" });
  }
};

//  Admin: Confirm event request
export const confirmEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await EventRequest.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.isConfirmed = true;
    await event.save();

    // Send confirmation email
    await sendEmail({
      to: event.email,
      subject: "Event Confirmed",
      text: `Hi ${event.name},\n\nYour ${
        event.eventType
      } event for ${event.preferredDate.toDateString()} at ${
        event.preferredTime
      } has been confirmed. Our team will reach out with more details.\n\nThank you!`,
    });

    res.json({ message: "Event confirmed and email sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to confirm event" });
  }
};
