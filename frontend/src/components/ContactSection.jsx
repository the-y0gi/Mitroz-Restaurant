import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
  };

  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* --- LEFT SIDE: Info & Header --- */}
          <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Get in Touch</h2>
                <p className="mt-3 text-lg text-gray-600 max-w-md">
                Have questions or want to book a private event? Drop us a message!
                </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-orange-600">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Call Us</h4>
                  <p className="text-gray-600 font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-orange-600">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Email Us</h4>
                  <p className="text-gray-600 font-medium">hello@mitroz.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-orange-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Visit Us</h4>
                  <p className="text-gray-600 font-medium">
                    Vijay Nagar, Indore, MP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Compact Form --- */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition font-medium placeholder-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition resize-none font-medium placeholder-gray-400"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                SendMessage <ArrowRight size={18} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;