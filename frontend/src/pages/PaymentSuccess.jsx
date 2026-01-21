import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-green-50 to-white px-4 -mt-15">
      {/* Centered Top Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle className="text-green-600 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful
        </h2>
        <p className="text-gray-600 text-center max-w-xs">
          Your reservation is confirmed! A confirmation email has been sent to your inbox.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full max-w-md mx-auto px-4 py-6 space-y-3">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
        >
          Back to Home
        </button>

        <button
          onClick={() => navigate("/my-profile")}
          className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold shadow hover:bg-orange-600 transition"
        >
           View Booking History
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
