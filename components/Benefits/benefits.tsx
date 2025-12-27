"use client";

import { Clock, Eye, Users, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function UniqueBenefitsSection() {
  const benefits = [
    {
      title: "Flexible Working Hours",
      description: "Manage your schedule and work at your own pace.",
      icon: <Clock className="w-8 h-8 text-[#DC3173]" />,
    },
    {
      title: "Transparent Verification & Monitoring",
      description: "Track your progress and see all verification statuses clearly.",
      icon: <Eye className="w-8 h-8 text-[#DC3173]" />,
    },
    {
      title: "Access to Verified Delivery Boys",
      description: "Add and manage delivery boys who are background-checked.",
      icon: <Users className="w-8 h-8 text-[#DC3173]" />,
    },
    {
      title: "Real-time Updates & Notifications",
      description: "Stay informed with instant alerts about deliveries and performance.",
      icon: <Bell className="w-8 h-8 text-[#DC3173]" />,
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient blob */}
        <div className="w-72 h-72 rounded-full bg-[#DC3173]/20 blur-3xl animate-pulse-slow absolute top-[-10%] left-[-10%]" />
        <div className="w-96 h-96 rounded-full bg-[#DC3173]/10 blur-3xl animate-pulse-slow absolute bottom-[-10%] right-[-10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
          Why Join Us
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Unlock amazing benefits and tools to grow your delivery network efficiently.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.25 }}
              viewport={{ once: true }}
              className="relative group bg-gradient-to-tr from-[#FFF0F4] to-[#FFE0F4] p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center text-center transition-all transform hover:-translate-y-1 hover:scale-105"
            >
              <motion.div
                className="p-5 rounded-full bg-white shadow-md mb-4 flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 1 }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-black">{benefit.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{benefit.description}</p>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#DC3173] rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/become-agent"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Join Now
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
