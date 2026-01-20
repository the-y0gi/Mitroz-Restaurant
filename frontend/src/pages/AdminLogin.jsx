import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      toast.success("✅ Login successful!");
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error("❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">
          🔐 Admin Panel Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
            loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
