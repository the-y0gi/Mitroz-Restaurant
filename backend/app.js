import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";


// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import restaurantRoutes from "./routes/restaurant.routes.js";

import bookingRoutes from "./routes/booking.routes.js";
import eventRoutes from "./routes/event.routes.js";
import adminRoutes from "./routes/admin.routes.js";


connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`server is running ${PORT}`);
})

export default app;
