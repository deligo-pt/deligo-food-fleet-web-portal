"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What documents are required?",
    answer:
      "To register as an agent, you need to submit a valid ID, proof of address, and a bank account for payouts. Additional documents may be required based on local regulations.",
  },
  {
    question: "How long is verification?",
    answer:
      "Verification typically takes 24-48 hours. You will be notified via email once your account is approved and ready to start managing delivery boys.",
  },
  {
    question: "Can I manage multiple delivery boys?",
    answer:
      "Yes! Once verified, you can add and monitor multiple delivery boys in your network through the dashboard, track their performance, and manage assignments efficiently.",
  },
  {
    question: "Is there any cost to register?",
    answer:
      "Registration is completely free. You can start managing your delivery network without any upfront costs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Answers to common questions before you become a verified delivery agent.
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
                className={`px-6 overflow-hidden text-gray-700 transition-all duration-300 ${
                  openIndex === idx ? "max-h-40 py-4" : "max-h-0"
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
