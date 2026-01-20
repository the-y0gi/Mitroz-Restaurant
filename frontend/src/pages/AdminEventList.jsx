

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { CheckCircle, Loader2 } from "lucide-react";
import AdminHeader from "./AdminHeader";

const AdminEventRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/events/admin/all", {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch event requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleConfirm = async (id) => {
    setConfirmingId(id);
    try {
      await axios.put(`http://localhost:4000/api/events/admin/confirm/${id}`, {}, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      toast.success("✅ Event confirmed");
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to confirm event");
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Event Requests" />

      <div className="max-w-5xl mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-6 w-6 text-orange-500" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">No event requests yet.</p>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-orange-600">
                      {req.eventType} for {req.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {req.email} | {req.phone}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Date: {format(new Date(req.preferredDate), "dd MMM yyyy")} at {req.preferredTime}
                    </p>
                    <p className="text-sm text-gray-600">Guests: {req.noOfGuests}</p>
                    <p className="text-sm text-gray-600">AddOns: {req.addOns.join(", ") || "None"}</p>
                    <p className="text-sm text-gray-600 italic">{req.message}</p>
                  </div>
                  <div>
                    {req.isConfirmed ? (
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle size={18} /> Confirmed
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConfirm(req._id)}
                        disabled={confirmingId === req._id}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                      >
                        {confirmingId === req._id ? "Confirming..." : "Confirm"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventRequests;
