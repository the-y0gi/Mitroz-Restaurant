import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Wine, Users, Heart, Briefcase, Sparkles } from "lucide-react";

const occasions = [
  {
    id: 1,
    title: "Romantic Date",
    description: "Candlelight & stars.",
    image: "https://media.gettyimages.com/id/2176413547/vector/romantic-couple-celebrating-their-anniversary-in-restaurant-side-view-of-young-couple.jpg?s=1024x1024&w=gi&k=20&c=97hrXkwH-CIoIqr9XbibAxsHLlqO81WKB8Ug7SLxsp0=",
    icon: <Heart size={18} />,
    color: "group-hover:text-rose-400",
  },
  {
    id: 2,
    title: "Corporate Meet",
    description: "Premium professional dining.",
    image:"https://www.shutterstock.com/shutterstock/photos/2583370783/display_1500/stock-vector-group-of-diverse-business-professionals-having-a-discussion-in-a-conference-room-with-charts-and-2583370783.jpg",
    icon: <Briefcase size={18} />,
    color: "group-hover:text-blue-400",
  },
  {
    id: 3,
    title: "Birthdays",
    description: "Joy, cake, and celebrations.",
    image: "https://www.shutterstock.com/shutterstock/photos/2705703751/display_1500/stock-vector-a-happy-young-boy-in-a-blue-party-hat-holds-a-vibrant-multi-tiered-birthday-cake-with-a-candle-2705703751.jpg",
    icon: <Sparkles size={18} />,
    color: "group-hover:text-yellow-400",
  },
  {
    id: 4,
    title: "Family Dinner",
    description: "Warm vibes for loved ones.",
    image: "https://www.shutterstock.com/shutterstock/photos/2146661241/display_1500/stock-vector-company-of-friends-family-couples-are-relaxing-in-nature-in-the-backyard-of-the-house-people-eat-2146661241.jpg",
    icon: <Users size={18} />,
    color: "group-hover:text-green-400",
  },
  {
    id: 5,
    title: "Cocktail Party",
    description: "Music and crafted drinks.",
    image: "https://www.shutterstock.com/shutterstock/photos/2248602427/display_1500/stock-vector-an-elegant-woman-sits-in-a-bar-a-bartender-makes-cocktails-art-deco-style-2248602427.jpg",
    icon: <Wine size={18} />,
    color: "group-hover:text-purple-400",
  },
];

const BookByOccasion = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Occasions at Mitroz
            </h2>
            <p className="text-gray-500 mt-1">Curated settings for your best moments.</p>
          </div>

          {/* Minimal Nav Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-gray-200 text-black hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full border border-gray-200 text-black hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {occasions.map((item) => (
            <div
              key={item.id}
              onClick={() => window.location.href = "/event"}
              className="group relative min-w-[280px] h-[300px] rounded-2xl overflow-hidden cursor-pointer snap-center"
            >
              {/* Image Layer */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Overlay (Subtle) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Content Box - Glassmorphism Bottom Bar */}
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:bg-black/40 group-hover:border-white/30">
                  
                  {/* Title & Icon Row */}
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2 text-white">
                      <span className={`transition-colors duration-300 ${item.color}`}>
                        {item.icon}
                      </span>
                      <h3 className="font-bold text-lg tracking-wide">{item.title}</h3>
                    </div>
                    
                    {/* Arrow Icon (Animates on Hover) */}
                    <div className="bg-white/20 p-1.5 rounded-full text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Description (Collapsible) */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookByOccasion;