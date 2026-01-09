"use client";

import Link from "next/link";
import { FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

export default function CookiesPolicy() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-linear-to-tr from-[#FFF0F4] to-[#FFE8F2] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC3173] flex items-center justify-center text-white shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold uppercase text-[#DC3173] tracking-wider">{t("legal_privacy")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              {t("cookies_policy")}
            </h1>
            <p className="mt-6 text-gray-700 text-lg sm:text-xl max-w-3xl">
              {t("this_is_cookies_policy")} <strong>{t("pixelmiracle")}</strong> {t("collects_stores")}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/become-agent"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#DC3173] text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                {t("become_an_agent")}
              </Link>
              <Link
                href="/PrivacyPolicy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition"
              >
                {t("privacy_policy")}
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
              <h3 className="text-lg font-semibold text-gray-900">{t("effective_date")}</h3>
              <p className="mt-2 text-sm text-gray-600">October 25, 2025</p>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-800">{t("need_help")}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {t("email")}: <a href="mailto:contact@deligo.pt" className="text-[#DC3173]">contact@deligo.pt</a>
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
              <h5 className="text-sm font-semibold text-gray-900 mb-2">{t("on_this_page")}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#intro" className="block text-gray-700 hover:text-[#DC3173]">{t("introduction")}</a></li>
                <li><a href="#what-are-cookies" className="block text-gray-700 hover:text-[#DC3173]">{t("what_are_cookies")}</a></li>
                <li><a href="#types" className="block text-gray-700 hover:text-[#DC3173]">{t("types_of_cookies")}</a></li>
                <li><a href="#how-we-use" className="block text-gray-700 hover:text-[#DC3173]">{t("how_we_use_cookies")}</a></li>
                <li><a href="#consent" className="block text-gray-700 hover:text-[#DC3173]">{t("consent_control")}</a></li>
                <li><a href="#third-party" className="block text-gray-700 hover:text-[#DC3173]">{t("third_party_cookies")}</a></li>
                <li><a href="#retention" className="block text-gray-700 hover:text-[#DC3173]">{t("cookie_retention")}</a></li>
                <li><a href="#gdpr" className="block text-gray-700 hover:text-[#DC3173]">{t("gdpr_compliance")}</a></li>
                <li><a href="#changes" className="block text-gray-700 hover:text-[#DC3173]">{t("changes_to_policy")}</a></li>
                <li><a href="#contact" className="block text-gray-700 hover:text-[#DC3173]">{t("contact")}</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-3 prose prose-neutral max-w-none space-y-8">
            <section id="intro">
              <h2>1. {t("introduction")}</h2>
              <p>
                {t("cookies_are_small_text")}
              </p>
            </section>

            <section id="what-are-cookies">
              <h2>2. {t("what_are_cookies")}</h2>
              <p>
                {t("cookies_enable")}
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>{t("essential")}:</strong> {t("required_for_platform")}</li>
                <li><strong>{t("performance")}:</strong> {t("measure_traffic_imporve")}</li>
                <li><strong>{t("functional")}:</strong> {t("remember_settings")}</li>
                <li><strong>{t("marketing")}:</strong> {t("track_for_personalized")}</li>
              </ul>
            </section>

            <section id="types">
              <h2>3. {t("types_of_cookies_we_use")}</h2>
              <ul className="space-y-2">
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2" /> {t("strictly_necessary")}</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2" /> {t("analytics")}</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2" /> {t("preferences")}</li>
                <li><CheckCircle className="inline w-5 h-5 text-green-500 mr-2" /> {t("marketing_personalize")}</li>
              </ul>
            </section>

            <section id="how-we-use">
              <h2>4. {t("how_we_use_cookies")}</h2>
              <p>{t("we_use_cookies_to")}:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>{t("maintain_login")}</li>
                <li>{t("analyze_platform")}</li>
                <li>{t("personalize_user")}</li>
                <li>{t("support_marketing")}</li>
              </ul>
            </section>

            <section id="consent">
              <h2>5. {t("content_user_control")}</h2>
              <p>
                {t("you_can_control_cookies")}
              </p>
              <p>
                {t("our_platform_provides")}
              </p>
            </section>

            <section id="third-party">
              <h2>6. {t("third_party_cookies")}</h2>
              <p>
                {t("we_integrate_servies")}
              </p>
            </section>

            <section id="retention">
              <h2>7. {t('cookie_retention')}</h2>
              <p>
                {t("cookies_are_stored")}
              </p>
            </section>

            <section id="gdpr">
              <h2>8. {t('gdpr_compliance')}</h2>
              <p>
                {t("we_comply_with_gdpr")}
              </p>
              <p>
                {t("non_essential_cookies")}
              </p>
            </section>

            <section id="changes">
              <h2>9. {t("changes_to_this_policy")}</h2>
              <p>
                {t("this_policy_may_be_updated")}
              </p>
            </section>

            <section id="contact">
              <h2>10. {t("contact")}</h2>
              <p>
                {t("for_questions")}:
              </p>
              <div className="mt-2 text-sm text-gray-700">
                {t("pixelmiracle")} — Lisbon, Portugal<br />
                {t("email")}: <a href="mailto:contact@deligo.pt" className="text-[#DC3173]">contact@deligo.pt</a><br />
                {t("phone")}: <span>
                  <a href="tel:+351920136680" className="text-[#DC3173]">+351 920 136 680</a> <span className="text-black"> , </span>
                  <a href="tel:+351217570184" className="text-[#DC3173]">+351 217 570 184</a>
                </span>
              </div>
            </section>

            <section className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} {t("deligo_all_rights")}
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
