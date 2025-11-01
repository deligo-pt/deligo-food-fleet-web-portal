"use client";

import Link from "next/link";
import { Facebook, Instagram,  Linkedin , Youtube} from "lucide-react";
const socialLinks = [
  { name: "Facebook", Icon: Facebook, href: "https://www.facebook.com/deligoeu/" },
  
  { name: "Instagram", Icon: Instagram, href: "https://instagram.com/yourpage" },
  { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/deligopt" },
  { name: "YouTube", Icon: Youtube, href: " https://www.youtube.com/@DeliGoPT" },
];
export default function FooterUltra() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-tr from-[#FFF0F8] via-[#FFEFF5] to-[#FFF5FA] pt-16 pb-8">
      {/* Floating gradient blobs */}
      <div className="absolute top-0 left-10 w-36 h-36 rounded-full bg-[#DC3173]/20 blur-3xl animate-floatSlow"></div>
      <div className="absolute bottom-20 right-16 w-48 h-48 rounded-full bg-[#DC3173]/10 blur-3xl animate-floatSlow delay-1500"></div>
      <div className="absolute top-1/2 left-1/4 w-28 h-28 rounded-full bg-[#DC3173]/30 blur-2xl animate-floatSlow delay-3000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h4>
          <p className="text-gray-700 text-sm">
            Email:{" "}
            <a href="mailto:support@amer.com" className="text-[#DC3173] hover:underline">
              support@deligo.pt
            </a>
          </p>
          <p className="text-gray-700 text-sm mt-1">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-[#DC3173] hover:underline">
               +351 920 136 680
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
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
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>
              <Link href="/TermsOfService" className="hover:text-[#DC3173] transition-colors duration-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/PrivacyPolicy" className="hover:text-[#DC3173] transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies-policy" className="hover:text-[#DC3173] transition-colors duration-300">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:text-[#DC3173] transition-colors duration-300">
                Security
              </Link>
            </li>
            <li>
              <Link href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" className="hover:text-[#DC3173] transition-colors duration-300">
                Complaints Book
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">DeliGo</h4>
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} DeliGo. All rights reserved.</p>
          <p className="text-gray-700 text-sm mt-1">Delivering excellence across Portugal</p>
          {/* Mini CTA */}
          <div className="mt-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#DC3173] text-white text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Become an Agent
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
