import React, { useState } from "react";
import { Search, Star, Leaf, Flame, Sparkles, ChefHat } from "lucide-react";

// --- MENU DATA ---
const MENU_ITEMS = [
  {
    id: 1,
    category: "Mocktails",
    name: "Spicy Guava Delight",
    description: "Chilled guava juice infused with secret Indian spices and a hint of lemon zest.",
    price: "249",
    image: "https://plus.unsplash.com/premium_photo-1692810407604-8e58c63563d5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "veg",
    tag: "Bestseller", // Custom Tag
    spiceLevel: 2,
  },
  {
    id: 2,
    category: "Mocktails",
    name: "Blue Lagoon Fizz",
    description: "Refreshing blue curacao syrup mixed with sparkling soda and fresh mint leaves.",
    price: "219",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    type: "veg",
    tag: "New",
  },
  {
    id: 3,
    category: "Starters",
    name: "Paneer Tikka Sufiyana",
    description: "Cottage cheese marinated in rich cream and aromatic spices, char-grilled to perfection.",
    price: "399",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
    type: "veg",
    tag: "Chef's Special",
    spiceLevel: 1,
  },
  {
    id: 4,
    category: "Starters",
    name: "Crispy Corn Kernels",
    description: "Deep fried American corn tossed with peppers, onions and Chinese herbs.",
    price: "299",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    type: "veg",
    spiceLevel: 2,
  },
  {
    id: 5,
    category: "Main Course",
    name: "Dal Makhani Mitroz",
    description: "Black lentils simmered overnight on slow coal fire with butter and cream.",
    price: "449",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
    type: "veg",
    tag: "Must Try",
  },
  {
    id: 6,
    category: "Main Course",
    name: "Smoked Butter Chicken",
    description: "Tandoori chicken cooked in rich tomato gravy with butter and fenugreek.",
    price: "549",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop",
    type: "non-veg",
    spiceLevel: 3,
  },
];

const CATEGORIES = ["All", "Mocktails", "Starters", "Main Course", "Desserts"];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-orange-200 selection:text-orange-900 -mt-5">
    
      {/* --- FILTERS & SEARCH --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-lg shadow-black/20"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Find your craving..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MENU GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-3xl p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100/50">
                
                {/* Image Section */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Tag (Bestseller etc) */}
                  {item.tag && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm flex items-center gap-1">
                      <Sparkles size={10} className="text-orange-500 fill-orange-500"/> {item.tag}
                    </div>
                  )}

                  {/* Veg/Non-Veg Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 p-1.5 rounded-lg shadow-sm backdrop-blur-md">
                    <div className={`border ${item.type === 'veg' ? 'border-green-600' : 'border-red-600'} p-[2px]`}>
                      <div className={`w-2 h-2 ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Spice Level Indicator */}
                  {item.spiceLevel && (
                    <div className="flex gap-0.5 mb-3 opacity-60" title="Spice Level">
                      {[...Array(3)].map((_, i) => (
                        <Flame 
                          key={i} 
                          size={14} 
                          className={i < item.spiceLevel ? "text-red-500 fill-red-500" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24}/>
              </div>
              <h3 className="text-lg font-bold text-gray-900">No dishes found</h3>
              <p className="text-gray-500">Try searching for something else.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MenuPage;