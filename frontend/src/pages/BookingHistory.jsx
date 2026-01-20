

import React, { useState } from "react";
import axios from "axios";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";

const BookingHistory = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/bookings/history", {
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
      await axios.put("http://localhost:4000/api/booking/user-update", profile);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">📖 Your Profile & Bookings</h2>
          <p className="text-sm text-gray-500">Enter your email to view your bookings.</p>
        </div>

        {/* Email Input */}
        {/* <div className="flex items-center gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border-2 rounded-xl border-gray-200 focus:border-orange-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={fetchHistory}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            View
          </button>
        </div> */}
        <div className="mb-8">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Enter your email to view bookings:
  </label>
  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-1 px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button
      onClick={fetchHistory}
      className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
    >
      🔍 View
    </button>
  </div>
</div>


        {/* Profile Info */}
        {profile && (
          <div className="mb-8 bg-orange-50 p-5 rounded-2xl border border-orange-200 shadow-sm">
            <h3 className="text-lg font-semibold text-orange-600 mb-3">👤 Profile</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{profile.name || "Not Provided"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{profile.phone || "Not Provided"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Completion */}
        {profile && (!profile.name || !profile.phone) && (
          <div className="mb-8 bg-white p-5 rounded-2xl border border-gray-200 shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🛠️ Complete Your Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <button
                onClick={handleProfileUpdate}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Booking List */}
        {loading ? (
          <div className="text-center text-gray-500 py-8">⏳ Fetching bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No bookings found</div>
        ) : (
          <div className="space-y-5">
            {bookings.map((b, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-5 bg-orange-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{b.serviceType} Booking</h3>
                  <span className="text-orange-600 font-bold">₹{b.price}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  {new Date(b.date).toLocaleDateString()} &nbsp;
                  <Clock className="w-4 h-4 text-orange-400" /> {b.time}
                </div>

                <div className="text-sm text-gray-500">
                  Table: <span className="font-medium">{b.tableType || "N/A"}</span> | Guests:{" "}
                  <span className="font-medium">{b.noOfPeople}</span>
                </div>

                <div className="text-xs mt-2">
                  Payment:{" "}
                  {b.isPaid ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;

