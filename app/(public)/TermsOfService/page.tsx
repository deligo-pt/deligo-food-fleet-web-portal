"use client";

import Link from "next/link";
import { FileText, BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function TermsOfService() {
  const { t } = useTranslation();

  const steps = [
    t("introduction"),
    t("eligibility"),
    t("registration"),
    t("responsibilities"),
    t("payments"),
    t("terminations"),
    t("data_privacy"),
    t("liability"),
    t("changes"),
    t("governing_law"),
  ];

  const articles = [
    {
      id: "introduction",
      title: t("terms_article_title1"),
      text:  t("terms_article_text1"),
    },
    {
      id: "eligibility",
      title: t("terms_article_title2"),
      text:  t("terms_article_text2"),
    },
    {
      id: "registration-&-verification",
      title: t("terms_article_title3"),
      text:  t("terms_article_text3"),
    },
    {
      id: "agent-responsibilities",
      title: t("terms_article_title4"),
      text: t("terms_article_text4")
    },
    {
      id: "payments-&-commissions",
      title: t("terms_article_title5"),
      text:  t("terms_article_text5"),
    },
    {
      id: "termination",
      title: t("terms_article_title6"),
      text:  t("terms_article_text6"),
    },
    {
      id: "data-&-privacy",
      title: t("terms_article_title7"),
      text:  t("terms_article_text7"),
    },
    {
      id: "liability",
      title: t("terms_article_title8"),
      text:  t("terms_article_text8"),
    },
    {
      id: "changes",
      title: t("terms_article_title9"),
      text:  t("terms_article_text9"),
    },
    {
      id: "governing-law",
      title: t("terms_article_title10"),
      text:  t("terms_article_text10"),
    },
  ]

  return (
    <main className="min-h-screen bg-linear-to-b from-[#fff6fa] via-white to-white text-gray-800 overflow-x-hidden">
      {/* Hero */}
      <header className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-tr from-[#DC3173]/10 to-transparent rounded-b-[3rem]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#DC3173] text-white flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold tracking-widest uppercase text-[#DC3173]">
                {t("term_legal")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              {t("term_of_service")}
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
              {t("term_of_s_desc1")}{" "}
              <strong>{t("term_of_s_desc_strong")}</strong>{t("term_of_s_desc2")}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#toc"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#DC3173]" />
                {t("jump_to_sections")}
              </a>

              <Link
                href="/become-agent"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {t("become_an_agent")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Info Card */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="bg-white/70 backdrop-blur-md border border-[#DC3173]/20 p-6 rounded-3xl shadow-xl animate-slide-up w-full max-w-xs sm:max-w-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("effective_date")}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{t("october25_2025")}</p>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700">
                  {t("need_help")} <br />
                  <a
                    href="mailto:contact@deligo.pt"
                    className="text-[#DC3173] font-medium hover:underline wrap-break-word"
                  >
                    contact@deligo.pt
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
            {t("on_this_page")}
          </h4>
          <ul className="space-y-2 text-sm">
            {steps.map((item, i) => (
              <li key={i}>
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block hover:text-[#DC3173] text-gray-700 transition-colors wrap-break-word"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Articles */}
        <article className="lg:col-span-3 space-y-12">
          {articles.map((item, i) => (
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
              © {new Date().getFullYear()} {t("deligo_pixelmiracle")}
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
