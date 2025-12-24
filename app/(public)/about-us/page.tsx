"use client";

import { Users, Globe, Rocket, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF0F4] to-[#FFE8F2] overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 sm:gap-12">
          {/* Left Hero Content */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#DC3173] leading-tight">
              About Us — PIXELMIRACLE LDA / DeliGo
            </h1>
            <p className="mt-4 sm:mt-6 text-gray-800 text-base sm:text-lg max-w-md sm:max-w-xl mx-auto lg:mx-0">
              Our mission is to empower Fleet Managers and Agents across Portugal to efficiently manage their operations, monitor delivery drivers, and grow their business while ensuring the highest standards of safety and reliability.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC3173] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
                href="/signup"
              >
                Join Us Now
                <Rocket className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#DC3173] font-semibold rounded-full shadow hover:shadow-md transition"
                href="/contact-us"
              >
                Contact Us
                <Users className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Right Hero / Animated Card */}
          <div className="lg:w-1/2 w-full relative flex justify-center mt-8 lg:mt-0">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 rounded-3xl bg-white shadow-2xl border border-gray-100 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#DC3173]"
            >
              🚚
            </motion.div>

            {/* Blob */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob opacity-90 pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* Our Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-extrabold text-[#DC3173]">Our Mission</h2>
            <p className="text-gray-800 text-lg sm:text-xl">
              To provide a reliable, innovative, and secure platform that empowers Fleet Managers and Agents to streamline operations, connect with verified delivery professionals, and maximize efficiency in the logistics ecosystem across Portugal.
            </p>

            <h2 className="text-4xl font-extrabold text-[#DC3173] mt-8">Our Vision</h2>
            <p className="text-gray-800 text-lg sm:text-xl">
              We envision a future where every city in Portugal has empowered and successful fleet management teams, seamlessly connected through our platform, driving transparency, safety, and sustainable growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#FFE0F4] to-[#FFF0F4] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Users className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">Empowering People</h3>
              <p className="text-gray-700 text-sm mt-2">We prioritize support, training, and resources for fleet managers and agents.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#FFF5E0] to-[#FFE8F2] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Globe className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">Nationwide Reach</h3>
              <p className="text-gray-700 text-sm mt-2">Connecting every city in Portugal to a unified logistics ecosystem.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#E0F4FF] to-[#F0F8FF] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Rocket className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">Innovation & Growth</h3>
              <p className="text-gray-700 text-sm mt-2">Leveraging modern technology to enhance delivery operations and efficiency.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#FFE0F0] to-[#FFF0F4] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Award className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">Trusted & Secure</h3>
              <p className="text-gray-700 text-sm mt-2">Ensuring data protection, compliance, and reliable service for every agent.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-[#DC3173] py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold">Join Our Fleet Community Today</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Become a verified Fleet Manager / Agent in Portugal and access tools, support, and verified delivery professionals to grow your business.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/signup"
          className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-white text-[#DC3173] font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          Register Now
          <Rocket className="w-5 h-5" />
        </motion.a>
      </section>

      <style jsx>{`
        .animate-blob {
          animation: blob 10s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </main>
  );
}
