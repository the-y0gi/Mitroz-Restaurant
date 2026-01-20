import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import img1 from "../assets/i1.png"
import img2 from "../assets/i2.png"
import img3 from "../assets/i3.png"
import img4 from "../assets/i4.png"
import img5 from "../assets/i5.png"
import img6 from "../assets/i6.png"

import img7 from "../assets/i7.png"

const galleryImages = [
  { id: 1, src: img1, alt: "Dining Area" },
  { id: 2, src: img6, alt: "Event Night" },
  { id: 3, src: img3, alt: "Hookah Lounge" },

  { id: 5, src: img7, alt: "Terrace Vibes" },
  { id: 6, src: img5, alt: "Mocktail Bar" },
];

const Gallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  return (
    <section id="gallery" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">
            Glimpses of our beautiful spaces and events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-white text-center">
           
                  <p className="font-semibold drop-shadow-md">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
