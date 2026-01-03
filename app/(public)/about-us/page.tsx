"use client";

import { Users, Globe, Rocket, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFF0F4] to-[#FFE8F2] overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 sm:gap-12">
          {/* Left Hero Content */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#DC3173] leading-tight">
              {t("about_us_header")}
            </h1>
            <p className="mt-4 sm:mt-6 text-gray-800 text-base sm:text-lg max-w-md sm:max-w-xl mx-auto lg:mx-0">
              {t("about_us_desc")}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC3173] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
                href="/become-agent"
              >
                {t("join_us_now")}
                <Rocket className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#DC3173] font-semibold rounded-full shadow hover:shadow-md transition"
                href="/contact-us"
              >
                {t("contact_us")}
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
            <h2 className="text-4xl font-extrabold text-[#DC3173]">{t("our_mission")}</h2>
            <p className="text-gray-800 text-lg sm:text-xl">
              {t("our_mission_desc")}
            </p>

            <h2 className="text-4xl font-extrabold text-[#DC3173] mt-8">{t("our_vision")}</h2>
            <p className="text-gray-800 text-lg sm:text-xl">
              {t("We envision a future where every city in Portugal has empowered and successful fleet management teams, seamlessly connected through our platform, driving transparency, safety, and sustainable growth.")}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-2xl bg-linear-to-tr from-[#FFE0F4] to-[#FFF0F4] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Users className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">{t("empowering_people")}</h3>
              <p className="text-gray-700 text-sm mt-2">{t("empowering_desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-tr from-[#FFF5E0] to-[#FFE8F2] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Globe className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">{t("nationwide_reach")}</h3>
              <p className="text-gray-700 text-sm mt-2">{t("nationwide_desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-tr from-[#E0F4FF] to-[#F0F8FF] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Rocket className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">{t("innovation_growth")}</h3>
              <p className="text-gray-700 text-sm mt-2">{t("innovation_desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-tr from-[#FFE0F0] to-[#FFF0F4] shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
              <Award className="w-10 h-10 text-[#DC3173] mb-4" />
              <h3 className="font-semibold text-lg">{t("trusted_secure")}</h3>
              <p className="text-gray-700 text-sm mt-2">{t("trusted_desc")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-[#DC3173] py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold">{t("join_our_fleet_community")}</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          {t("fleet_community_desc")}
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/become-agent"
          className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-white text-[#DC3173] font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          {t("registerNow")}
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
