"use client";

import { Users, Globe, TrendingUp, Shield, Clock, Activity, Smile } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export default function LearnMore() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("learn_feature_title1"),
      description: t("learn_feature_desc1"),
      icon: <Users className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FF5FA2] to-[#DC3173]",
    },
    {
      title: t("learn_feature_title2"),
      description: t("learn_feature_desc2"),
      icon: <Globe className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]",
    },
    {
      title: t("learn_feature_title3"),
      description: t("learn_feature_desc3"),
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#10B981] to-[#047857]",
    },
    {
      title: t("learn_feature_title4"),
      description: t("learn_feature_desc4"),
      icon: <Shield className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]",
    },
    {
      title: t("learn_feature_title5"),
      description: t("learn_feature_desc5"),
      icon: <Clock className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#F472B6] to-[#EC4899]",
    },
    {
      title: t("learn_feature_title6"),
      description: t("learn_feature_desc6"),
      icon: <Activity className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#3B82F6] to-[#6366F1]",
    },
    {
      title: t("learn_feature_title7"),
      description: t("learn_feature_desc7"),
      icon: <Smile className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-[#FCD34D] to-[#FBBF24]",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFF0F4] to-[#FFF9FB] relative overflow-hidden">
      {/* Hero Section */}
      <header className="text-center py-32 px-6 relative">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold text-[#DC3173] leading-tight"
        >
          {t("learn_more_fleet_management")}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto"
        >
          {t("learn_more_desc")}
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
          {t("ready_to_grow")}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
        >
          {t("learn_more_cta_desc")}
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/become-agent"
            className="inline-block px-10 py-4 bg-white text-[#DC3173] font-bold rounded-full shadow-lg hover:shadow-xl transition"
          >
            {t("sign_up_now")}
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
