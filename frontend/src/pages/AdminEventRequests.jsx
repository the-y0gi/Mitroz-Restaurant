import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { ShieldCheck, Loader2 } from "lucide-react";

const AdminEventRequests = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchEventRequests = async () => {
    try {
      const res = await axios.get("/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`/admin/confirm/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event confirmed");
      fetchEventRequests();
    } catch (err) {
      toast.error("❌ Failed to confirm event");
    }
  };

  useEffect(() => {
    fetchEventRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Event Requests</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No event requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{event.eventType}</h3>
                {event.isConfirmed && (
                  <span className="text-green-600 text-sm">✔ Confirmed</span>
                )}
              </div>
              <p><strong>Name:</strong> {event.name}</p>
              <p><strong>Email:</strong> {event.email}</p>
              <p><strong>Phone:</strong> {event.phone}</p>
              <p><strong>Date:</strong> {new Date(event.preferredDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.preferredTime}</p>
              <p><strong>Guests:</strong> {event.noOfGuests}</p>
              <p><strong>Price:</strong> ₹{event.estimatedPrice}</p>
              <p><strong>AddOns:</strong> {event.addOns?.join(", ") || "None"}</p>

              {!event.isConfirmed && (
                <button
                  onClick={() => handleConfirm(event._id)}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  <ShieldCheck className="w-4 h-4" /> Confirm
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventRequests;
