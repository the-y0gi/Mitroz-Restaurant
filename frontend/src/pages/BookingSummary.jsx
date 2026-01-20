// import React from "react";
// import { useBooking } from "../context/BookingContext";
// import { toast } from "react-hot-toast";
// import { CheckCircle2 } from "lucide-react";
// import axios from "axios";

// const BookingSummary = () => {
//   const { bookingData } = useBooking();

//   if (!bookingData) return <div className="p-4">No booking data found.</div>;

//   console.log(   "bookingId: ", bookingData.bookingId,)

// const handlePayment = async () => {
//   try {
//     const isEvent = bookingData.serviceType === "EVENT";

//     // Step 1: Create Razorpay order from backend
//     const res = await axios.post(
//       isEvent
//         ? "http://localhost:4000/api/events/payment/order"
//         : "http://localhost:4000/api/bookings/payment/order",
//       isEvent
//         ? { eventId: bookingData.bookingId }
//         : { bookingId: bookingData.bookingId }
//     );

//     const { amount, orderId } = res.data;
//     console.log("✅ Created Order ID:", orderId);

//     // Step 2: Razorpay options
//     const options = {
//       key: "rzp_test_BfK6i6b0E5R9rg", // Replace with live key in production
//       amount,
//       currency: "INR",
//       name: "Mitroz Dineout",
//       description: isEvent ? "Event Booking Payment" : "Table Booking Payment",
//       order_id: orderId,
//       prefill: {
//         name: bookingData.name,
//         email: bookingData.email,
//       },
//       theme: {
//         color: "#F97316",
//       },
//       handler: async function (response) {
//         try {
//           // Step 3: Payment verification call
//           const verifyRes = await axios.post(
//             isEvent
//               ? "http://localhost:4000/api/events/payment/verify"
//               : "http://localhost:4000/api/bookings/payment/verify",
//             isEvent
//               ? {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   eventId: bookingData.bookingId,
//                 }
//               : {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   bookingId: bookingData.bookingId,
//                 }
//           );

//           if (verifyRes.data.success) {
//             toast.success("✅ Payment Successful!");
//             window.location.href = "/success";
//           } else {
//             toast.error("❌ Payment verification failed");
//           }
//         } catch (err) {
//           console.error("❌ Payment Verification Error:", err);
//           toast.error("❌ Payment verification failed");
//         }
//       },
//       modal: {
//         ondismiss: () => {
//           toast.error("❌ Payment Cancelled");
//         },
//       },
//     };

//     // Step 4: Open Razorpay Checkout
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error("❌ Razorpay Order Error:", err);
//     toast.error("❌ Failed to initiate payment");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow p-6">
//         <div className="text-center mb-6">
//           <CheckCircle2 className="mx-auto text-green-500 w-10 h-10 mb-2" />
//           <h2 className="text-xl font-bold text-gray-800">Booking Confirmed!</h2>
//           <p className="text-sm text-gray-500">Here's your summary before payment:</p>
//         </div>

//         <div className="space-y-3 text-sm text-gray-700">
//           <div><strong>Name:</strong> {bookingData.name}</div>
//           <div><strong>Email:</strong> {bookingData.email}</div>
//           <div><strong>Service:</strong> {bookingData.serviceType}</div>
//           {bookingData.tableType && (
//             <div><strong>Table Type:</strong> {bookingData.tableType}</div>
//           )}
//           {bookingData.spaceType && (
//             <div><strong>Space Type:</strong> {bookingData.spaceType}</div>
//           )}
//           <div><strong>Date:</strong> {bookingData.date}</div>
//           <div><strong>Time:</strong> {bookingData.time}</div>
//           <div><strong>Guests:</strong> {bookingData.noOfPeople}</div>
//           <div className="text-lg mt-2 border-t pt-3 font-semibold text-gray-900">
//             Total Payable: ₹{bookingData.price}
//           </div>
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={handlePayment}
//             className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
//           >
//             Pay Now ➜
//           </button>
//         </div>
//       </div>
//     </div>
//   );


// };


// export default BookingSummary;



import React from "react";
import { useBooking } from "../context/BookingContext";
import { toast } from "react-hot-toast";
import { CheckCircle2, CalendarDays, Clock, Users, TableProperties, PartyPopper, BadgeIndianRupee } from "lucide-react";
import axios from "axios";

