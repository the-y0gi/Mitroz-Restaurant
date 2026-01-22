import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import axios from "../api/axios";
import toast from "react-hot-toast";
import {
  Cake,
  Gift,
  Mail,
  Phone,
  User,
  Music,
  CalendarClock,
  CheckCircle,
  ChevronRight,
  PartyPopper,
  Sparkles,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// Image Imports
import imgP from "../assets/img4.jpg";
import imgC from "../assets/img5.jpg";
import imgA from "../assets/img6.jpg";
import imgBB from "../assets/imgBB.jpg";

const EventForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    noOfGuests: 10,
    addOns: [],
    preferredDate: "",
    preferredTime: "",
    message: "",
    serviceType: "EVENT",
  });

  const [loading, setLoading] = useState(false);

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

  const eventTimes = [
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const addOnOptions = [
    { label: "DJ Night", icon: Music },
    { label: "Custom Cake", icon: Cake },
    { label: "Premium Decor", icon: Gift },
  ];

  const eventTypes = [
    { type: "Birthday", img: imgBB },
    { type: "Anniversary", img: imgA },
    { type: "Farewell", img: imgC },
    { type: "Engagement", img: imgP },
  ];

  const toggleAddOn = (addon) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addon)
        ? prev.addOns.filter((a) => a !== addon)
        : [...prev.addOns, addon],
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = { ...form };
      const res = await axios.post("/events/request", payload);

      await axios.post("/bookings/send-otp", { email: form.email });

      setBookingData({
        ...form,
        bookingId: res.data.bookingId,
        date: form.preferredDate,
        time: form.preferredTime,
        noOfPeople: form.noOfGuests,
        price: res.data.calculatedAmount,
        serviceType: "EVENT",
      });

      toast.success("🎉 Event request submitted! Please verify OTP.");

      // Step 4: Navigate
      navigate("/otp-verify");
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        "❌ Failed to submit request. Try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.eventType &&
    form.preferredDate &&
    form.preferredTime;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-10 pt-4 md:pt-10 px-4 md:px-8 font-sans">
      {/* Header (Desktop) */}
      <div className="max-w-6xl mx-auto mb-8 hidden md:block">
        <h1 className="text-3xl font-bold text-gray-900">Plan your Event</h1>
        <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
          <span>Home</span> <ChevronRight size={14} /> <span>Celebrations</span>{" "}
          <ChevronRight size={14} />{" "}
          <span className="text-orange-600 font-medium">Book Venue</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN: THE FORM ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Event Type Selection */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                <PartyPopper size={20} />
              </div>
              What are we celebrating?
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {eventTypes.map(({ type, img }) => (
                <div
                  key={type}
                  onClick={() => setForm({ ...form, eventType: type })}
                  className={`relative h-36 md:h-44 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                    form.eventType === type
                      ? "ring-[3px] ring-orange-500 ring-offset-2 shadow-xl"
                      : "hover:shadow-lg opacity-90 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={type}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 transition-all ${form.eventType === type ? "opacity-100" : "opacity-80"}`}
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-white font-bold text-lg md:text-xl">
                        {type}
                      </span>
                      {form.eventType === type && (
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

          {/* 2. Date & Time */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <CalendarClock size={20} />
              </div>
              When is the party?
            </h2>

            {/* Date Scroll */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Preferred Date
              </label>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {dateOptions.map((date) => (
                  <button
                    key={date.value}
                    onClick={() =>
                      setForm({ ...form, preferredDate: date.value })
                    }
                    className={`relative min-w-[5.5rem] h-24 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      form.preferredDate === date.value
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
                Start Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {eventTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setForm({ ...form, preferredTime: time })}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      form.preferredTime === time
                        ? "bg-orange-500 border-orange-500 text-white shadow-md"
                        : "bg-gray-50 border-gray-100 text-gray-600 hover:border-orange-300 hover:bg-white"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Guests & Add-ons */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Gift size={20} />
              </div>
              Customize Experience
            </h2>

            {/* Guests */}
            <div className="mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Expected Guests
              </label>
              <div className="flex flex-wrap gap-3">
                {[10, 20, 30, 40, 50, 100].map((num) => (
                  <button
                    key={num}
                    onClick={() => setForm({ ...form, noOfGuests: num })}
                    className={`h-12 px-5 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                      form.noOfGuests === num
                        ? "bg-orange-500 text-white shadow-md ring-2 ring-orange-500 ring-offset-2"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {num} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Add Ons */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Special Add-ons
              </label>
              <div className="grid grid-cols-3 gap-3">
                {addOnOptions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => toggleAddOn(label)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      form.addOns.includes(label)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 mb-2 ${form.addOns.includes(label) ? "text-orange-600" : "text-gray-400"}`}
                    />
                    <span className="text-xs md:text-sm font-bold">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Details */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <User size={20} />
              </div>
              Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                icon={User}
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                icon={Phone}
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <Input
                  icon={Mail}
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-orange-300 focus-within:bg-white transition-all">
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                  <textarea
                    name="message"
                    placeholder="Any special request? (e.g. Pure Veg food, Balloon color theme...)"
                    value={form.message}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 min-h-[80px] resize-none"
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
                <h3 className="text-lg font-bold relative z-10">
                  Event Summary
                </h3>
                <p className="text-gray-400 text-sm relative z-10">
                  Grand Celebration
                </p>
              </div>

              {/* Summary Body */}
              <div className="p-6 space-y-6">
                {/* Event Type */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Occasion
                    </p>
                    <p className="text-gray-900 font-bold text-lg">
                      {form.eventType || "Select Type"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {form.noOfGuests} Guests
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">
                      Schedule
                    </p>
                    <p className="text-gray-900 font-bold">
                      {form.preferredDate
                        ? new Date(form.preferredDate).toDateString()
                        : "Select Date"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {form.preferredTime || "--:--"}
                    </p>
                  </div>
                </div>

                {/* Addons List */}
                {form.addOns.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">
                      Extras Included
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {form.addOns.map((addon) => (
                        <span
                          key={addon}
                          className="text-xs font-semibold bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-700"
                        >
                          + {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-dashed border-gray-200 my-2"></div>

                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform ${
                    isFormValid && !loading
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? <>Requesting...</> : "Request Quote"}
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} /> Best Price Guaranteed
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
              Event
            </span>
            <span className="text-lg font-bold text-gray-900">
              {form.eventType || "Plan Event"}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
              !isFormValid
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : loading
                  ? "bg-orange-600/80 text-white cursor-wait"
                  : "bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-700 active:scale-95"
            }`}
          >
            {loading ? <>Requesting...</> : <>Request Quote</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Internal Input
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <input
        {...props}
        required
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 font-medium"
      />
    </div>
  </div>
);

export default EventForm;
