"use client";

import { UserCheck, ShieldCheck, Truck, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up & Submit Documents",
      icon: <UserCheck className="w-8 h-8 text-[#DC3173]" />,
      description: "Register and submit required documents for verification.",
    },
    {
      title: "Verification by Admin",
      icon: <ShieldCheck className="w-8 h-8 text-[#DC3173]" />,
      description: "Our team reviews and approves your application promptly.",
    },
    {
      title: "Start Adding / Monitoring Delivery Boys",
      icon: <Truck className="w-8 h-8 text-[#DC3173]" />,
      description: "Add and manage delivery boys under your supervision.",
    },
    {
      title: "Track Your Performance",
      icon: <BarChart2 className="w-8 h-8 text-[#DC3173]" />,
      description: "Monitor your earnings, deliveries, and performance metrics.",
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
          How It Works
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Follow these simple steps to become a verified agent and start managing deliveries efficiently.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#FFF0F4] p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-white shadow-md mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-black">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/become-agent"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
