"use client";

import { Users, Globe, TrendingUp, Shield, Clock, Activity, Smile } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LearnMore() {
  const features = [
    {
      title: "Why Join as a Fleet Manager?",
      description:
        "Operate your delivery fleet with ease, earn reliably, and gain insights that help your business grow across Portugal.",
      icon: <Users className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FF5FA2] to-[#DC3173]",
    },
    {
      title: "Manage Anywhere",
      description:
        "Track drivers, monitor deliveries, and manage operations from Lisbon to Porto or any city in Portugal, all in real-time.",
      icon: <Globe className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]",
    },
    {
      title: "Scale Your Business",
      description:
        "Add multiple verified delivery drivers, track performance, and maximize your earnings with transparent payouts.",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#10B981] to-[#047857]",
    },
    {
      title: "Data Security & GDPR Compliant",
      description:
        "Your personal and fleet data are safe. We adhere strictly to GDPR and secure your fleet information.",
      icon: <Shield className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]",
    },
    {
      title: "Flexible Work Hours",
      description:
        "Set your own schedule and manage drivers at your convenience. Full control with minimum hassle.",
      icon: <Clock className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#F472B6] to-[#EC4899]",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Get live reports on deliveries, driver performance, and earnings to make informed decisions instantly.",
      icon: <Activity className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#3B82F6] to-[#6366F1]",
    },
    {
      title: "Support & Guidance",
      description:
        "Our team in Portugal provides full support and guidance to help you grow your fleet business efficiently.",
      icon: <Smile className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FCD34D] to-[#FBBF24]",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF0F4] to-[#FFF9FB] relative overflow-hidden">
      {/* Hero Section */}
      <header className="text-center py-32 px-6 relative">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold text-[#DC3173] leading-tight"
        >
          Learn More About Fleet/Agent Management in Portugal
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto"
        >
          Discover how you can efficiently manage delivery fleets, grow your business, and ensure secure operations across every city in Portugal.
        </motion.p>

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FF8FB6]/20 blur-3xl animate-blob opacity-70"></div>
      </header>

      {/* Features / Steps Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className={`p-8 rounded-3xl shadow-2xl flex flex-col gap-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform ${feat.bg}`}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20">
              {feat.icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{feat.title}</h3>
            <p className="text-white/90">{feat.description}</p>
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-[#DC3173] text-white rounded-3xl max-w-7xl mx-auto px-8 py-20 mt-16 text-center relative overflow-hidden">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold"
        >
          Ready to Grow Your Fleet/Agent Business?
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
        >
          Join DeliGo and take full control of your fleet/Agent operations anywhere in Portugal.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-[#DC3173] font-bold rounded-full shadow-lg hover:shadow-xl transition"
          >
            Sign Up Now
          </Link>
        
        </motion.div>

        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#FF8FB6]/20 blur-3xl animate-blob opacity-70"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FFD1E0]/30 blur-3xl animate-blob opacity-70"></div>
      </section>

      <style jsx>{`
        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </main>
  );
}
