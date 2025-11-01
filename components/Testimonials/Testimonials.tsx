
"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "João Silva",
    city: "Lisbon",
    photo: "/agents/joao.png",
    rating: 5,
    quote: "Joining this delivery network boosted my earnings and gave me flexible working hours. Highly recommended!",
  },
  {
    name: "Maria Fernandes",
    city: "Porto",
    photo: "/agents/maria.png",
    rating: 4.8,
    quote: "The verification process was smooth and now I manage my delivery boys efficiently. Great support!",
  },
  {
    name: "Rui Gomes",
    city: "Faro",
    photo: "/agents/rui.png",
    rating: 4.9,
    quote: "I love the real-time updates and flexible schedule. Truly a game-changer in delivery management.",
  },
  {
    name: "Ana Costa",
    city: "Coimbra",
    photo: "/agents/ana.png",
    rating: 5,
    quote: "Amazing platform with top-notch support. Flexible and highly rewarding!",
  },
];

export default function FloatingTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const getStyle = (idx: number) => {
    const distance = (idx - currentIndex + total) % total;
    if (distance === 0) return { scale: 1.15, x: 0, opacity: 1, zIndex: 10 };
    if (distance === 1 || distance === total - 1) return { scale: 0.9, x: distance === 1 ? 200 : -200, opacity: 0.6, zIndex: 5, rotateY: distance === 1 ? -12 : 12 };
    return { scale: 0.8, x: distance > 1 ? 400 : -400, opacity: 0.3, zIndex: 1 };
  };

  return (
    <section className="relative py-24 bg-gradient-to-tr from-[#FFF0F4] to-[#FFE0F4] overflow-hidden">
      {/* Spotlight gradient behind */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-96 h-96 bg-[#DC3173]/10 rounded-full blur-3xl animate-pulseSlow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-black">Success Stories</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Hear from agents who joined our network and are seeing amazing results.
        </p>

        <div className="mt-16 relative flex justify-center items-center h-80">
          {testimonials.map((t, idx) => {
            const style = getStyle(idx);
            return (
              <motion.div
                key={idx}
                className="absolute w-72 sm:w-80 md:w-96 bg-white p-6 rounded-3xl shadow-2xl cursor-pointer"
                style={style}
                animate={{ scale: style.scale, x: style.x, opacity: style.opacity, rotateY: style.rotateY || 0, zIndex: style.zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.18, y: -8, boxShadow: "0 20px 50px rgba(220,49,115,0.3)" }}
                onClick={() => setCurrentIndex(idx)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    className="rounded-full object-cover border-2 border-[#DC3173]"
                    width={60}
                      height={60}
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-black">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.city}</p>
                    <div className="flex items-center mt-1 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(t.rating) ? "text-[#DC3173]" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{t.quote}</p>

                {/* Floating glow */}
                <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-[#DC3173]/80 animate-pulseSlow"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

