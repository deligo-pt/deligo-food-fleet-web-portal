"use client";

import Link from "next/link";
import { FileText, BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff6fa] via-white to-[#fff] text-gray-800 overflow-x-hidden">
      {/* Hero */}
      <header className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#DC3173]/10 to-transparent rounded-b-[3rem]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#DC3173] text-white flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase text-[#DC3173]">
                Terms & Legal
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Terms of Service — Fleet Managers / Agents 🇵🇹
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
              Please read carefully — by registering as an Agent with{" "}
              <strong>PIXELMIRACLE LDA / DeliGo</strong>, you agree to these
              terms and platform policies.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#toc"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#DC3173]" />
                Jump to Sections
              </a>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Become an Agent
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Info Card */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="bg-white/70 backdrop-blur-md border border-[#DC3173]/20 p-6 rounded-3xl shadow-xl animate-slide-up w-full max-w-xs sm:max-w-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Effective Date
              </h3>
              <p className="mt-1 text-sm text-gray-600">25 October 2025</p>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700">
                  Need Help? <br />
                  <a
                    href="mailto:support@deligo.pt"
                    className="text-[#DC3173] font-medium hover:underline break-words"
                  >
                    support@deligo.pt
                  </a>
                </p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 bg-[#DC3173]/10 rounded-full blur-2xl animate-pulse pointer-events-none" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-4 gap-10">
        {/* TOC */}
        <aside id="toc" className="hidden lg:block sticky top-24 self-start">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase">
            On This Page
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              "Introduction",
              "Eligibility",
              "Registration & Verification",
              "Agent Responsibilities",
              "Payments & Commissions",
              "Termination",
              "Data & Privacy",
              "Liability",
              "Changes",
              "Governing Law",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block hover:text-[#DC3173] text-gray-700 transition-colors break-words"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Articles */}
        <article className="lg:col-span-3 space-y-12">
          {[
            {
              id: "introduction",
              title: "1. Introduction",
              text: `Welcome to PIXELMIRACLE LDA / DeliGo. These Terms govern your registration and activity as a Fleet Manager/Agent in Portugal. By using our platform, you confirm that you have read and accepted all conditions.`,
            },
            {
              id: "eligibility",
              title: "2. Eligibility",
              text: `You must be 18 or older and legally authorized to work in Portugal. All information and documents provided must be accurate and up to date.`,
            },
            {
              id: "registration-&-verification",
              title: "3. Registration & Verification",
              text: `Submit required documents (ID, NIF, proof of address). Verification may take 3–5 business days. You will receive updates via email.`,
            },
            {
              id: "agent-responsibilities",
              title: "4. Agent Responsibilities",
              text: `Agents must manage drivers responsibly, ensure compliance with local transport laws, and maintain professional conduct at all times.`,
            },
            {
              id: "payments-&-commissions",
              title: "5. Payments & Commissions",
              text: `Commissions are credited weekly or monthly based on your plan. You are responsible for declaring income to Portuguese tax authorities.`,
            },
            {
              id: "termination",
              title: "6. Termination",
              text: `We reserve the right to suspend or terminate accounts violating our Terms. You may terminate your account anytime via Support.`,
            },
            {
              id: "data-&-privacy",
              title: "7. Data & Privacy",
              text: `We comply with GDPR. Personal data is processed for verification and payments. Learn more in our Privacy Policy.`,
            },
            {
              id: "liability",
              title: "8. Limitation of Liability",
              text: `The service is provided “as is.” The company’s liability is limited to commissions earned in the previous month.`,
            },
            {
              id: "changes",
              title: "9. Changes to Terms",
              text: `We may update these Terms occasionally. Continued use after updates implies acceptance.`,
            },
            {
              id: "governing-law",
              title: "10. Governing Law",
              text: `These Terms follow Portuguese law. Disputes will be resolved in Lisbon’s competent courts.`,
            },
          ].map((item, i) => (
          <div
  key={i}
  id={item.id}
  className="relative group animate-fade-up pl-6 sm:pl-0"
>
  {/* Icon */}
  <div className="absolute left-0 sm:-left-6 top-1 text-[#DC3173]/60 group-hover:text-[#DC3173] transition-all">
    <CheckCircle2 className="w-5 h-5" />
  </div>

  {/* Title */}
  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
    {item.title}
  </h2>

  {/* Paragraph */}
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
    {item.text}
  </p>
</div>
          ))}

          <div className="pt-10 border-t border-gray-200 text-sm text-gray-600 text-center">
            <p>
              © {new Date().getFullYear()} DeliGo — PIXELMIRACLE LDA. All rights
              reserved.
            </p>
          </div>
        </article>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease forwards;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 1.5s ease forwards;
        }
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 1s ease both;
        }
      `}</style>
    </main>
  );
}
