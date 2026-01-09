"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Download, } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Default company details (you can replace these with real values)

const COMPANY_EMAIL = "contact@deligo.pt";
const COMPANY_PHONE = "+351 920 136 680";
const COMPANY_PHONE2 = "+351 217 570 184";
const COMPANY_ADDRESS = "Lisbon, Portugal";
const EFFECTIVE_DATE = "October 25, 2025";

export default function PrivacyPolicyPremium() {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-[#FFF6FA] via-[#FFF0F4] to-[#FFF6F9] text-gray-800">
      {/* Top hero */}
      <header className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:flex-1"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#DC3173] flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold uppercase text-[#DC3173] tracking-wider">{t("privacy_data")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {t("deligo_privacy_policy")}
            </h1>

            <p className="mt-4 text-lg text-gray-700 max-w-3xl">
              {t("privacy_policy_desc")} <strong>{EFFECTIVE_DATE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition"
                aria-label="Download privacy policy as PDF"
              >
                <Download className="w-4 h-4 text-[#DC3173]" />
                {t("download_pdf")}
              </button>

              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {t("contact_data_protection")}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-96 w-full p-6 rounded-2xl bg-white shadow-xl border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">{t("controller")}</h3>
                <p className="text-sm text-gray-600 mt-2">DeliGo — {COMPANY_ADDRESS}</p>
                <p className="text-sm text-gray-600 mt-1">{t("email")}: <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a></p>
                <p className="text-sm text-gray-600 mt-1">{t("phone")}:
                  <a href={`tel:${COMPANY_PHONE}`} className="text-[#DC3173]">{COMPANY_PHONE}</a> ,
                  <a href={`tel:${COMPANY_PHONE2}`} className="text-[#DC3173]">{COMPANY_PHONE2}</a>
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <strong>{t("policy_version")} :</strong> {EFFECTIVE_DATE}
            </div>
          </motion.div>
        </div>

        {/* subtle decorative blob */}
        <div className="pointer-events-none absolute -bottom-16 left-1/4 w-72 h-72 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob" />
      </header>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC column */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-28">
            <nav className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-900">{t("on_this_page")}</h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><a href="#what-data" className="hover:text-[#DC3173]">{t("what_we_collect")}</a></li>
                <li><a href="#why" className="hover:text-[#DC3173]">{t("why_we_process")}</a></li>
                <li><a href="#how" className="hover:text-[#DC3173]">{t("how_we_use")}</a></li>
                <li><a href="#sharing" className="hover:text-[#DC3173]">{t("sharing_processors")}</a></li>
                <li><a href="#rights" className="hover:text-[#DC3173]">{t("your_gdpr_rights")}</a></li>
                <li><a href="#retention" className="hover:text-[#DC3173]">{t("retention")}</a></li>
                <li><a href="#security" className="hover:text-[#DC3173]">{t("security")}</a></li>
                <li><a href="#transfers" className="hover:text-[#DC3173]">{t("international_transfers")}</a></li>
                <li><a href="#contact" className="hover:text-[#DC3173]">{t("contact")}</a></li>
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="lg:col-span-9 space-y-8">
            <section id="what-data">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FFF0F4] flex items-center justify-center text-[#DC3173]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t("what_personal_data")}</h3>
                    <p className="mt-2 text-gray-700">
                      {t("we_collect_information")}
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                      <li><strong>{t("identity_verification")}:</strong> {t("full_name_national_id")}</li>
                      <li><strong>{t("contact")}:</strong> {t("email_phone_postal")}</li>
                      <li><strong>{t("business_payout")}:</strong> {t("company_name_bank_details")}</li>
                      <li><strong>{t("operational")}:</strong> {t("driver_list_delivery_logs")}</li>
                      <li><strong>{t("technical")}:</strong> {t("ip_address_device_browser")}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="why">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("why_we_process_personal")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("we_process_personal")}:
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>{t("contractual_necessity")}:</strong> {t("to_provide_the_services")}</li>
                  <li><strong>{t("legal_compliance")}:</strong> {t("to_meet_tax")}</li>
                  <li><strong>{t("legitimate_interests")}:</strong> {t("to_prevent_fraud")}</li>
                  <li><strong>{t("consent")}:</strong> {t("for_optional_marketing")}</li>
                </ul>
              </motion.div>
            </section>

            <section id="how">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("how_we_use_personal_data")}</h3>
                <ol className="mt-3 list-decimal pl-6 text-gray-700 space-y-2">
                  <li>{t("verify_your_identity")}</li>
                  <li>{t("provide_maintain")}</li>
                  <li>{t("process_payments")}</li>
                  <li>{t("detect_prevent")}</li>
                  <li>{t("communicate_important")}</li>
                </ol>
              </motion.div>
            </section>

            <section id="sharing">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("sharing_processors")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("we_share_data_only_with")}
                </p>
                <p className="mt-2 text-gray-700">
                  {t("we_may_disclose_personal")}
                </p>
              </motion.div>
            </section>

            <section id="rights">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("your_rights_under_gdpr")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("you_have_the_following")} <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a>. {t("we_may_need_to_verify")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>{t("access")}</strong> {t("request_a_copy")}</li>
                  <li><strong>{t("rectification")}</strong> {t("correct_inaccurate_of_incomplete")}</li>
                  <li><strong>{t("erasure")}</strong> {t("request_deletion")}</li>
                  <li><strong>{t("restriction")}</strong> {t("limit_processing")}</li>
                  <li><strong>{t("portability")}</strong> {t("receive_your_data")}</li>
                  <li><strong>{t("object")}</strong> {t("object_to_processing")}</li>
                  <li><strong>{t("lodge_complaint")}</strong> {t("with_your_supervisory")}</li>
                </ul>
              </motion.div>
            </section>

            <section id="retention">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("retention_deletion")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("we_retain_personal_data")}:
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li>{t("account_verification")}</li>
                  <li>{t("financial_records")}</li>
                  <li>{t("logs_analytics")}</li>
                </ul>
              </motion.div>
            </section>

            <section id="security">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("security_measures")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("we_implement_appropriate")}
                </p>
              </motion.div>
            </section>

            <section id="transfers">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.32 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("international_transfers")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("when_data_is_transferred")}
                </p>
              </motion.div>
            </section>

            <section id="cookies">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.36 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("cookies_tracking")}</h3>
                <p className="mt-2 text-gray-700">
                  {t("we_use_essential")}
                </p>
              </motion.div>
            </section>

            <section id="children">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("children")}</h3>
                <p className="mt-2 text-gray-700">{t("our_service_directed")}</p>
              </motion.div>
            </section>

            <section id="changes">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.44 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("changes_to_the_policy")}</h3>
                <p className="mt-2 text-gray-700">{t("we_may_update_this_privacy")}</p>
              </motion.div>
            </section>

            <section id="contact">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.48 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">{t("contact_data_requests")}</h3>
                <p className="mt-2 text-gray-700">{t("to_exercise_your_rights")}:</p>
                <p className="mt-3 text-sm text-gray-700">
                  DeliGo — {COMPANY_ADDRESS}<br />
                  {t("email")}: <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a><br />
                  {t("phone")}: <span>
                    <a href={`tel:${COMPANY_PHONE}`} className="text-[#DC3173]">{COMPANY_PHONE}</a> ,
                    <a href={`tel:${COMPANY_PHONE2}`} className="text-[#DC3173]">{COMPANY_PHONE2}</a>
                  </span>
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} className="h-4 w-4 text-[#DC3173] rounded" />
                    <span className="text-sm text-gray-700">{t("i_have_read")}</span>
                  </label>
                  <button onClick={() => window.print()} className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#DC3173] text-white text-sm font-semibold shadow">
                    <Download className="w-4 h-4" />
                    {t("save_print")}
                  </button>
                </div>
              </motion.div>
            </section>

            <div className="text-sm text-gray-600">© {new Date().getFullYear()} {t('deligo_all_rights')}</div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        @keyframes blob { 0%,100%{ transform: translateY(0px) scale(1); } 50%{ transform: translateY(-16px) scale(1.03); } }
        .prose li { margin-bottom: 0.5rem; }
      `}</style>
    </main>
  );
}
