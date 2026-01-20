import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Music2, HeartHandshake, Smartphone, ArrowUpRight } from "lucide-react";

const usps = [
  {
    title: "Stunning Terrace Dining",
    description: "Experience magical evenings under the open sky with a breathtaking panoramic city view.",
    icon: <UtensilsCrossed size={32} />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Live Music & Vibes",
    description: "Immerse yourself in soulful acoustic sessions and curated playlists that set the perfect mood.",
    icon: <Music2 size={32} />,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Premium Hospitality",
    description: "Our staff doesn't just serve food; they craft experiences with warmth and attention to detail.",
    icon: <HeartHandshake size={32} />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Seamless Booking",
    description: "Reserve your favorite spot instantly via our digital concierge. No waiting, just dining.",
    icon: <Smartphone size={32} />,
    color: "bg-emerald-50 text-emerald-600",
  },
];

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // हर कार्ड 0.2s के बाद आएगा
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const WhyVisitUs = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 mb-4 border border-orange-200 bg-orange-50 rounded-full">
            <span className="text-xs font-bold text-orange-600 tracking-widest uppercase">
              The Mitroz Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            More Than Just Dining
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            We blend culinary excellence with an ambiance that stays with you. Here is why our guests keep coming back.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${usp.color} group-hover:bg-orange-500 group-hover:text-white`}>
                {usp.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                {usp.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {usp.description}
              </p>

              {/* Learn More Link (Visual Cue) */}
              <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-orange-500 transition-colors">
                <span>Explore</span>
                <ArrowUpRight size={16} className="ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              {/* Bottom Gradient Line (On Hover) */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 group-hover:w-full rounded-b-2xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyVisitUs;