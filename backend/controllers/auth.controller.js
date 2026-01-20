// import User from "../models/user.js";
// import jwt from "jsonwebtoken";

// // ✅ Create JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ✅ Register
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, place } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     // Create user
//     const newUser = await User.create({ name, email, phone, place });

//     const token = generateToken(newUser._id);
//     res.status(201).json({ token, user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: "Registration failed", error: err.message });
//   }
// };

// // ✅ Login
// export const loginUser = async (req, res) => {
//   try {
//     const { email, phone } = req.body;

//     const user = await User.findOne({ email, phone });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };
