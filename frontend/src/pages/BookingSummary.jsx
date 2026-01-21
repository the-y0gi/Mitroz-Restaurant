import React from "react";
import { useBooking } from "../context/BookingContext";
import { toast } from "react-hot-toast";
import axios from "../api/axios";
import { 
  CheckCircle2, CalendarDays, Clock, Users, 
  PartyPopper, BadgeIndianRupee, ArrowRight, 
  ShieldCheck, Mail, User, MapPin 
} from "lucide-react";

const BookingSummary = () => {
  const { bookingData } = useBooking();

  if (!bookingData) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      No booking data found.
    </div>
  );

  const handlePayment = async () => {
    try {
      const isEvent = bookingData.serviceType === "EVENT";
      const res = await axios.post(
        isEvent
          ? "/events/payment/order"
          : "/bookings/payment/order",
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
        description: "Booking Payment",
        order_id: orderId,
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
        },
        theme: { color: "#F97316" },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              isEvent
                ? "/events/payment/verify"
                : "/bookings/payment/verify",
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
            console.error(err);
            toast.error("❌ Verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to initiate payment");
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F0F2F5] flex items-center justify-center  font-sans">
      
      {/* Background Decor (Optional) */}
 
      {/* === THE TICKET CARD (Wide on Laptop, Tall on Mobile) === */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up">
        
        {/* === LEFT SIDE (Orange): Overview & Price === */}
        <div className="md:w-1/3 bg-gradient-to-br from-orange-400 to-red-500 p-8 text-white relative flex flex-col justify-between">
           {/* Circles for Cutout Effect */}
           {/* <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#F0F2F5] rounded-full hidden md:block transform -translate-y-1/2 z-10"></div>
           <div className="absolute -bottom-3 left-1/2 w-6 h-6 bg-[#F0F2F5] rounded-full md:hidden transform -translate-x-1/2 z-10"></div> */}

           <div>
             <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                   <CheckCircle2 className="w-6 h-6 text-white"/>
                </div>
                <span className="font-bold tracking-wider text-sm uppercase">Booking Confirmed</span>
             </div>
             
             <h2 className="text-3xl font-bold mb-2">Mitroz Dining</h2>
             <p className="text-orange-100 text-sm opacity-90">Premium Experience</p>
           </div>

           <div className="mt-8 md:mt-0">
              <p className="text-xs text-orange-100 uppercase font-bold mb-1">Amount to Pay</p>
              <div className="text-4xl font-bold flex items-center">
                 <span className="text-2xl mr-1">₹</span>{bookingData.price}
              </div>
              <p className="text-[10px] text-white/70 mt-2">*Advance payment adjusted in final bill</p>
           </div>
        </div>

        {/* === RIGHT SIDE (White): Details Grid === */}
        <div className="md:w-2/3 p-6 md:p-10 bg-white relative">
           
           {/* Dashed Line Divider */}
           <div className="absolute left-0 top-4 bottom-4 w-[10px] border-l-5 border-dashed border-gray-200 hidden md:block"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Date & Time Block */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-1 md:col-span-2 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-orange-500"><CalendarDays size={20}/></div>
                    <div>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                       <p className="font-bold text-gray-800 text-sm">{new Date(bookingData.date).toDateString()}</p>
                    </div>
                 </div>
                 <div className="h-8 w-[1px] bg-gray-200"></div>
                 <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-orange-500"><Clock size={20}/></div>
                    <div>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                       <p className="font-bold text-gray-800 text-sm">{bookingData.time}</p>
                    </div>
                 </div>
              </div>

              {/* Detail Items */}
              <DetailItem label="Guest Name" value={bookingData.name} icon={User} />
              <DetailItem label="Guests" value={`${bookingData.noOfPeople} People`} icon={Users} />
              <DetailItem label="Contact" value={bookingData.email} icon={Mail} truncate />
              
              {/* Conditional Details */}
              <DetailItem 
                label="Type" 
                value={bookingData.serviceType === "EVENT" ? bookingData.eventType : (bookingData.tableType || bookingData.spaceType)} 
                icon={PartyPopper} 
                highlight
              />
           </div>

           {/* Footer Actions */}
           <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                 <ShieldCheck size={14} className="text-green-500"/> Secure Payment via Razorpay
              </div>
              <button
                onClick={handlePayment}
                className="w-full md:w-auto px-8 py-3 bg-gray-900 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                Pay Now <ArrowRight size={18} />
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component
const DetailItem = ({ label, value, icon: Icon, highlight, truncate }) => (
  <div className="flex flex-col gap-1">
     <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
        <Icon size={12}/> {label}
     </div>
     <div className={`font-semibold text-gray-800 text-sm ${truncate ? "truncate w-full" : ""} ${highlight ? "text-orange-600" : ""}`}>
        {value}
     </div>
  </div>
);

export default BookingSummary;