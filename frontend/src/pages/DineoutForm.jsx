import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import axios from "axios";
import { toast } from "react-toastify";
import img1 from "../assets/premium.jpg";
import imgOutdoor from "../assets/nightBtn.jpg";
import imgIndoor from "../assets/dayBtn.jpg";
import TimeSlotPicker from "../components/TimeSlotPicker";

import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Sparkles,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const DineoutForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "DINEOUT",
    tableType: "",
    date: "",
    time: "",
    noOfPeople: 2,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (num) => {
    setForm({ ...form, noOfPeople: num });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const price = form.noOfPeople * 300;
      const res = await axios.post(
        "http://localhost:4000/api/bookings/create",
        { ...form, price }
      );
      toast.success("Reservation Initiated!");
      setBookingData({ ...form, price, bookingId: res.data.bookingId });
      await axios.post("http://localhost:4000/api/bookings/send-otp", {
        email: form.email,
      });
      navigate("/otp-verify");
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate booking.");
    }
  };

  // Date Logic
  const today = new Date();
  const dateOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const value = d.toISOString().split("T")[0];
    return { label, dayNum, month, value };
  });

  const isFormValid = form.name && form.email && form.phone && form.date && form.time && form.tableType;
  const totalPrice = form.noOfPeople * 300;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-10 pt-4 md:pt-10 px-4 md:px-8 font-sans">
      
      {/* Header Section (Desktop) */}
      <div className="max-w-6xl mx-auto mb-8 hidden md:block">
        <h1 className="text-3xl font-bold text-gray-900">Confirm your reservation</h1>
        <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
          <span>Home</span> <ChevronRight size={14}/> <span>Dining</span> <ChevronRight size={14}/> <span className="text-orange-600 font-medium">Book Table</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT COLUMN: THE FORM ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Date & Time Selection Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><Calendar size={20}/></div>
              Date & Time
            </h2>

            {/* Date Scroll */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Select Date</label>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setForm({ ...form, date: date.value })}
                    className={`relative min-w-[5.5rem] h-24 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      form.date === date.value
                        ? "bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-900/20 transform -translate-y-1"
                        : "bg-white border-gray-200 text-gray-600 hover:border-orange-400 hover:bg-orange-50"
                    }`}
                  >
                    <span className="text-xs font-medium opacity-80">{date.label}</span>
                    <span className="text-2xl font-bold">{date.dayNum}</span>
                    <span className="text-xs font-medium opacity-80">{date.month}</span>
                    {form.date === date.value && (
                       <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Picker Component */}
            <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Select Time Slot</label>
              <TimeSlotPicker selectedDate={new Date(form.date)} form={form} setForm={setForm} />
            </div>
          </div>

          {/* 2. Seating & Guests Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><UtensilsCrossed size={20}/></div>
              Seating & Guests
            </h2>

            {/* Guest Count */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Number of Guests</label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleGuestChange(num)}
                    className={`w-12 h-12 rounded-xl text-lg font-bold flex items-center justify-center transition-all ${
                      form.noOfPeople === num
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 ring-2 ring-orange-500 ring-offset-2"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Type Grid */}
            <div>
               <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Where would you like to sit?</label>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: "Indoor", img: imgIndoor, desc: "Cozy & AC" },
                    { type: "Outdoor", img: imgOutdoor, desc: "Airy & Open" },
                    { type: "Premium", img: img1, desc: "Luxury View" },
                  ].map((item) => (
                    <div
                      key={item.type}
                      onClick={() => setForm({ ...form, tableType: item.type })}
                      className={`relative h-32 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                        form.tableType === item.type 
                          ? "ring-[3px] ring-orange-500 ring-offset-2 shadow-xl" 
                          : "hover:shadow-lg opacity-90 hover:opacity-100"
                      }`}
                    >
                      <img src={item.img} alt={item.type} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 transition-all ${form.tableType === item.type ? "opacity-100" : "opacity-80"}`}>
                        <div className="flex justify-between items-end">
                           <div>
                             <span className="text-white font-bold block">{item.type}</span>
                             <span className="text-gray-300 text-xs">{item.desc}</span>
                           </div>
                           {form.tableType === item.type && <CheckCircle className="text-orange-400 fill-white" size={20}/>}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* 3. Personal Details Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><User size={20}/></div>
              Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="relative group">
                 <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Full Name</label>
                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                    <User size={18} className="text-gray-400 mr-3"/>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder-gray-400"
                      required
                    />
                 </div>
               </div>

               <div className="relative group">
                 <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Phone Number</label>
                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                    <Phone size={18} className="text-gray-400 mr-3"/>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder-gray-400"
                      required
                    />
                 </div>
               </div>

               <div className="relative group md:col-span-2">
                 <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email Address</label>
                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                    <Mail size={18} className="text-gray-400 mr-3"/>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
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
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500 rounded-full blur-2xl opacity-20 -translate-y-10 translate-x-10"></div>
                  <h3 className="text-lg font-bold relative z-10">Reservation Summary</h3>
                  <p className="text-gray-400 text-sm relative z-10">Mitroz Premium Dining</p>
               </div>
               
               {/* Summary Body */}
               <div className="p-6 space-y-6">
                  {/* Date & Time Row */}
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <Calendar size={18} />
                     </div>
                     <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Date & Time</p>
                        <p className="text-gray-900 font-bold">{form.date ? new Date(form.date).toDateString() : "Select Date"}</p>
                        <p className="text-gray-600 text-sm">{form.time || "--:--"}</p>
                     </div>
                  </div>

                  {/* Guests Row */}
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Users size={18} />
                     </div>
                     <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Guests & Seating</p>
                        <p className="text-gray-900 font-bold">{form.noOfPeople} People</p>
                        <p className="text-gray-600 text-sm">{form.tableType || "Any Area"}</p>
                     </div>
                  </div>

                  {/* Price Divider */}
                  <div className="border-t border-dashed border-gray-200 my-2"></div>

                  <div className="flex justify-between items-center">
                     <span className="text-gray-600 font-medium">Total Payable</span>
                     <span className="text-2xl font-bold text-gray-900">₹{totalPrice}</span>
                  </div>

                  {/* Submit Button (Desktop) */}
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                      isFormValid 
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-xl" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Confirm Booking
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 py-2 rounded-lg">
                     <ShieldCheck size={14} /> Secure Booking
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
               <span className="text-xs text-gray-500 font-bold uppercase">Total</span>
               <span className="text-xl font-bold text-gray-900">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                isFormValid ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30" : "bg-gray-200 text-gray-400"
              }`}
            >
              Book Now <ArrowRight size={18} />
            </button>
         </div>
      </div>

    </div>
  );
};

export default DineoutForm;