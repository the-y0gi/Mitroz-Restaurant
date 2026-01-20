import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aarav M.",
    role: "Food Enthusiast",
    message:
      "The terrace dining was magical! Perfect lighting and live music created the best setting for our anniversary.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Neha S.",
    role: "Lifestyle Blogger",
    message:
      "The 'Spicy Guava' mocktail is a must-try. The vibe is absolutely premium and the staff treats you like royalty.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Rohan T.",
    role: "Event Planner",
    message:
      "Smooth process for our corporate event. The layout allowed for great networking while maintaining privacy.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [key, setKey] = useState(0); // To trigger animation restart

  const handleSlide = (dir) => {
    setDirection(dir);
    setKey((prev) => prev + 1);
    if (dir === "next") {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => handleSlide("next"), 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50 flex items-center justify-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent opacity-70 pointer-events-none" />

      <div className="max-w-xl w-full px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Guest Love</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-2 rounded-full opacity-80" />
        </div>

        {/* Stacked Card Effect Wrapper */}
        <div className="relative">
          {/* Back Card (Decorative Stack) */}
          <div className="absolute top-4 left-4 w-full h-full bg-orange-200/50 rounded-3xl -rotate-2 scale-[0.98] transition-all duration-500"></div>
          <div className="absolute top-2 left-2 w-full h-full bg-orange-100 rounded-3xl -rotate-1 scale-[0.99] transition-all duration-500"></div>

          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-xl shadow-orange-500/5 p-8 pt-12 border border-gray-100">
            
            {/* Floating Avatar (Top Center) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 rounded-full p-1 bg-white shadow-lg ring-1 ring-orange-100">
                <img 
                  src={current.avatar} 
                  alt={current.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1.5 shadow-sm border-2 border-white">
                <Quote size={10} className="text-white fill-white" />
              </div>
            </div>

            {/* Navigation Buttons (Inside Card Edge) */}
            <button
              onClick={() => handleSlide("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleSlide("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content with Animation */}
            <div key={key} className="text-center px-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4 text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < current.rating ? "fill-current" : "text-gray-200"}`}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-600 text-lg leading-relaxed font-medium italic mb-6">
                "{current.message}"
              </p>

              {/* Author */}
              <div>
                <h4 className="font-bold text-gray-900">{current.name}</h4>
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mt-1">{current.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setKey(prev => prev + 1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-6 h-1.5 bg-orange-500"
                  : "w-1.5 h-1.5 bg-gray-300 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;