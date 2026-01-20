// import { LogOut, Shield } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const AdminHeader = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     toast.success("Logged out successfully");
//     navigate("/admin-login");
//   };

//   return (
//     <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
//       <div className="flex items-center gap-2 text-orange-600 font-bold text-xl">
//         <Shield className="w-6 h-6" />
//         Admin Panel
//       </div>
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition"
//       >
//         <LogOut className="w-5 h-5" />
//         Logout
//       </button>
//     </header>
//   );
// };

// export default AdminHeader;

import { LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white shadow-lg transition-shadow">
      <div className="flex items-center gap-2 text-orange-600 font-bold text-xl">
        <Shield className="w-6 h-6" />
        Admin Panel
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
