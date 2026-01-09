"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
export default function FooterUltra() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: t("facebook"), Icon: Facebook, href: "https://www.facebook.com/deligoeu/" },

    { name: t("instagram"), Icon: Instagram, href: "https://www.instagram.com/deligo.pt" },
    { name: t("linkedin"), Icon: Linkedin, href: "https://www.linkedin.com/in/deligopt" },
    { name: t("youtube"), Icon: Youtube, href: " https://www.youtube.com/@DeliGoPT" },
  ];

  return (
    <footer className="relative overflow-hidden bg-linear-to-tr from-[#FFF0F8] via-[#FFEFF5] to-[#FFF5FA] pt-16 pb-8">
      {/* Floating gradient blobs */}
      <div className="absolute top-0 left-10 w-36 h-36 rounded-full bg-[#DC3173]/20 blur-3xl animate-floatSlow"></div>
      <div className="absolute bottom-20 right-16 w-48 h-48 rounded-full bg-[#DC3173]/10 blur-3xl animate-floatSlow delay-1500"></div>
      <div className="absolute top-1/2 left-1/4 w-28 h-28 rounded-full bg-[#DC3173]/30 blur-2xl animate-floatSlow delay-3000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("contact_us")}</h4>
          <p className="text-gray-700 text-sm">
            {t("email")}:{" "}
            <a href="mailto:contact@deligo.pt" className="text-[#DC3173] hover:underline">
              contact@deligo.pt
            </a>
          </p>
          <div className="text-gray-700 text-sm mt-1">
            {t("phone")}:{" "}
            <div className="flex gap-1 items-center">
              <a href="tel:+351920136680" className="text-[#DC3173] hover:underline">
                +351 920 136 680 <span className="text-black"> , </span>
              </a>
              <a href="tel:+351217570184" className="text-[#DC3173] hover:underline">
                +351 217 570 184
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("follow_us")}</h4>
          <div className="flex gap-4 mt-2">
            {socialLinks.map(({ Icon, href, name }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-gray-600 hover:text-[#DC3173] transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("quick_links")}</h4>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>
              <Link href="/TermsOfService" className="hover:text-[#DC3173] transition-colors duration-300">
                {t("terms_of_service")}
              </Link>
            </li>
            <li>
              <Link href="/PrivacyPolicy" className="hover:text-[#DC3173] transition-colors duration-300">
                {t("privacy_policy")}
              </Link>
            </li>
            <li>
              <Link href="/cookies-policy" className="hover:text-[#DC3173] transition-colors duration-300">
                {t("cookies")}
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:text-[#DC3173] transition-colors duration-300">
                {t("security")}
              </Link>
            </li>
            <li>
              <Link href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" className="hover:text-[#DC3173] transition-colors duration-300">
                {t("complaints_book")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform duration-300 my-4"
          >
            {/* Animated Logo Image */}
            <div className="w-9 h-9 overflow-hidden rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image
                src="/deligoLogo.png"
                alt="DeliGo Logo"
                width={50}
                height={50}
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Brand Text */}
            <span className="font-bold text-xl text-[#DC3173] group-hover:opacity-90 transition-opacity duration-300">
              DeliGo
            </span>
          </Link>
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} {t("deligo_all_rights")}</p>
          <p className="text-gray-700 text-sm mt-1">{t("delivering_excellence")}</p>
          {/* Mini CTA */}
          <div className="mt-4">
            <Link
              href="/become-agent"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#DC3173] text-white text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("become_an_agent")}
            </Link>
          </div>
        </div>
      </div>



      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </footer>
  );
}
