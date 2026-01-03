/* eslint-disable react-hooks/static-components */
"use client"
import { useState, useMemo } from "react";
import { Search, Star, MessageSquare } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";


const DELIGO = "#DC3173";

type Review = {
  id: string;
  partnerId: string;
  partnerName: string;
  avatarColor: string;
  rating: number;
  comment: string;
  orderId: string;
  customer: string;
  city: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
};

const sampleReviews: Review[] = [
  {
    id: "R-2001",
    partnerId: "DP-1001",
    partnerName: "João Silva",
    avatarColor: "bg-pink-400",
    rating: 5,
    comment: "Excellent delivery! Very polite and super fast.",
    orderId: "ORD-9811",
    customer: "Daniel Sousa",
    city: "Lisbon",
    date: "2025-11-17 14:23",
    sentiment: "positive",
  },
  {
    id: "R-2002",
    partnerId: "DP-1003",
    partnerName: "Rui Costa",
    avatarColor: "bg-amber-300",
    rating: 3,
    comment: "Delivery was okay, a bit slow but acceptable.",
    orderId: "ORD-9774",
    customer: "Maria Lopes",
    city: "Coimbra",
    date: "2025-11-15 19:42",
    sentiment: "neutral",
  },
  {
    id: "R-2003",
    partnerId: "DP-1002",
    partnerName: "Maria Fernandes",
    avatarColor: "bg-rose-300",
    rating: 2,
    comment: "Food arrived cold and packaging damaged.",
    orderId: "ORD-9732",
    customer: "Bruno Vieira",
    city: "Porto",
    date: "2025-11-12 12:11",
    sentiment: "negative",
  },
];

export default function DeliveryPartnerReviews() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Review | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleReviews.filter(
      (r) =>
        r.partnerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q)
    );
  }, [query]);

  function SentimentTag({ type }: { type: Review["sentiment"] }) {
    if (type === "positive")
      return <span className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700">{t("positive")}</span>;
    if (type === "neutral")
      return <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">{t("neutral")}</span>;
    return <span className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600">{t("negative")}</span>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <MessageSquare size={20} /> {t("delivery_partner_reviews")}
          </h1>
          <p className="text-sm text-gray-600">{t("analyze_customer_feedback")}</p>
        </div>

        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-80">
          <span className="p-2 text-gray-500"><Search size={16} /></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partner, comment, city, customer"
            className="px-3 py-2 outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((r) => (
          <div
            key={r.id}
            onClick={() => setActive(r)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold ${r.avatarColor}`}>
                {r.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{r.partnerName}</div>
                <div className="text-xs text-gray-500">{r.city}</div>
              </div>

              <div className="ml-auto flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-medium text-gray-800">{r.rating}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 line-clamp-3 mb-3">{r.comment}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
              <span>#{r.orderId}</span>
              <SentimentTag type={r.sentiment} />
            </div>
          </div>
        ))}
      </div>

      {/* DRAWER — REVIEW PREVIEW */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActive(null)} />

          <aside className="ml-auto w-full sm:w-[420px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{active.partnerName}</h3>
                <div className="text-xs text-gray-500">{active.partnerId} • {active.city}</div>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="text-sm font-medium text-gray-800">{active.rating}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("order")}</div>
                <div className="text-sm font-medium">{active.orderId}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("customer")}</div>
                <div className="text-sm font-medium">{active.customer}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("date")}</div>
                <div className="text-sm font-medium">{active.date}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("sentiment")}</div>
                <SentimentTag type={active.sentiment} />
              </div>

              <div className="p-3 rounded-lg bg-white border shadow-sm">
                <div className="text-xs text-gray-500 mb-1">{t("comment")}</div>
                <p className="text-sm text-gray-800 whitespace-pre-line">{active.comment}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md text-white text-sm hover:opacity-90"
                style={{ backgroundColor: DELIGO }}
              >
                {t("close")}
              </button>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(8px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        .animate-slide-in { animation: slide-in 180ms cubic-bezier(.2,.9,.2,1) both }
      `}</style>
    </div>
  );
}
