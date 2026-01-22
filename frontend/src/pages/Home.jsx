import React, { useState, useEffect } from "react";
import {
  MapPin, Phone, Mail, Instagram, Facebook, Twitter, 
  ArrowRight, ChevronDown, Star, UtensilsCrossed, Calendar,
  Heart
} from "lucide-react";

import TestimonialsSection from "../components/TestimonialsSection";
import WhyVisitUs from "../components/WhyVisitUs";
import Gallery from "../components/Gallery";
import ExperiencesSection from "../components/ExperiencesSection";
import BookByOccasion from "../components/BookByOccasion";
import ContactSection from "../components/ContactSection";

const MitrozHomepage = () => {
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  // Handle Scroll for Floating Button & Reveal Animations
  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after hero section (500px)
      setShowFloatingBtn(window.scrollY > 500);

      // Reveal Animations Logic
      const reveals = document.querySelectorAll(".reveal-section");
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* 1. Global Noise Texture (Luxury Feel) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      {/* ================= HERO SECTION ================= */}
<section id="home" className="relative h-[105vh] w-full flex items-center justify-center overflow-hidden">
  
  {/* Background Video/Image with Ken Burns Effect & Better Overlay */}
  <div className="absolute inset-0 z-0">
    {/* Darker Gradient for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-10"></div>
    <img 
      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
      alt="Mitroz Luxury Dining" 
      className="w-full h-full object-cover animate-ken-burns opacity-90"
    />
  </div>

  {/* Hero Content */}
  <div className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
    
    {/* Elegant Badge */}
    <div className="mb-8 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
        <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/80">
          Est. 2024 • Indore
        </span>
      </div>
    </div>

    {/* Main Headline - Mixed Typography for Luxury Feel */}
    <div className="relative mb-6">
      {/* Script/Serif Text */}
      <div className="overflow-hidden">
        <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-white/90 animate-slide-up leading-tight">
          Culinary
        </h1>
      </div>
      
      {/* Bold Sans Text with Spacing */}
      <div className="overflow-hidden -mt-2 md:-mt-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-[0.15em] md:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-400 to-amber-200 animate-slide-up uppercase" style={{ animationDelay: '0.15s' }}>
          Excellence
        </h1>
      </div>
    </div>
    
    {/* Divider Line */}
    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}></div>
    
    {/* Subtitle */}
    <p className="max-w-xl text-base md:text-lg text-gray-300 font-light leading-relaxed mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      An ambiance where flavors tell a story. <br className="hidden md:block" />
      From <span className="text-orange-300 italic">sunset mocktails</span> to <span className="text-orange-300 italic">starlit dinners</span>.
    </p>

    {/* Hero Buttons - Glassmorphism */}
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
      <button
        onClick={() => (window.location.href = "/dineout")}
        className="px-8 py-3.5 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-105 hover:bg-orange-50"
      >
        Reserve a Table
      </button>
      <button
        onClick={() => (window.location.href = "/menu")}
        className="px-8 py-3.5 bg-white/10 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:bg-white/20 backdrop-blur-sm"
      >
        View Menu
      </button>
    </div>
  </div>

  {/* Scroll Indicator - Minimal */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce-slow">
    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
  </div>
</section>
      {/* ================= CONTENT SECTIONS ================= */}
      {/* Background stays dark/premium, components need to adapt or use white sections within */}
      
      <div className="relative z-10 bg-white rounded-t-[3rem] mt-[-2rem] pt-10 pb-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        
        {/* 1. Experiences */}
        <div className="reveal-section">
          <ExperiencesSection />
        </div>

        {/* 2. Occasions */}
        <div className="reveal-section">
          <BookByOccasion />
        </div>

        {/* 3. Parallax Quote Break */}
        <div className="py-32 my-10 relative overflow-hidden flex items-center justify-center bg-black text-white">
           <div className="absolute inset-0 opacity-40">
              <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover fixed-attachment" alt="Texture"/>
           </div>
           <div className="relative z-10 text-center px-4 reveal-section">
              <Star className="w-12 h-12 text-orange-500 mx-auto mb-6 animate-spin-slow" />
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
                "Food is not just eating energy. <br/> It's an experience."
              </h2>
           </div>
        </div>

        {/* 4. Gallery */}
        <div className="reveal-section">
          <Gallery />
        </div>

        {/* 5. Features */}
        <div className="reveal-section">
          <WhyVisitUs />
        </div>

        {/* 6. Testimonials */}
        <div className="reveal-section">
          <TestimonialsSection />
        </div>

        {/* 7. Contact */}
        <div className="reveal-section">
          <ContactSection />
        </div>

      </div>

      {/* ================= FOOTER ================= */}
<footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
  {/* Footer Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
      
      {/* Brand */}
      <div className="md:col-span-5 space-y-6">
        <h2 className="text-5xl font-bold tracking-tighter text-white">Mitroz.</h2>
        <p className="text-gray-400 leading-relaxed max-w-sm">
          Crafting unforgettable moments through exquisite flavors and premium hospitality. 
          Join us for a dining experience that transcends the ordinary.
        </p>
        <div className="flex gap-4 pt-4">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 hover:-translate-y-1">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Links */}
      {/* <div className="md:col-span-2 md:col-start-7">
        <h4 className="text-lg font-bold mb-6">Discover</h4>
        <ul className="space-y-4 text-gray-400">
          {['Reservations', 'Menu', 'Private Events', 'Gallery'].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-orange-400 transition-colors inline-block hover:translate-x-2 duration-300">{item}</a>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Links */}
<div className="md:col-span-2 md:col-start-7">
  <h4 className="text-lg font-bold mb-6">Discover</h4>

  <ul className="space-y-4 text-gray-400">
    {[
      { label: "Experiences", href: "/#experiences" },
      { label: "Menu", href: "/menu" },
      { label: "Private Events", href: "/event" },
      { label: "Gallery", href: "/#gallery" },
    ].map((item) => (
      <li key={item.label}>
        <a
          href={item.href}
          className="inline-block transition-all duration-300 hover:text-orange-400 hover:translate-x-2"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</div>


      {/* Contact */}
      <div className="md:col-span-3">
        <h4 className="text-lg font-bold mb-6">Contact</h4>
        <ul className="space-y-4 text-gray-400">
          <li className="flex gap-3">
            <MapPin className="text-orange-500 shrink-0" />
            <span>Galaxy Tower, Vijay Nagar,<br/>Indore, MP</span>
          </li>
          <li className="flex gap-3">
            <Phone className="text-orange-500 shrink-0" />
            <span>+91 98765 43210</span>
          </li>
          <li className="flex gap-3">
            <Mail className="text-orange-500 shrink-0" />
            <span>bookings@mitroz.com</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
      
      {/* Copyright */}
      <p>&copy; 2026 Mitroz. All rights reserved.</p>

      {/* 🔥 Developer Credit (Added Here) */}
      <p className="flex items-center gap-1">
        Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by 
        <a 
          href="https://yogesh-gadhewal.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white font-medium hover:text-orange-400 transition-colors ml-1"
        >
          Yogesh Gadhewal.
        </a>
      </p>

      {/* Policy Links */}
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  </div>
</footer>

      {/* ================= FLOATING ACTION BUTTON (Mobile) ================= */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        showFloatingBtn ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}>
        <button 
          onClick={() => (window.location.href = "/dineout")}
          className="flex items-center gap-2 bg-black text-white px-6 py-4 rounded-full font-bold shadow-2xl shadow-orange-500/20 border border-white/10 hover:bg-orange-600 transition-colors"
        >
          <UtensilsCrossed size={20} />
          <span className="hidden sm:inline">Book Table</span>
        </button>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        /* Ken Burns Effect */
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-out infinite alternate;
        }

        /* Slide Up Text Reveal */
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Fade In Down */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        /* Fade In Up */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Section Reveal Animation */
        .reveal-section {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          filter: blur(10px);
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal-section.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        /* Slow Spin */
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MitrozHomepage;