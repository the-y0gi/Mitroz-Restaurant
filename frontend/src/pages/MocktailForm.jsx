import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Phone,Martini , Flame } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const MocktailForm = () => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    spaceType: "",
    date: "",
    time: "",
    noOfPeople: 2,
  });

  const loungeTimes = [
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
    "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM",
  ];

  const today = new Date();
  const dateOptions = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
    const sub = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    const value = d.toISOString().split("T")[0];
    return { label, sub, value };
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
      const res = await axios.post("http://localhost:4000/api/bookings/create", form);
      toast.success("✅ OTP sent to your email.");
      setBookingData({ ...form, price: res.data.calculatedAmount, bookingId: res.data.bookingId });
      await axios.post("http://localhost:4000/api/bookings/send-otp", { email: form.email });
      navigate("/otp-verify");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to book lounge. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-6">🍹 Mocktail / Hookah Booking</h2>

        {/* Name */}
        <div className="mb-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
            <Phone className="w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Choose Date</h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {dateOptions.map((date) => (
              <button
                key={date.value}
                type="button"
                onClick={() => setForm({ ...form, date: date.value })}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center min-w-20 transition-all ${
                  form.date === date.value
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm">{date.label}</div>
                <div className="text-xs mt-1">{date.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lounge type */}
        {/* <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Choose Lounge Type</h3>
          <div className="flex gap-4">
            {[
              { label: "Mocktail", icon: Martini  },
              { label: "Hookah", icon: Flame },
              { label: "Both", icon: () => <Martini  className="w-5 h-5 inline" /> },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setForm({ ...form, spaceType: label.toLowerCase() })}
                className={`flex-1 p-4 border-2 rounded-xl text-center transition font-medium ${
                  form.spaceType === label.toLowerCase()
                    ? "border-orange-400 bg-orange-50 text-orange-600"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Icon className="mx-auto mb-1 w-6 h-6" />
                {label}
              </button>
            ))}
          </div>
        </div> */}
        {/* Lounge type */}
<div className="mb-6">
  <h3 className="font-semibold text-gray-800 mb-3">Choose Lounge Type</h3>
  <div className="flex gap-4">
    {[
      { label: "Mocktail", icon: Martini },
      { label: "Hookah", icon: Flame },
      {
        label: "Both",
        icon: () => <Martini className="w-5 h-5 inline" />,
      },
    ].map(({ label, icon: Icon }) => (
      <button
        key={label}
        onClick={() =>
          setForm({
            ...form,
            serviceType: "MOCKTAIL", // 🔥 Ensures backend logic is matched
            spaceType: label.toLowerCase(), // mocktail | hookah | both
          })
        }
        className={`flex-1 p-4 border-2 rounded-xl text-center transition font-medium ${
          form.spaceType === label.toLowerCase()
            ? "border-orange-400 bg-orange-50 text-orange-600"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-600"
        }`}
      >
        <Icon className="mx-auto mb-1 w-6 h-6" />
        {label}
      </button>
    ))}
  </div>
</div>


        {/* Guests */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Number of guest(s)</h2>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleGuestChange(num)}
                className={`w-12 h-12 rounded-xl border-2 font-medium transition-colors ${
                  form.noOfPeople === num
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Select Time</h3>
          <div className="grid grid-cols-3 gap-3">
            {loungeTimes.map((slot) => (
              <button
                key={slot}
                onClick={() => setForm({ ...form, time: slot })}
                className={`py-2 px-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                  form.time === slot
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!form.name || !form.email || !form.phone || !form.spaceType || !form.date || !form.time}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            form.name && form.email && form.phone && form.spaceType && form.date && form.time
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          Continue to OTP ➜
        </button>
      </div>
    </div>
  );
};

export default MocktailForm;
