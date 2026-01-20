import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import DineoutForm from "./pages/DineoutForm";
import MocktailForm from "./pages/MocktailForm";
import EventForm from "./pages/EventForm";
import Summary from "./pages/BookingSummary";
import Success from "./pages/PaymentSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OtpVerify from "./pages/OtpVerify";
import AdminEventList from "./pages/AdminEventList";
import BookingHistory from "./pages/BookingHistory";
import Navbar from "./pages/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLayoutEffect, useState } from "react";

// Wrap in a component to access location
const AppLayout = () => {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const adminRoutes = ["/admin-login", "/admin-dashboard", "/admin/event-requests"];

  const shouldShowNavbar = !adminRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dineout" element={<DineoutForm />} />
        <Route path="/mocktail" element={<MocktailForm />} />
        <Route path="/event" element={<EventForm />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/success" element={<Success />} />
        <Route path="/my-profile" element={<BookingHistory />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/event-requests" element={<AdminEventList />} />
      </Routes>
    </>
  );
};

// Wrap BrowserRouter outside for `useLocation` to work
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
