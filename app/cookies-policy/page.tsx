"use client";

import Link from "next/link";
import { FileText,  CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-tr from-[#FFF0F4] to-[#FFE8F2] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC3173] flex items-center justify-center text-white shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold uppercase text-[#DC3173] tracking-wider">Legal & Privacy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              Cookies Policy — Fleet Managers/Agents (Portugal)
            </h1>
            <p className="mt-6 text-gray-700 text-lg sm:text-xl max-w-3xl">
              This Cookies Policy explains how <strong>PIXELMIRACLE LDA/DeliGo</strong> collects, stores, and uses cookies
              when you access our platform. By using the platform, you consent to our cookie practices.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/register-agent"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#DC3173] text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Become an Agent
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="p-8 rounded-3xl bg-white shadow-2xl border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900">Effective Date</h3>
              <p className="mt-2 text-sm text-gray-600">October 25, 2025</p>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-800">Need Help?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Email: <a href="mailto:support@deligo.pt" className="text-[#DC3173]">support@deligo.pt</a>
                </p>
              </div>
            </motion.div>
            <div className="absolute -bottom-16 left-1/4 w-96 h-96 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob opacity-90"></div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-4">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">On this page</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#intro" className="block text-gray-700 hover:text-[#DC3173]">Introduction</a></li>
                <li><a href="#what-are-cookies" className="block text-gray-700 hover:text-[#DC3173]">What are Cookies?</a></li>
                <li><a href="#types" className="block text-gray-700 hover:text-[#DC3173]">Types of Cookies</a></li>
                <li><a href="#how-we-use" className="block text-gray-700 hover:text-[#DC3173]">How We Use Cookies</a></li>
                <li><a href="#consent" className="block text-gray-700 hover:text-[#DC3173]">Consent & Control</a></li>
                <li><a href="#third-party" className="block text-gray-700 hover:text-[#DC3173]">Third-Party Cookies</a></li>
                <li><a href="#retention" className="block text-gray-700 hover:text-[#DC3173]">Cookie Retention</a></li>
                <li><a href="#gdpr" className="block text-gray-700 hover:text-[#DC3173]">GDPR Compliance</a></li>
                <li><a href="#changes" className="block text-gray-700 hover:text-[#DC3173]">Changes to Policy</a></li>
                <li><a href="#contact" className="block text-gray-700 hover:text-[#DC3173]">Contact</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-3 prose prose-neutral max-w-none space-y-8">
            <section id="intro">
              <h2>1. Introduction</h2>
              <p>
                Cookies are small text files stored on your device to improve user experience, store preferences,
                and analyze traffic. This policy explains the types, purpose, and management of cookies on our platform.
              </p>
            </section>

            <section id="what-are-cookies">
              <h2>2. What Are Cookies?</h2>
              <p>
                Cookies enable our platform to remember your actions and preferences over time, making your experience
                smoother and personalized.
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Essential:</strong> Required for platform operation.</li>
                <li><strong>Performance:</strong> Measure traffic and improve usability.</li>
                <li><strong>Functional:</strong> Remember settings and preferences.</li>
                <li><strong>Marketing:</strong> Track for personalized ads and campaigns.</li>
              </ul>
            </section>

            <section id="types">
              <h2>3. Types of Cookies We Use</h2>
              <ul className="space-y-2">
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2"/> Strictly Necessary: Login, navigation, and security.</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2"/> Analytics: Gather platform usage data.</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2"/> Preferences: Language, theme, or region settings.</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2"/> Marketing: Personalize offers and track campaigns.</li>
              </ul>
            </section>

            <section id="how-we-use">
              <h2>4. How We Use Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Maintain login sessions and security.</li>
                <li>Analyze platform traffic & performance.</li>
                <li>Personalize user experience and content.</li>
                <li>Support marketing campaigns and analytics.</li>
              </ul>
            </section>

            <section id="consent">
              <h2>5. Consent & User Control</h2>
              <p>
                You can control cookies through your browser settings. You can accept, reject, or delete cookies.
                Please note some cookies are essential for platform operation.
              </p>
              <p>
                Our platform also provides a cookie consent banner at first visit for GDPR compliance.
              </p>
            </section>

            <section id="third-party">
              <h2>6. Third-Party Cookies</h2>
              <p>
                We integrate services like Google Analytics, advertising partners, and other tools. They may place cookies,
                which are governed by their respective policies.
              </p>
            </section>

            <section id="retention">
              <h2>7. Cookie Retention</h2>
              <p>
                Cookies are stored for varying durations, from session-based (deleted after browser closes) to persistent
                (kept for months). Retention depends on the type and purpose.
              </p>
            </section>

            <section id="gdpr">
              <h2>8. GDPR Compliance</h2>
              <p>
                We comply with GDPR. Users can request access, correction, or deletion of personal data related to cookies.
              </p>
              <p>
                Non-essential cookies are only set after obtaining explicit consent.
              </p>
            </section>

            <section id="changes">
              <h2>9. Changes to this Policy</h2>
              <p>
                This policy may be updated periodically. Updates are published on the platform. Continued use implies acceptance.
              </p>
            </section>

            <section id="contact">
              <h2>10. Contact</h2>
              <p>
                For questions about this Cookies Policy:
              </p>
              <p className="mt-2 text-sm text-gray-700">
                PIXELMIRACLE LDA/DeliGo — Lisbon, Portugal<br />
                Email: <a href="mailto:support@deligo.pt" className="text-[#DC3173]">support@deligo.pt</a><br />
                Phone: <a href="tel:+351 920 136 680" className="text-[#DC3173]">+351 920 136 680</a>
              </p>
            </section>

            <section className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} DeliGo. All rights reserved.
              </p>
            </section>
          </article>
        </div>
      </div>

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
