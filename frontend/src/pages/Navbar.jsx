// import React, { useState, useEffect } from "react";
// import { Menu, X, User, ArrowRight, ChevronRight } from "lucide-react";
// import { useLocation } from "react-router-dom"; 
// import img from "../assets/mitrozLogo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation(); 

//   // Check if we are on the Home Page ("/")
//   const isHomePage = location.pathname === "/";

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const showDarkNav = isScrolled || !isHomePage;

//   const navLinks = [
//     { name: "Menu", href: "/menu" },
//     { name: "Experiences", href: "/#experiences" }, 
//     { name: "Gallery", href: "/#gallery" },
//     { name: "Contact", href: "/#contact" },
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
//           showDarkNav
//             ? "bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm"
//             : "bg-transparent border-transparent py-6"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
            
//             {/* 1. BRAND LOGO */}
//             <a href="/" className="flex items-center gap-3 group relative z-50">
//               <div className={`relative w-10 h-10 overflow-hidden rounded-xl shadow-lg transition-all duration-300 ring-1 ${
//                 showDarkNav ? "ring-black/5 shadow-orange-500/20" : "ring-white/20 shadow-black/20"
//               }`}>
//                 <img
//                   src={img}
//                   alt="Mitroz"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//               </div>
//               <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
//                 showDarkNav ? "text-slate-900" : "text-white text-shadow-sm"
//               }`}>
//                 Mitroz<span className="text-orange-500" style={{ marginLeft: "2px" }}>.</span>
//               </span>
//             </a>

//             {/* 2. DESKTOP NAVIGATION */}
//             <div className={`hidden md:flex items-center px-2 py-1.5 rounded-full border shadow-sm transition-all duration-500 ${
//                showDarkNav 
//                  ? "bg-white/50 backdrop-blur-md border-white/20 ring-1 ring-black/5" 
//                  : "bg-black/20 backdrop-blur-sm border-white/10 ring-1 ring-white/10"
//             }`}>
//               <ul className="flex space-x-1">
//                 {navLinks.map((link) => (
//                   <li key={link.name}>
//                     <a
//                       href={link.href}
//                       className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 block group ${
//                         showDarkNav
//                           ? "text-slate-600 hover:text-orange-600 hover:bg-white/80"
//                           : "text-white/90 hover:text-white hover:bg-white/10"
//                       }`}
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* 3. RIGHT SIDE ACTIONS */}
//             <div className="flex items-center gap-4 relative z-50">
              
//               {/* Profile Button */}
//               <a
//                 href="/my-profile"
//                 className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg group hover:-translate-y-0.5 ${
//                   showDarkNav
//                     ? "bg-slate-900 hover:bg-orange-600 text-white shadow-slate-900/20 hover:shadow-orange-500/30"
//                     : "bg-white text-slate-900 hover:bg-orange-500 hover:text-white shadow-black/20"
//                 }`}
//               >
//                 <span>History</span>
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </a>

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`md:hidden p-2 rounded-full transition-colors active:scale-95 ${
//                   showDarkNav
//                    ? "text-slate-600 hover:bg-slate-100"
//                    : "text-white hover:bg-white/10"
//                 }`}
//               >
//                 {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 4. MOBILE MENU (Always White) */}
//         <div
//           className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 flex flex-col justify-center items-center ${
//             isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
//           }`}
//         >
//           <div className="w-full max-w-sm px-6 space-y-6">
//             <ul className="space-y-3">
//               {navLinks.map((link, idx) => (
//                 <li 
//                   key={link.name} 
//                   className={`transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//                   style={{ transitionDelay: `${idx * 100}ms` }}
//                 >
//                   <a
//                     href={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center justify-between text-2xl font-semibold text-slate-800 hover:text-orange-600 group border-b border-gray-100 pb-3"
//                   >
//                     {link.name}
//                     <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-orange-500" />
//                   </a>
//                 </li>
//               ))}
//             </ul>

//             <div 
//                className={`pt-4 transition-all duration-700 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
//                style={{ transitionDelay: '400ms' }}
//             >
//               <a
//                 href="/my-profile"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-4 rounded-xl text-lg font-medium shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
//               >
//                 <User className="w-5 h-5" />
//                 Access Profile
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       {/* ✅ Add Spacer ONLY on Non-Home Pages to prevent content hiding behind fixed nav */}
//       {!isHomePage && <div className="h-24" />}
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Menu, X, User, ArrowRight, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom"; 
import img from "../assets/mitrozLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); 

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDarkNav = isScrolled || !isHomePage;

  const isTextDark = showDarkNav || isOpen;

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Experiences", href: "/#experiences" }, 
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isOpen 
            ? "bg-transparent border-none py-6"
            : showDarkNav
              ? "bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm"
              : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
             
            {/* 1. BRAND LOGO */}
            <a href="/" className="flex items-center gap-3 group relative z-50">
              <div className={`relative w-10 h-10 overflow-hidden rounded-xl shadow-lg transition-all duration-300 ring-1 ${
                // Logo border logic
                isTextDark ? "ring-black/5 shadow-orange-500/20" : "ring-white/20 shadow-black/20"
              }`}>
                <img
                  src={img}
                  alt="Mitroz"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isTextDark ? "text-slate-900" : "text-white text-shadow-sm"
              }`}>
                Mitroz<span className="text-orange-500" style={{ marginLeft: "2px" }}>.</span>
              </span>
            </a>

            {/* 2. DESKTOP NAVIGATION */}
            <div className={`hidden md:flex items-center px-2 py-1.5 rounded-full border shadow-sm transition-all duration-500 ${
               showDarkNav 
                 ? "bg-white/50 backdrop-blur-md border-white/20 ring-1 ring-black/5" 
                 : "bg-black/20 backdrop-blur-sm border-white/10 ring-1 ring-white/10"
            }`}>
              <ul className="flex space-x-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 block group ${
                        showDarkNav
                          ? "text-slate-600 hover:text-orange-600 hover:bg-white/80"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-4 relative z-50">
              
              {/* Profile Button (Desktop) */}
              <a
                href="/my-profile"
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg group hover:-translate-y-0.5 ${
                  showDarkNav
                    ? "bg-slate-900 hover:bg-orange-600 text-white shadow-slate-900/20 hover:shadow-orange-500/30"
                    : "bg-white text-slate-900 hover:bg-orange-500 hover:text-white shadow-black/20"
                }`}
              >
                <span>History</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-full transition-colors active:scale-95 ${
                  isTextDark
                   ? "text-slate-600 hover:bg-slate-100"
                   : "text-white hover:bg-white/10"
                }`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. MOBILE MENU (Always White) */}
        <div
          className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 flex flex-col justify-center items-center ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="w-full max-w-sm px-6 space-y-6">
            <ul className="space-y-3">
              {navLinks.map((link, idx) => (
                <li 
                  key={link.name} 
                  className={`transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-2xl font-semibold text-slate-800 hover:text-orange-600 group border-b border-gray-100 pb-3"
                  >
                    {link.name}
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-orange-500" />
                  </a>
                </li>
              ))}
            </ul>

            <div 
               className={`pt-4 transition-all duration-700 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
               style={{ transitionDelay: '400ms' }}
            >
              <a
                href="/my-profile"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-4 rounded-xl text-lg font-medium shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
              >
                <User className="w-5 h-5" />
                Access Profile
              </a>
            </div>
          </div>
        </div>
      </nav>
       
      {/* Spacer */}
      {!isHomePage && <div className="h-24" />}
    </>
  );
};

export default Navbar;