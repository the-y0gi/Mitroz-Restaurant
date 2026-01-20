import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Play,
  Utensils,
  Coffee,
  Waves,
  Sparkles,
  Award,
  Music,
  Clock,
  Heart,
} from "lucide-react";
import TestimonialsSection from "../components/TestimonialsSection ";
import WhyVisitUs from "../components/WhyVisitUs";
import Gallery from "../components/Gallery";
import ExperiencesSection from "../components/ExperiencesSection";
import BookByOccasion from "../components/BookByOccasion";

const MitrozHomepage = () => {
  const [currentOccasion, setCurrentOccasion] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const occasions = [
    {
      title: "Birthday Celebrations",
      image: "🎂",
      description: "Make your special day unforgettable",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Corporate Events",
      image: "💼",
      description: "Professional dining & event spaces",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Private Parties",
      image: "🎉",
      description: "Exclusive venues for your celebrations",
      color: "from-purple-500 to-violet-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          setIsVisible((prev) => ({ ...prev, [el.dataset.animate]: true }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextOccasion = () => {
    setCurrentOccasion((prev) => (prev + 1) % occasions.length);
  };

  const prevOccasion = () => {
    setCurrentOccasion(
      (prev) => (prev - 1 + occasions.length) % occasions.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-pulse"
          style={{
            backgroundImage: `linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)`,
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
          }}
        ></div>

        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 transform ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              data-animate="hero"
            >
              Experience Fine Dining & Unforgettable Events
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-300 transform ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Book your table, sip a mocktail, celebrate on the terrace!
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 transform ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <button
                onClick={() => (window.location.href = "/dineout")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reserve Table
              </button>
              <button
                onClick={() => (window.location.href = "/event")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Plan an Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Experience Cards */}

      <ExperiencesSection />

      {/* Book by Occasion Carousel */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Book by Occasion
            </h2>
            <p className="text-xl text-gray-600">
              Perfect venues for every celebration
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentOccasion * 100}%)` }}
              >
                {occasions.map((occasion, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div
                      className={`relative h-80 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${occasion.color}`}
                    >
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
                        <div className="text-6xl mb-4">{occasion.image}</div>
                        <h3 className="text-2xl font-bold mb-2">
                          {occasion.title}
                        </h3>
                        <p className="text-lg mb-6 text-center">
                          {occasion.description}
                        </p>
                        <button
                          onClick={() => (window.location.href = "/event")}
                          className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevOccasion}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextOccasion}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section> */}
      <BookByOccasion/>

      {/* Gallery Section */}

      <Gallery />

      {/* Why Visit Us */}

      <WhyVisitUs />

      {/* Customer Testimonials */}

      <TestimonialsSection />

      {/* Quick Reservation */}
      {/* <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <h2 className="text-4xl font-bold mb-4">Quick Reservation</h2>
            <p className="text-xl">Book your table in seconds</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Guests</option>
                </select>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => window.location.href = '/dineout'}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday – Friday: 11:00 AM – 11:00 PM</li>
                <li>Saturday: 12:00 PM – 12:00 AM</li>
                <li>Sunday: 12:00 PM – 10:00 PM</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Mitroz</h3>
              <p className="text-gray-400 mb-4">
                Experience fine dining and unforgettable events in the heart of
                the city.
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/dineout"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reserve Table
                  </a>
                </li>
                <li>
                  <a
                    href="/mocktail"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mocktail Menu
                  </a>
                </li>
                <li>
                  <a
                    href="/event"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Plan Event
                  </a>
                </li>
                <li>
                  <a
                    href="/menu"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    View Menu
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-15 h-5 mr-2" />
                  <span>
                    3rd Floor, aaa Tower, Opp. bbb, ccc,  dddd,
                    eeee, ffff, gggg 11111
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>999999999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>hello@mitroz.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mitroz Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default MitrozHomepage;
