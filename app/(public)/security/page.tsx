"use client";

import { ShieldCheck, Lock, Key, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-tr from-[#FFF0F4] to-[#FFE8F2] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC3173] flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold uppercase text-[#DC3173] tracking-wider">{t("security_safety")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              {t("security_data_protection")}
            </h1>
            <p className="mt-6 text-gray-700 text-lg sm:text-xl max-w-3xl">
              {t("we_prioritize")} <strong>{t("pixelmiracle")}</strong> {t("safeguards_your_account")}
            </p>
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
                <h4 className="text-sm font-medium text-gray-800">{t("need_support")}</h4>
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
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-4">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">{t("on_this_page")}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#account" className="block text-gray-700 hover:text-[#DC3173]">{t("account_security")}</a></li>
                <li><a href="#data" className="block text-gray-700 hover:text-[#DC3173]">{t("data_protection")}</a></li>
                <li><a href="#access" className="block text-gray-700 hover:text-[#DC3173]">{t("access_controls")}</a></li>
                <li><a href="#encryption" className="block text-gray-700 hover:text-[#DC3173]">{t("encryption_standards")}</a></li>
                <li><a href="#alerts" className="block text-gray-700 hover:text-[#DC3173]">{t("monitoring_alerts")}</a></li>
                <li><a href="#gdpr" className="block text-gray-700 hover:text-[#DC3173]">{t("gdpr_compliance")}</a></li>
                <li><a href="#contact" className="block text-gray-700 hover:text-[#DC3173]">{t("contact")}</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-3 prose prose-neutral max-w-none space-y-10">
            <section id="account">
              <h2>1. {t("account_security")}</h2>
              <p>
                {t("we_ensure_your_account")}
              </p>
            </section>

            <section id="data">
              <h2>2. {t("data_protection")}</h2>
              <p>
                {t("all_personal_operational")}
              </p>
            </section>

            <section id="access">
              <h2>3. {t("access_controls")}</h2>
              <ul className="space-y-2">
                <li><Lock className="inline w-5 h-5 text-blue-500 mr-2" /> {t("role_based_access")}</li>
                <li><Key className="inline w-5 h-5 text-blue-500 mr-2" /> {t("regular_access_audits")}</li>
                <li><ShieldCheck className="inline w-5 h-5 text-blue-500 mr-2" /> {t("secure_session")}</li>
              </ul>
            </section>

            <section id="encryption">
              <h2>4. {t('encryption_standards')}</h2>
              <p>
                {t("we_encrypt_sensitive")}
              </p>
            </section>

            <section id="alerts">
              <h2>5. {t("monitoring_alerts")}</h2>
              <p>
                {t("our_platform_continuously")}
              </p>
            </section>

            <section id="gdpr">
              <h2>6. {t("gdpr_regulatory_compliance")}</h2>
              <p>
                {t("all_personal_data_handled")}
              </p>
            </section>

            <section id="contact">
              <h2>7. {t("contact")}</h2>
              <p>
                {t("for_security_inquiries")}:
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {t("pixelmiracle")} — Lisbon, Portugal<br />
                {t('email')}: <a href="mailto:contact@deligo.pt" className="text-[#DC3173]">contact@deligo.pt</a><br />
                {t("phone")}: <a href="tel:+351920136680" className="text-[#DC3173]">+351 920 136 680</a>
              </p>
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
        .prose li { margin-bottom: 0.5rem; }
      `}</style>
    </main>
  );
}
