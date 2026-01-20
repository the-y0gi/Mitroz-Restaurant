// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Cake, CalendarClock, Mail, Phone, User } from "lucide-react";
// import { useBooking } from "../context/BookingContext";
// import axios from "axios";
// import toast from "react-hot-toast";

// const EventForm = () => {
//   const navigate = useNavigate();
//   const { setBookingData } = useBooking();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     serviceType: "EVENT",
//     date: "",
//     time: "",
//     noOfPeople: 10,
//     message: "",
//   });

//   const today = new Date();
//   const dateOptions = Array.from({ length: 5 }).map((_, i) => {
//     const d = new Date();
//     d.setDate(today.getDate() + i);
//     const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
//     const sub = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
//     const value = d.toISOString().split("T")[0];
//     return { label, sub, value };
//   });

//   const eventTimes = ["03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"];

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleGuestChange = (num) => {
//     setForm({ ...form, noOfPeople: num });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/bookings/create", form);
//       toast.success("✅ OTP sent to your email.");
//       setBookingData({ ...form, price: res.data.calculatedAmount, bookingId: res.data.bookingId });
//       await axios.post("http://localhost:4000/api/bookings/send-otp", { email: form.email });
//       navigate("/otp-verify");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to book event. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center mb-6">🎉 Plan Your Event</h2>

//         {/* Name */}
//         <div className="mb-4">
//           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
//             <User className="w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
//             <Mail className="w-5 h-5 text-gray-400" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="mb-4">
//           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
//             <Phone className="w-5 h-5 text-gray-400" />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//               className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
//             />
//           </div>
//         </div>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-800 mb-3">Select Event Date</h3>
//           <div className="flex gap-3 overflow-x-auto pb-1">
//             {dateOptions.map((date) => (
//               <button
//                 key={date.value}
//                 type="button"
//                 onClick={() => setForm({ ...form, date: date.value })}
//                 className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center min-w-20 transition-all ${
//                   form.date === date.value
//                     ? "bg-orange-100 border-orange-300 text-orange-600"
//                     : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="font-medium text-sm">{date.label}</div>
//                 <div className="text-xs mt-1">{date.sub}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Time Slots */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-800 mb-3">Choose Event Time</h3>
//           <div className="grid grid-cols-3 gap-2">
//             {eventTimes.map((time) => (
//               <button
//                 key={time}
//                 onClick={() => setForm({ ...form, time })}
//                 className={`py-2 px-2 rounded-xl text-sm font-medium border-2 transition ${
//                   form.time === time
//                     ? "bg-orange-100 border-orange-300 text-orange-600"
//                     : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
//                 }`}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Guest Count */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-800 mb-3">Guests Count</h3>
//           <div className="flex gap-3">
//             {[10, 20, 30, 40, 50].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => handleGuestChange(num)}
//                 className={`w-14 h-12 rounded-xl border-2 font-medium transition-colors ${
//                   form.noOfPeople === num
//                     ? "bg-orange-100 border-orange-300 text-orange-600"
//                     : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Message */}
//         <div className="mb-6">
//           <textarea
//             name="message"
//             placeholder="Optional message (e.g. Birthday, Anniversary...)"
//             value={form.message}
//             onChange={handleChange}
//             className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 placeholder-gray-400 focus:border-orange-300 resize-none"
//             rows={3}
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={!form.name || !form.email || !form.phone || !form.date || !form.time}
//           className={`w-full py-3 rounded-xl font-semibold transition-colors ${
//             form.name && form.email && form.phone && form.date && form.time
//               ? "bg-orange-500 text-white hover:bg-orange-600"
//               : "bg-gray-300 text-white cursor-not-allowed"
//           }`}
//         >
//           Continue to OTP ➜
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cake,
  Gift,
  Mail,
  Phone,
  User,
  Music,
  CalendarClock,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import axios from "axios";
import toast from "react-hot-toast";
import imgP from "../assets/img4.jpg";
import imgC from "../assets/img5.jpg";
import imgA from "../assets/img6.jpg";
import imgH from "../assets/img7.jpg";
import imgBB from "../assets/imgBB.jpg";
import imgPo from "../assets/img41.jpg";


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

  const today = new Date();
  const dateOptions = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const label =
      i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
    const sub = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const value = d.toISOString().split("T")[0];
    return { label, sub, value };
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
    { label: "DJ", icon: Music },
    { label: "Cake", icon: Cake },
    { label: "Decor", icon: Gift },
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

  // Submit handler inside EventForm.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };

      // ✅ Step 1: Create event request and get bookingId + price
      const res = await axios.post(
        "http://localhost:4000/api/events/request",
        payload
      );

      // ✅ Step 2: Send OTP
      await axios.post("http://localhost:4000/api/bookings/send-otp", {
        email: form.email,
      });

      // ✅ Step 3: Save bookingData to context
      setBookingData({
        ...form,
        bookingId: res.data.bookingId,
        date: form.preferredDate,
        time: form.preferredTime,
        noOfPeople: form.noOfGuests,
        price: res.data.calculatedAmount,
        serviceType: "EVENT",
      });

      // ✅ Step 4: Navigate to OTP verify
      navigate("/otp-verify");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit event request. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-5">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          🎊 Event Reservation
        </h2>

        {/* Name */}
        <Input
          icon={User}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <Input
          icon={Mail}
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          icon={Phone}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        {/* Event Type */}

        {/* Event Type Selection with Images */}
        {/* <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            Choose Event Type
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: "Birthday", img: {imgH} },
              { type: "Anniversary", img: {imgA}},
              { type: "Farewell", img: {imgC}},
              { type: "Engagement", img: {imgP} },
            ].map(({ type, img }) => (
              <div
                key={type}
                onClick={() => setForm({ ...form, eventType: type })}
                className={`cursor-pointer p-3 rounded-xl border-2 text-center transition ${
                  form.eventType === type
                    ? "border-orange-400 bg-orange-50 text-orange-600"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <img
                  src={img}
                  alt={type}
                  className="mx-auto mb-2 w-16 h-16 object-contain"
                />
                <div className="font-medium">{type}</div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="mb-6">
  <h3 className="font-semibold text-gray-800 mb-3">
    Choose Event Type
  </h3>
  <div className="grid grid-cols-2 gap-4">
    {[
      { type: "Birthday", img: imgBB},
      { type: "Anniversary", img: imgA },
      { type: "Farewell", img: imgC },
      { type: "Engagement", img: imgP },
    ].map(({ type, img }) => (
      <div
        key={type}
        onClick={() => setForm({ ...form, eventType: type })}
        className={`relative cursor-pointer rounded-xl border-2 overflow-hidden h-40 transition ${
          form.eventType === type
            ? "border-orange-400"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <img
          src={img}
          alt={type}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-2 text-center bg-black/40 backdrop-blur-sm z-10">
          <div
            className={`text-sm font-medium ${
              form.eventType === type ? "text-orange-200" : "text-white"
            }`}
          >
            {type}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Date Picker */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">
            Preferred Date
          </label>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {dateOptions.map((date) => (
              <button
                key={date.value}
                type="button"
                onClick={() => setForm({ ...form, preferredDate: date.value })}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center min-w-20 transition-all ${
                  form.preferredDate === date.value
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

        {/* Time Picker */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">
            Preferred Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {eventTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setForm({ ...form, preferredTime: time })}
                className={`py-2 px-2 rounded-xl text-sm font-medium border-2 transition ${
                  form.preferredTime === time
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">
            Number of Guests
          </label>
          <div className="flex gap-3">
            {[10, 20, 30, 40, 50, 100].map((num) => (
              <button
                key={num}
                onClick={() => setForm({ ...form, noOfGuests: num })}
                className={`w-14 h-12 rounded-xl border-2 font-medium transition-colors ${
                  form.noOfGuests === num
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Add Ons */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">
            Add Ons
          </label>
          <div className="flex gap-4">
            {addOnOptions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleAddOn(label)}
                className={`flex-1 border-2 rounded-xl p-3 text-center transition ${
                  form.addOns.includes(label)
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

        {/* Message */}
        <textarea
          name="message"
          placeholder="Event note (optional)"
          value={form.message}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 placeholder-gray-400 focus:border-orange-300 resize-none mb-4"
          rows={3}
        />

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.eventType ||
            !form.preferredDate ||
            !form.preferredTime
          }
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            form.name &&
            form.email &&
            form.phone &&
            form.eventType &&
            form.preferredDate &&
            form.preferredTime
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

// Reusable Input Component
const Input = ({ icon: Icon, ...props }) => (
  <div className="mb-4">
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-orange-300">
      <Icon className="w-5 h-5 text-gray-400" />
      <input
        {...props}
        required
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
      />
    </div>
  </div>
);

export default EventForm;
