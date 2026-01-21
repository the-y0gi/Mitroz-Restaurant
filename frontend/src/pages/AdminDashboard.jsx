import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { BarChart3, CalendarCheck, Wallet, UserCheck, PartyPopper, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { motion } from "framer-motion";


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("/admin/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="text-center py-20 text-gray-600">Loading stats...</div>;
  }

  const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
  >
    <div className="flex items-center gap-4">
      <div className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 p-3 rounded-full group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
      </div>
    </div>
  </motion.div>
);


  return (
    <>
    <AdminHeader title="Event Requests"/>
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard icon={CalendarCheck} label="Total Bookings" value={stats.totalBookings} />
        <StatCard icon={PartyPopper} label="Total Events" value={stats.totalEvents} />
        <StatCard icon={UserCheck} label="Paid Bookings" value={stats.totalPaid} />
        <StatCard icon={Wallet} label="Dineout Earnings" value={`₹${stats.dineoutEarnings}`} />
        <StatCard icon={Wallet} label="Event Earnings" value={`₹${stats.eventEarnings}`} />
        <StatCard icon={BarChart3} label="Total Earnings" value={`₹${stats.totalEarnings}`} />
      </div>

      {/* 🔗 Navigate to Event Requests */}
      <div className="flex justify-end mb-5">
        <button
          onClick={() => navigate("/admin/event-requests")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <ClipboardList className="w-4 h-4" />
          View Event Requests
        </button>
      </div>

      {/* Upcoming Bookings */}
     

      <div className="bg-white shadow-xl rounded-2xl p-6 animate-fade-in">
  <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
    📅 Upcoming Dineout Bookings
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-700 border-separate border-spacing-y-2">
      <thead>
        <tr className="bg-orange-50 text-orange-700">
          <th className="px-5 py-3 rounded-l-xl">User</th>
          <th className="px-5 py-3">Service</th>
          <th className="px-5 py-3">Date</th>
          <th className="px-5 py-3">Time</th>
          <th className="px-5 py-3">Price</th>
          <th className="px-9 py-3 rounded-r-xl">Paid</th>
        </tr>
      </thead>
      <tbody >
        {stats.upcomingBookings.map((booking, idx) => (
          <tr
            key={idx}
            className="bg-gray-50 hover:bg-orange-50 transition-all shadow-sm rounded-xl"
          >
            <td className="px-5 py-3 rounded-l-xl">
              <div className="font-semibold">{booking?.user?.name}</div>
              <div className="text-xs text-gray-500">{booking?.user?.email}</div>
            </td>
            <td className="px-5 py-3">{booking.serviceType}</td>
            <td className="px-5 py-3">{new Date(booking.date).toLocaleDateString()}</td>
            <td className="px-5 py-3">{booking.time}</td>
            <td className="px-5 py-3 font-medium">₹{booking.price}</td>
            <td className="px-5 py-3 rounded-r-xl">
              {booking.isPaid ? (
                <span className="inline-block px-5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Paid
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  Pending
                </span>
              )}
            </td>
          </tr>
        ))}

        {stats.upcomingBookings.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-400">
              No upcoming bookings
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
    </>
    
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border border-gray-100">
    <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

export default AdminDashboard;
