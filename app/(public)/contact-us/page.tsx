"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/hooks/use-translation";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const { t } = useTranslation();

  const { register, handleSubmit, reset } = useForm<ContactFormInputs>();

  const onSubmit = (data: ContactFormInputs) => {
    console.log("Form submitted:", data);
    alert("Thank you for contacting us! We will get back to you soon.");
    reset();
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFF0F4] to-[#FFE8F2]">
      {/* Hero Section */}
      <header className="py-24 text-center relative overflow-hidden">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#DC3173] leading-tight">
          {t("contact_us_header")}
        </h1>
        <p className="mt-6 text-gray-800 text-lg sm:text-xl max-w-3xl mx-auto">
          {t("contact_us_desc")}
        </p>

        {/* Soft animated blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob opacity-80"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FF8FB6]/20 blur-3xl animate-blob opacity-70"></div>
      </header>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold text-[#DC3173]">{t("get_in_touch")}</h2>
          <p className="text-gray-700 text-lg">
            {t("get_in_touch_desc")}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#DC3173]/20 text-[#DC3173]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t("email")}</p>
                <p className="text-gray-700">contact@deligo.pt</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF8FB6]/20 text-[#DC3173]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t("phone")}</p>
                <p className="text-gray-700">+351 920 136 680 , +351 217 570 184</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFD1E0]/30 text-[#DC3173]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t("address")}</p>
                <p className="text-gray-700">Lisbon, Portugal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-[#DC3173] mb-6">{t("send_a_message")}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DC3173] focus:outline-none transition"
            />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DC3173] focus:outline-none transition"
            />
            <textarea
              {...register("message", { required: true })}
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DC3173] focus:outline-none transition"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#DC3173] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
            >
              {t("send_message")}
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Animated blobs */}
      <div className="absolute -bottom-32 left-10 w-96 h-96 rounded-full bg-[#FF8FB6]/20 blur-3xl animate-blob opacity-70"></div>
      <div className="absolute -top-32 right-10 w-80 h-80 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob opacity-80"></div>

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
