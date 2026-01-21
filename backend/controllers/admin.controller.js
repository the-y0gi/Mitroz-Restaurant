import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EventRequest from "../models/eventrequest.js";
import Booking from "../models/booking.js";



// Admin Creator Function
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Failed to create admin" });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // JWT token generate here
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return token to frontend
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalPaid = await Booking.countDocuments({ isPaid: true });

    const totalEarningsResult = await Booking.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    const dineoutEarnings = totalEarningsResult[0]?.total || 0;

    const totalEvents = await EventRequest.countDocuments();
    const paidEvents = await EventRequest.countDocuments({ isPaid: true });

    const eventEarningsResult = await EventRequest.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$estimatedPrice" } } }
    ]);
    const eventEarnings = eventEarningsResult[0]?.total || 0;

    const totalEarnings = dineoutEarnings + eventEarnings;

    // Upcoming DINEOUT/MOCKTAIL bookings (not events)
    const upcomingBookings = await Booking.find({
      date: { $gte: new Date() }
    })
      .sort({ date: 1 })
      .populate("user", "name email")
      .select("user serviceType date time price calculationNote isPaid");

    res.json({
      totalBookings,
      totalPaid,
      totalEvents,
      paidEvents,
      totalEarnings,
      dineoutEarnings,
      eventEarnings,
      upcomingBookings
    });
  } catch (error) {
    console.error("❌ Error in dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