const BookingSummary = () => {
  const { bookingData } = useBooking();

  if (!bookingData) return <div className="p-4">No booking data found.</div>;

  const handlePayment = async () => {
    try {
      const isEvent = bookingData.serviceType === "EVENT";
      const res = await axios.post(
        isEvent
          ? "http://localhost:4000/api/events/payment/order"
          : "http://localhost:4000/api/bookings/payment/order",
        isEvent
          ? { eventId: bookingData.bookingId }
          : { bookingId: bookingData.bookingId }
      );

      const { amount, orderId } = res.data;
      const options = {
        key: "rzp_test_BfK6i6b0E5R9rg",
        amount,
        currency: "INR",
        name: "Mitroz Dineout",
        description: isEvent ? "Event Booking Payment" : "Table Booking Payment",
        order_id: orderId,
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
        },
        theme: {
          color: "#F97316",
        },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              isEvent
                ? "http://localhost:4000/api/events/payment/verify"
                : "http://localhost:4000/api/bookings/payment/verify",
              isEvent
                ? {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    eventId: bookingData.bookingId,
                  }
                : {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    bookingId: bookingData.bookingId,
                  }
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment Successful!");
              window.location.href = "/success";
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("❌ Payment Verification Error:", err);
            toast.error("❌ Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            toast.error("❌ Payment Cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay Order Error:", err);
      toast.error("❌ Failed to initiate payment");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-8 animate-fade-in -mt-2">
    <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-3xl p-6 animate-slide-up">
      
      <div className="text-center mb-4">
        <CheckCircle2 className="mx-auto text-green-500 w-12 h-12 animate-pulse mb-2" />
        <h2 className="text-xl font-bold text-gray-800">Booking Confirmed!</h2>
        <p className="text-sm text-gray-500">Here’s your summary before payment:</p>
      </div>

      <div className="space-y-3 text-sm text-gray-700 font-medium">
        <SummaryRow label="Name" value={bookingData.name} />
        <SummaryRow label="Email" value={bookingData.email} />
        <SummaryRow label="Service" value={bookingData.serviceType} Icon={PartyPopper} />
        {bookingData.tableType && <SummaryRow label="Table Type" value={bookingData.tableType} Icon={TableProperties} />}
        {bookingData.spaceType && <SummaryRow label="Space Type" value={bookingData.spaceType} />}
        <SummaryRow label="Date" value={bookingData.date} Icon={CalendarDays} />
        <SummaryRow label="Time" value={bookingData.time} Icon={Clock} />
        <SummaryRow label="Guests" value={bookingData.noOfPeople} Icon={Users} />
      </div>

      {/* Price */}
      <div className="mt-4 border-t pt-3 text-lg font-bold text-gray-900 flex items-center gap-2 justify-center">
        <BadgeIndianRupee className="w-5 h-5 text-orange-500" />
        ₹{bookingData.price}
      </div>

      {/* ⚠️ Note */}
      <div className="mt-3 text-xs text-gray-600 text-center italic">
        * This is an advance payment. It will be adjusted at the restaurant.
      </div>

      {/* Pay button */}
      <button
        onClick={handlePayment}
        className="mt-5 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
      >
        Pay Now ➜
      </button>
    </div>
  </div>
);

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-10 animate-fade-in -mt-2.5">
  //     <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-3xl p-8 animate-slide-up">
  //       <div className="text-center mb-6">
  //         <CheckCircle2 className="mx-auto text-green-500 w-12 h-12 animate-pulse mb-2" />
  //         <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
  //         <p className="text-sm text-gray-500">Here’s your summary before payment:</p>
  //       </div>

  //       <div className="space-y-4 text-sm text-gray-700 font-medium">
  //         <SummaryRow label="Name" value={bookingData.name} />
  //         <SummaryRow label="Email" value={bookingData.email} />
  //         <SummaryRow label="Service" value={bookingData.serviceType} Icon={PartyPopper} />
  //         {bookingData.tableType && <SummaryRow label="Table Type" value={bookingData.tableType} Icon={TableProperties} />}
  //         {bookingData.spaceType && <SummaryRow label="Space Type" value={bookingData.spaceType} />}
  //         <SummaryRow label="Date" value={bookingData.date} Icon={CalendarDays} />
  //         <SummaryRow label="Time" value={bookingData.time} Icon={Clock} />
  //         <SummaryRow label="Guests" value={bookingData.noOfPeople} Icon={Users} />
  //       </div>

  //       <div className="mt-6 border-t pt-4 text-lg font-bold text-gray-900 flex items-center gap-2 justify-center">
  //         <BadgeIndianRupee className="w-5 h-5 text-orange-500" />
  //         ₹{bookingData.price}
  //       </div>

  //       <button
  //         onClick={handlePayment}
  //         className="mt-6 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
  //       >
  //         Pay Now ➜
  //       </button>
  //     </div>
  //   </div>
  // );
};

const SummaryRow = ({ label, value, Icon }) => (
  <div className="flex items-center gap-3">
    {Icon && <Icon className="w-4 h-4 text-orange-500" />}
    <span className="text-gray-500 w-24">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default BookingSummary;
