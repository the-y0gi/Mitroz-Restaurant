import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import imgH from "../assets/hooka.jpg"
import imgM from "../assets/mocktail.jpg"
import imgO from "../assets/outdoor.jpg"
import imgE from "../assets/imgBB.jpg"
// Sample experience data
const experiences = [
  {
    title: "Dineout",
    description: "Enjoy elegant indoor or outdoor dining.",
    icon: "🍽️",
    image: imgO,
    route: "/dineout",
  },
  {
    title: "Mocktail Lounge",
    description: "Refreshing drinks and classy vibes.",
    icon: "🍹",
    image: imgM,
    route: "/mocktail",
  },
  {
    title: "Hookah Lounge",
    description: "Unwind with music and flavorful hookah.",
    icon: "💨",
    image: imgH,
    route: "/mocktail",
  },
  {
    title: "Event Booking",
    description: "Plan birthdays, parties & more!",
    icon: "🎉",
    image: imgE,
    route: "/event",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ExperiencesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (inView) setAnimateCards(true);
  }, [inView]);

  return (
    <section id="experiences" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Experiences
          </h2>
          <p className="text-xl text-gray-600">
            Discover the perfect setting for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={animateCards ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all hover:scale-105"
              onClick={() => (window.location.href = exp.route)}
            >
              {/* Background Image */}
              <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center text-white p-6 text-center">
                  <div className="text-4xl mb-4">{exp.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-sm opacity-90">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
