import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useBooking } from "../context/BookingContext";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ChevronRight,
  Flame,
  Wine,
  PartyPopper,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const MocktailForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "MOCKTAIL",
    spaceType: "", // mocktail | hookah | both
    date: "",
    time: "",
    noOfPeople: 2,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static Times for Lounge
  const loungeTimes = [
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  // Date Logic
  const today = new Date();
  const dateOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const label =
      i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const value = d.toISOString().split("T")[0];
    return { label, dayNum, month, value };
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (num) => {
    setForm({ ...form, noOfPeople: num });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Double submit guard
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const res = await axios.post("/bookings/create", form);

      toast.success("Reservation request sent!");

      setBookingData({
        ...form,
        price: res.data.calculatedAmount,
        bookingId: res.data.bookingId,
      });

      await axios.post("/bookings/send-otp", {
        email: form.email,
      });

      navigate("/otp-verify");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to book lounge. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.spaceType &&
    form.date &&
    form.time;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-10 pt-4 md:pt-10 px-4 md:px-8 font-sans -mt-5">
      {/* Header (Desktop) */}
      <div className="max-w-6xl mx-auto mb-8 hidden md:block">
        <h1 className="text-3xl font-bold text-gray-900">Lounge Reservation</h1>
        <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
          <span>Home</span> <ChevronRight size={14} /> <span>Lounge</span>{" "}
          <ChevronRight size={14} />{" "}
          <span className="text-orange-600 font-medium">Book Slot</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN: THE FORM ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Vibe Selection (Service Type) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Wine size={20} />
              </div>
              Choose your Vibe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Mocktail",
                  value: "mocktail",
                  img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop",
                  icon: Wine,
                },
                {
                  label: "Hookah",
                  value: "hookah",
                  img: "https://images.unsplash.com/photo-1574238752695-675b86d49267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  icon: Flame,
                },
                {
                  label: "Both",
                  value: "both",
                  img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=400&auto=format&fit=crop",
                  icon: PartyPopper,
                },
              ].map((item) => (
                <div
                  key={item.value}
                  onClick={() => setForm({ ...form, spaceType: item.value })}
                  className={`relative h-40 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                    form.spaceType === item.value
                      ? "ring-[3px] ring-orange-500 ring-offset-2 shadow-xl"
                      : "hover:shadow-lg opacity-90 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 transition-all ${form.spaceType === item.value ? "opacity-100" : "opacity-80"}`}
                  >
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <item.icon className="text-orange-400 w-5 h-5" />
                        <span className="text-white font-bold text-lg">
                          {item.label}
                        </span>
                      </div>
                      {form.spaceType === item.value && (
                        <CheckCircle
                          className="text-orange-400 fill-white"
                          size={24}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Date & Time Selection */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Calendar size={20} />
              </div>
              Date & Time
            </h2>

            {/* Date Scroll */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Select Date
              </label>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setForm({ ...form, date: date.value })}
                    className={`relative min-w-[5.5rem] h-24 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      form.date === date.value
                        ? "bg-gray-900 border-gray-900 text-white shadow-lg transform -translate-y-1"
                        : "bg-white border-gray-200 text-gray-600 hover:border-orange-400 hover:bg-orange-50"
                    }`}
                  >
                    <span className="text-xs font-medium opacity-80">
                      {date.label}
                    </span>
                    <span className="text-2xl font-bold">{date.dayNum}</span>
                    <span className="text-xs font-medium opacity-80">
                      {date.month}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Grid */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Select Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {loungeTimes.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setForm({ ...form, time: slot })}
                    className={`py-2 px-1 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                      form.time === slot
                        ? "bg-orange-500 border-orange-500 text-white shadow-md"
                        : "bg-gray-50 border-gray-100 text-gray-600 hover:border-orange-300 hover:bg-white"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Guests & Contact */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Users size={20} />
              </div>
              Guests & Details
            </h2>

            {/* Guests */}
            <div className="mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Total Guests
              </label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleGuestChange(num)}
                    className={`w-12 h-12 rounded-xl text-lg font-bold flex items-center justify-center transition-all ${
                      form.noOfPeople === num
                        ? "bg-orange-500 text-white shadow-md ring-2 ring-orange-500 ring-offset-2"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                  <User size={18} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="relative group md:col-span-2">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                  <Mail size={18} className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: STICKY SUMMARY (DESKTOP) ================= */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
              {/* Summary Header */}
              <div className="bg-gray-900 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-20 -translate-y-8 translate-x-8"></div>
                <h3 className="text-lg font-bold relative z-10">
                  Booking Summary
                </h3>
                <p className="text-gray-400 text-sm relative z-10">
                  Lounge & Bar Access
                </p>
              </div>

              {/* Summary Body */}
              <div className="p-6 space-y-6">
                {/* Date & Time Row */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Time Slot
                    </p>
                    <p className="text-gray-900 font-bold">
                      {form.date
                        ? new Date(form.date).toDateString()
                        : "Select Date"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {form.time || "--:--"}
                    </p>
                  </div>
                </div>

                {/* Vibe Row */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Flame size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Experience
                    </p>
                    <p className="text-gray-900 font-bold capitalize">
                      {form.spaceType || "Not Selected"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {form.noOfPeople} Guests
                    </p>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 my-2"></div>

                {/* Submit Button (Desktop) */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg 
  flex items-center justify-center gap-3 
  transition-all transform
  ${
    isFormValid && !isSubmitting
      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 py-2 rounded-lg">
                  <ShieldCheck size={14} /> Instant Confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE STICKY FOOTER ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase">
              Selection
            </span>
            <span className="text-lg font-bold text-gray-900 capitalize">
              {form.spaceType || "Choose Type"}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`flex-1 h-12 rounded-xl font-bold 
              flex items-center justify-center gap-2 transition-all
              ${
                isFormValid && !isSubmitting
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Booking...
              </>
            ) : (
              <>
                Book Now <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MocktailForm;
