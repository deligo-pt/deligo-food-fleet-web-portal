/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useMemo, JSX } from "react";
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Bike,
  Eye,
  Package,
  AlertTriangle,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";



const DELIGO = "#DC3173";

type History = {
  id: string;
  partnerName: string;
  avatarColor: string;
  customer: string;
  pickup: string;
  drop: string;
  status: "completed" | "cancelled" | "failed";
  distance: string;
  duration: string;
  earning: number;
  date: string;
  reason?: string;
};

const sample: History[] = [
  {
    id: "HIS-8801",
    partnerName: "João Silva",
    avatarColor: "bg-pink-400",
    customer: "Daniel Sousa",
    pickup: "Rua da Paz 14",
    drop: "Av. Liberdade 90",
    status: "completed",
    distance: "3.2 km",
    duration: "18 min",
    earning: 4.8,
    date: "2025-11-20 14:12",
  },
  {
    id: "HIS-8802",
    partnerName: "Maria Fernandes",
    avatarColor: "bg-rose-300",
    customer: "Miguel Rocha",
    pickup: "Rua Norte 11",
    drop: "Rua Rosa 41",
    status: "cancelled",
    distance: "—",
    duration: "—",
    earning: 0,
    reason: "Customer cancelled",
    date: "2025-11-19 18:32",
  },
  {
    id: "HIS-8803",
    partnerName: "Rui Costa",
    avatarColor: "bg-amber-300",
    customer: "Ana Moreira",
    pickup: "Av. Central 19",
    drop: "Praça Nova 10",
    status: "failed",
    distance: "—",
    duration: "—",
    earning: 0,
    reason: "Partner could not reach pickup",
    date: "2025-11-18 15:20",
  },
  // add more sample rows as needed
];

export default function DeliveryHistoryPage(): JSX.Element {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<History | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled" | "failed">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sample
      .filter((d) => (filter === "all" ? true : d.status === filter))
      .filter(
        (d) =>
          !q ||
          d.partnerName.toLowerCase().includes(q) ||
          d.customer.toLowerCase().includes(q) ||
          d.pickup.toLowerCase().includes(q) ||
          d.drop.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          (d.reason || "").toLowerCase().includes(q)
      );
  }, [query, filter]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Package size={22} color={DELIGO} /> {t("delivery_history")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("complete_timeline")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-80">
            <span className="p-2 text-gray-500">
              <Search size={16} color={DELIGO} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deliveries, partners, status…"
              className="px-3 py-2 outline-none text-sm w-full"
              aria-label="Search delivery history"
            />
          </div>

          <div className="flex items-center gap-2 ml-0 sm:ml-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="text-sm rounded-md border px-3 py-2 bg-white"
            >
              <option value="all">{t("all")}</option>
              <option value="completed">{t("completed")}</option>
              <option value="cancelled">{t("cancelled")}</option>
              <option value="failed">{t("failed")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <article
            key={d.id}
            onClick={() => setActive(d)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? setActive(d) : null)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${d.avatarColor}`}
                aria-hidden
              >
                {d.partnerName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                <div className="text-xs text-gray-500 truncate">
                  #{d.id} • {d.date}
                </div>
              </div>

              <div>
                {d.status === "completed" && <CheckCircle size={20} color={DELIGO} />}
                {d.status === "cancelled" && <XCircle size={20} color={DELIGO} />}
                {d.status === "failed" && <AlertTriangle size={20} color="#FF6B6B" />}
              </div>
            </div>

            {/* Status text */}
            <p
              className={`mt-2 text-sm ${d.status === "completed"
                ? "text-green-600"
                : d.status === "cancelled"
                  ? "text-red-600"
                  : "text-orange-600"
                }`}
            >
              {d.status.toUpperCase()}
            </p>

            {/* Timeline */}
            <div className="mt-4 ml-1 border-l-2 border-gray-200 pl-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-green-600 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">{t("pickup")}</div>
                  <div className="text-sm font-medium text-gray-800">{d.pickup}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-red-600 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">{t("drop_off")}</div>
                  <div className="text-sm font-medium text-gray-800">{d.drop}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Bike size={16} color={DELIGO} /> <span>{d.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} color={DELIGO} /> <span>{d.duration}</span>
              </div>
            </div>

            <div className="mt-2 text-sm font-semibold text-(--deligo)">€{d.earning.toFixed(2)}</div>
          </article>
        ))}
      </div>

      {/* Drawer */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActive(null)}
            aria-hidden
          />

          <aside className="ml-auto w-full sm:w-[540px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package size={20} color={DELIGO} /> {t("delivery")} #{active.id}
                </h3>
                <p className="text-xs text-gray-500">{active.date}</p>
              </div>

              <div className="text-sm text-gray-500">{active.status.toUpperCase()}</div>
            </div>

            <div className="mt-6 flex items-center gap-4 mb-4">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-lg ${active.avatarColor}`}>
                {active.partnerName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{active.partnerName}</div>
                <div className="text-xs text-gray-500">{t("customer")}: {active.customer}</div>
                {active.reason && <div className="text-xs text-red-600 mt-1">{t("reason")}: {active.reason}</div>}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">{t("pickup")}</div>
                <div className="text-sm font-medium">{active.pickup}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">{t("drop_off")}</div>
                <div className="text-sm font-medium">{active.drop}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">{t("distance")}</div>
                  <div className="text-sm font-semibold">{active.distance}</div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">{t("duration")}</div>
                  <div className="text-sm font-semibold">{active.duration}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("earning")}</div>
                <div className="text-lg font-semibold text-(--deligo)">€{active.earning.toFixed(2)}</div>
              </div>

              {active.reason && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="text-xs text-red-600">{t("cancellation_failure_reason")}</div>
                  <div className="text-sm text-red-700 font-medium mt-1">{active.reason}</div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: DELIGO }}
              >
                {t("close")}
              </button>
              <button className="px-4 py-2 rounded-md border bg-white flex items-center gap-2">
                <Eye size={14} color={DELIGO} /> {t("view_partner")}
              </button>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(8px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 200ms cubic-bezier(.2, .9, .2, 1) both;
        }
      `}</style>
    </div>
  );
}
