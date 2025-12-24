"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Download,} from "lucide-react";

// Default company details (you can replace these with real values)
const COMPANY_NAME = "DeliGo";
const COMPANY_EMAIL = "contact@deligo.pt";
const COMPANY_PHONE = "+351 920 136 680";
const COMPANY_ADDRESS = "Lisbon, Portugal";
const EFFECTIVE_DATE = "October 25, 2025";

export default function PrivacyPolicyPremium() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF6FA] via-[#FFF0F4] to-[#FFF6F9] text-gray-800">
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
              <span className="text-sm font-semibold uppercase text-[#DC3173] tracking-wider">Privacy & Data</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {COMPANY_NAME} Privacy Policy — Portugal / EU (GDPR)
            </h1>

            <p className="mt-4 text-lg text-gray-700 max-w-3xl">
              This policy explains how {COMPANY_NAME} collects, uses, stores, and protects personal data when
              you register as a Fleet Manager / Agent and use our services in Portugal and the EU. Effective date: <strong>{EFFECTIVE_DATE}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition"
                aria-label="Download privacy policy as PDF"
              >
                <Download className="w-4 h-4 text-[#DC3173]" />
                Download PDF
              </button>

              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                Contact Data Protection
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
                <h3 className="text-sm font-semibold text-gray-900">Controller</h3>
                <p className="text-sm text-gray-600 mt-2">{COMPANY_NAME} — {COMPANY_ADDRESS}</p>
                <p className="text-sm text-gray-600 mt-1">Email: <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a></p>
                <p className="text-sm text-gray-600 mt-1">Phone: <a href={`tel:${COMPANY_PHONE}`} className="text-[#DC3173]">{COMPANY_PHONE}</a></p>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <strong>Policy version:</strong> {EFFECTIVE_DATE}
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
              <h5 className="text-sm font-semibold text-gray-900">On this page</h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><a href="#what-data" className="hover:text-[#DC3173]">What we collect</a></li>
                <li><a href="#why" className="hover:text-[#DC3173]">Why we process</a></li>
                <li><a href="#how" className="hover:text-[#DC3173]">How we use</a></li>
                <li><a href="#sharing" className="hover:text-[#DC3173]">Sharing & processors</a></li>
                <li><a href="#rights" className="hover:text-[#DC3173]">Your GDPR rights</a></li>
                <li><a href="#retention" className="hover:text-[#DC3173]">Retention</a></li>
                <li><a href="#security" className="hover:text-[#DC3173]">Security</a></li>
                <li><a href="#transfers" className="hover:text-[#DC3173]">International transfers</a></li>
                <li><a href="#contact" className="hover:text-[#DC3173]">Contact</a></li>
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
                    <h3 className="text-lg font-semibold">What personal data we collect</h3>
                    <p className="mt-2 text-gray-700">
                      We collect information necessary to verify your identity, manage payouts, and operate the platform safely. Key categories:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                      <li><strong>Identity & verification:</strong> full name, national ID, passport, NIF (tax number), date of birth.</li>
                      <li><strong>Contact:</strong> email, phone number, postal address.</li>
                      <li><strong>Business & payout:</strong> company name, bank details for payouts, fiscal identifiers.</li>
                      <li><strong>Operational:</strong> driver lists, delivery logs, performance metrics.</li>
                      <li><strong>Technical:</strong> IP address, device identifiers, browser logs (for security & analytics).</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="why">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Why we process personal data</h3>
                <p className="mt-2 text-gray-700">
                  We process personal data only for lawful purposes, including:
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Contractual necessity:</strong> to provide the services you request as a Fleet Manager/Agent.</li>
                  <li><strong>Legal compliance:</strong> to meet tax, employment and regulatory obligations in Portugal.</li>
                  <li><strong>Legitimate interests:</strong> to prevent fraud, secure the platform and improve operations.</li>
                  <li><strong>Consent:</strong> for optional marketing communications and non-essential cookies.</li>
                </ul>
              </motion.div>
            </section>

            <section id="how">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">How we use personal data</h3>
                <ol className="mt-3 list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Verify your identity and eligibility to operate as an Agent.</li>
                  <li>Provide and maintain your Agent dashboard (driver management, reporting, payouts).</li>
                  <li>Process payments and tax-related documentation.</li>
                  <li>Detect and prevent fraud, and investigate policy violations.</li>
                  <li>Communicate important updates and regulatory notices.</li>
                </ol>
              </motion.div>
            </section>

            <section id="sharing">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Sharing &amp; Processors</h3>
                <p className="mt-2 text-gray-700">
                  We share data only with trusted service providers who help us operate the platform (e.g. payments, identity verification, cloud hosting, analytics). Processors act under contract and are required to protect data in accordance with GDPR.
                </p>
                <p className="mt-2 text-gray-700">
                  We may disclose personal data when required by law, to respond to legal requests, or to protect the rights and safety of our users and the Company.
                </p>
              </motion.div>
            </section>

            <section id="rights">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Your rights under GDPR</h3>
                <p className="mt-2 text-gray-700">
                  You have the following rights in relation to your personal data. To exercise any right, contact <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a>. We may need to verify your identity before responding.
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Access</strong> — request a copy of the data we hold about you.</li>
                  <li><strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
                  <li><strong>Erasure</strong> — request deletion where lawful (subject to retention requirements).</li>
                  <li><strong>Restriction</strong> — limit processing in certain situations.</li>
                  <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
                  <li><strong>Object</strong> — object to processing based on legitimate interests.</li>
                  <li><strong>Lodge a complaint</strong> — with your supervisory authority (in Portugal: CNPD).</li>
                </ul>
              </motion.div>
            </section>

            <section id="retention">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Retention &amp; deletion</h3>
                <p className="mt-2 text-gray-700">
                  We retain personal data no longer than necessary for the purposes outlined. Typical retention periods:
                </p>
                <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
                  <li>Account & verification records — account lifetime + 5 years for compliance.</li>
                  <li>Financial records — retained for at least 7 years to meet tax obligations.</li>
                  <li>Logs & analytics — retained in anonymized form where possible.</li>
                </ul>
              </motion.div>
            </section>

            <section id="security">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Security measures</h3>
                <p className="mt-2 text-gray-700">
                  We implement appropriate technical and organizational measures to protect personal data, including encryption in transit (TLS), access controls, monitoring, and regular security assessments. However, no system is entirely risk-free and we encourage strong passwords and safe practices.
                </p>
              </motion.div>
            </section>

            <section id="transfers">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.32 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">International transfers</h3>
                <p className="mt-2 text-gray-700">
                  When data is transferred outside the EEA we use appropriate safeguards such as the EU Standard Contractual Clauses (SCCs), transfers to countries with an adequacy decision, or other legal mechanisms to ensure protection consistent with EU standards.
                </p>
              </motion.div>
            </section>

            <section id="cookies">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.36 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Cookies & tracking</h3>
                <p className="mt-2 text-gray-700">
                  We use essential cookies required for the platform and optional cookies for analytics and marketing. You may manage optional cookies via our consent tool or your browser settings.
                </p>
              </motion.div>
            </section>

            <section id="children">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Children</h3>
                <p className="mt-2 text-gray-700">Our Service is not directed at children under 16. We do not knowingly collect personal data from children. If you believe we hold such data, contact us and we will take appropriate steps including deletion where required by law.</p>
              </motion.div>
            </section>

            <section id="changes">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.44 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Changes to this policy</h3>
                <p className="mt-2 text-gray-700">We may update this Privacy Policy from time to time. When we make material changes we will notify users via email or prominent notice. The revised policy will have an updated effective date.</p>
              </motion.div>
            </section>

            <section id="contact">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.48 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold">Contact & Data Requests</h3>
                <p className="mt-2 text-gray-700">To exercise your rights or for privacy questions contact our Data Protection team:</p>
                <p className="mt-3 text-sm text-gray-700">
                  {COMPANY_NAME} — {COMPANY_ADDRESS}<br />
                  Email: <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#DC3173]">{COMPANY_EMAIL}</a><br />
                  Phone: <a href={`tel:${COMPANY_PHONE}`} className="text-[#DC3173]">{COMPANY_PHONE}</a>
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} className="h-4 w-4 text-[#DC3173] rounded" />
                    <span className="text-sm text-gray-700">I have read and understand this Privacy Policy</span>
                  </label>
                  <button onClick={() => window.print()} className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#DC3173] text-white text-sm font-semibold shadow">
                    <Download className="w-4 h-4" />
                    Save / Print
                  </button>
                </div>
              </motion.div>
            </section>

            <div className="text-sm text-gray-600">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</div>
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
