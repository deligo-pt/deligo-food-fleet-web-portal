"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("faq_question1"),
      answer: t("faq_answer1"),
    },
    {
      question: t("faq_question2"),
      answer: t("faq_answer2")
    },
    {
      question: t("faq_question3"),
      answer: t("faq_answer3"),
    },
    {
      question: t("faq_question4"),
      answer: t("faq_answer4"),
    },
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
          {t("faq_header")}
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {t("faq_desc")}
        </p>

        <div className="mt-12 grid gap-6 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#FFEAF0] rounded-2xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-black font-semibold focus:outline-none hover:bg-[#FFD1E0]/20 transition-colors"
                onClick={() => toggleIndex(idx)}
              >
                {faq.question}
                <span className="ml-4">
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#DC3173]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#DC3173]" />
                  )}
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden text-gray-700 transition-all duration-300 ${openIndex === idx ? "max-h-40 py-4" : "max-h-0"
                  }`}
              >
                <p className="text-sm sm:text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
