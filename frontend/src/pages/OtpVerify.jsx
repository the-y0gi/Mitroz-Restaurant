// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useBooking } from "../context/BookingContext";
// import { toast } from "react-hot-toast";
// import { ShieldCheck, Mail } from "lucide-react";

// const VerifyOtp = () => {
//   const navigate = useNavigate();
//   const { bookingData } = useBooking();

//   const [otp, setOtp] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/bookings/verify-otp", {
//         email: bookingData.email,
//         otp,
//       });

//       toast.success("🎉 OTP verified successfully!");
//       navigate("/summary");
//     } catch (err) {
//       console.error("OTP Verify Error:", err);
//       toast.error("❌ Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-sm w-full bg-white rounded-2xl shadow p-6">
//         <div className="text-center mb-6">
//           <ShieldCheck className="mx-auto text-orange-500 w-10 h-10 mb-2" />
//           <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Enter the 6-digit OTP sent to
//           </p>
//           <p className="text-sm font-medium text-gray-700 mt-1">
//             {bookingData?.email}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl focus-within:border-orange-400">
//             <Mail className="w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               maxLength={6}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={otp.length !== 6}
//             className={`w-full py-3 rounded-xl font-semibold transition-colors ${
//               otp.length === 6
//                 ? "bg-orange-500 text-white hover:bg-orange-600"
//                 : "bg-gray-300 text-white cursor-not-allowed"
//             }`}
//           >
//             Verify OTP ➜
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { toast } from "react-hot-toast";
import { ShieldCheck, Mail } from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/bookings/verify-otp", {
        email: bookingData.email,
        otp,
      });

      toast.success("🎉 OTP verified successfully!");
      navigate("/summary");
    } catch (err) {
      console.error("OTP Verify Error:", err);
      const msg = err?.response?.data?.message || "❌ Invalid OTP. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow p-6">
        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto text-orange-500 w-10 h-10 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit OTP sent to
          </p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            {bookingData?.email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl focus-within:border-orange-400">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              otp.length === 6
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            Verify OTP ➜
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
