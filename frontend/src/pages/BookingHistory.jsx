import React, { useState } from "react";
import axios from "../api/axios";
import { 
  Calendar, Clock, User, Mail, Phone, Search, 
  MapPin, CheckCircle, AlertCircle, 
  Ticket, ArrowUpRight, Edit3, Save, Sparkles, Receipt 
} from "lucide-react";

const BookingHistory = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchHistory = async () => {
    if(!email) return;
    try {
      setLoading(true);
      setSearched(true);
      const res = await axios.get("/bookings/history", {
        params: { email },
      });

      if (res.data.bookings.length > 0) {
        const firstUser = res.data.bookings[0].user;
        setProfile({
          email: firstUser.email,
          name: firstUser.name || "",
          phone: firstUser.phone || "",
        });
      } else {
        setProfile(null);
      }
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.put("/booking/user-update", profile);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 md:px-8 font-sans">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage your profile and track past experiences.</p>
          </div>
          
          {/* Search Bar - Floating */}
          <div className="bg-white p-1.5 rounded-full shadow-lg shadow-gray-200/50 flex items-center border border-gray-100 w-full md:w-96">
            <input
              type="email"
              placeholder="Enter registered email..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700 font-medium placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={fetchHistory}
              disabled={!email || loading}
              className="bg-gray-900 hover:bg-orange-600 text-white p-2.5 rounded-full transition-all disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Search size={20}/>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: MEMBERSHIP CARD ================= */}
          <div className="lg:col-span-4 sticky top-8 space-y-6">
            
            {/* 1. Profile Card (Credit Card Style) */}
            {profile ? (
              <div className="group relative w-full h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl shadow-gray-900/20 overflow-hidden transition-transform hover:scale-[1.02] duration-500">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-white/80">
                         <Sparkles size={18} className="text-orange-400"/>
                         <span className="text-xs font-bold tracking-[0.2em] uppercase">Mitroz Member</span>
                      </div>
                      <button onClick={() => setIsEditing(!isEditing)} className="text-white/50 hover:text-white transition">
                         {isEditing ? <Save size={18}/> : <Edit3 size={18}/>}
                      </button>
                   </div>

                   <div>
                      <div className="text-xs text-white/50 uppercase mb-1">Card Holder</div>
                      {isEditing ? (
                        <input 
                          value={profile.name} 
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="bg-transparent border-b border-orange-500 w-full text-2xl font-bold outline-none mb-2" 
                        />
                      ) : (
                        <h2 className="text-2xl font-bold tracking-wide">{profile.name || "GUEST USER"}</h2>
                      )}
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                        {isEditing ? (
                          <input 
                            value={profile.phone} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className="bg-transparent border-b border-white/30 w-32 outline-none" 
                          />
                        ) : (
                          <span>{profile.phone || "+91 ••••• •••••"}</span>
                        )}
                      </div>
                   </div>

                   <div className="flex justify-between items-end">
                      <div className="text-xs text-white/40">{profile.email}</div>
                      <div className="w-10 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center">
                         <div className="w-6 h-4 border border-white/40 rounded-sm flex gap-[2px] items-center justify-center">
                            <div className="w-[1px] h-2 bg-white/40"></div>
                            <div className="w-[1px] h-2 bg-white/40"></div>
                            <div className="w-[1px] h-2 bg-white/40"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-gray-300 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-gray-400" size={32}/>
                </div>
                <h3 className="font-bold text-gray-900">Guest Profile</h3>
                <p className="text-sm text-gray-500 mt-1">Search email to view your card.</p>
              </div>
            )}

            {/* Stats (Fake Data for Visuals) */}
            {profile && (
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Total Visits</div>
                 </div>
                 <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-orange-600">
                      {bookings.filter(b => b.isPaid).length}
                    </div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Completed</div>
                 </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: SCROLLABLE HISTORY ================= */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-[400px]">
              
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm z-20 sticky top-0">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Ticket className="text-orange-500" size={20}/> Booking History
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {bookings.length} Records
                </span>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                
                {!searched ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-50">
                     <Search size={48} className="text-gray-300 mb-4"/>
                     <p>Search to view history</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-50">
                     <Ticket size={48} className="text-gray-300 mb-4"/>
                     <p>No bookings found yet</p>
                  </div>
                ) : (
                  bookings.map((b, i) => (
                    <div 
                      key={i} 
                      className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                        
                        {/* Date Block */}
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full sm:w-20 bg-gray-50 rounded-xl py-3 border border-gray-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-orange-400">
                             {new Date(b.date).toLocaleDateString('en-US', { month: 'short' })}
                           </span>
                           <span className="text-3xl font-bold text-gray-800 group-hover:text-orange-600">
                             {new Date(b.date).getDate()}
                           </span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase">
                             {new Date(b.date).getFullYear()}
                           </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full text-center sm:text-left">
                           <div className="flex justify-between items-start mb-2">
                              <div>
                                 <h4 className="font-bold text-gray-900 text-lg">
                                    {b.serviceType === "EVENT" ? b.eventType : `${b.tableType || "Standard"} Table`}
                                 </h4>
                                 <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mt-1">
                                    <Clock size={14}/> {b.time}
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <User size={14}/> {b.noOfPeople} Guests
                                 </div>
                              </div>
                              
                              {/* Price (Desktop) */}
                              <div className="hidden sm:block text-right">
                                 <div className="text-xl font-bold text-gray-900">₹{b.price}</div>
                              </div>
                           </div>

                           {/* Status Badge & Mobile Price */}
                           <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                b.isPaid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                              }`}>
                                {b.isPaid ? <CheckCircle size={12}/> : <AlertCircle size={12}/>}
                                {b.isPaid ? "Payment Verified" : "Payment Pending"}
                              </div>
                              
                              <button className="text-gray-400 hover:text-orange-600 flex items-center gap-1 text-xs font-bold transition-colors">
                                 View Receipt <ArrowUpRight size={14}/>
                              </button>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

              </div>
              
              {/* Scroll Fade Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;