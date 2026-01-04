"use client"

import { useState, useMemo } from "react";
import { Search, Bike, MapPin, Clock, Package, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const DELIGO = "#DC3173";

type Delivery = {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  customer: string;
  pickup: string;
  drop: string;
  status: "completed" | "ongoing" | "cancelled";
  distance: string;
  time: string;
  fee: number;
  date: string;
};

const sample: Delivery[] = [
  {
    id: "DL-3101",
    partnerName: "João Silva",
    partnerAvatar: "bg-pink-400",
    customer: "Daniel Sousa",
    pickup: "Rua da Liberdade 21",
    drop: "Av. Republica 88",
    status: "completed",
    distance: "3.2 km",
    time: "18 min",
    fee: 4.5,
    date: "2025-11-21 13:14",
  },
  {
    id: "DL-3102",
    partnerName: "Maria Fernandes",
    partnerAvatar: "bg-rose-300",
    customer: "Bruno Vieira",
    pickup: "Av. Porto 12",
    drop: "Rua Central 55",
    status: "ongoing",
    distance: "1.8 km",
    time: "9 min",
    fee: 3.2,
    date: "2025-11-22 16:40",
  },
  {
    id: "DL-3103",
    partnerName: "Rui Costa",
    partnerAvatar: "bg-amber-300",
    customer: "Ana Moreira",
    pickup: "Rua Nova 31",
    drop: "Praça Norte 77",
    status: "cancelled",
    distance: "—",
    time: "—",
    fee: 0,
    date: "2025-11-20 10:22",
  },
];

export default function AllDeliveriesPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Delivery | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sample.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.partnerName.toLowerCase().includes(q) ||
        d.customer.toLowerCase().includes(q) ||
        d.pickup.toLowerCase().includes(q) ||
        d.drop.toLowerCase().includes(q)
    );
  }, [query]);

  function StatusPill({ s }: { s: Delivery["status"] }) {
    if (s === "completed") return <span className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700 flex items-center gap-1"><CheckCircle size={12} /> {t("completed")}</span>;
    if (s === "cancelled") return <span className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600 flex items-center gap-1"><XCircle size={12} /> {t("cancelled")}</span>;
    return <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700 flex items-center gap-1"><Clock size={12} /> {t("ongoing")}</span>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3"><Package size={20} /> {t("all_deliveries")}</h1>
          <p className="text-sm text-gray-600">{t("track_every_delivery")}</p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-80">
          <span className="p-2 text-gray-500"><Search size={16} /></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, partner, customer…"
            className="px-3 py-2 outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => setActive(d)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${d.partnerAvatar}`}>
                {d.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                  <StatusPill s={d.status} />
                </div>
                <div className="text-xs text-gray-500">#{d.id} • {d.date}</div>
              </div>
            </div>

            {/* Timeline route */}
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

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2"><Bike size={16} /> {d.distance}</div>
              <div className="flex items-center gap-2"><Clock size={16} /> {d.time}</div>
              <div className="text-sm font-semibold text-gray-900">€{d.fee.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Preview */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActive(null)} />

          <aside className="ml-auto w-full sm:w-[420px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <h3 className="text-lg font-semibold">{t("delivery")} #{active.id}</h3>
            <p className="text-xs text-gray-500 mb-4">{active.date}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${active.partnerAvatar}`}>
                {active.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div>
                <div className="text-sm font-medium">{active.partnerName}</div>
                <div className="text-xs text-gray-500">{t("customer")}: {active.customer}</div>
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
                  <div className="text-xs text-gray-500">{t("time")}</div>
                  <div className="text-sm font-semibold">{active.time}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("delivery_fee")}</div>
                <div className="text-lg font-semibold">€{active.fee.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md text-white text-sm hover:opacity-90"
                style={{ backgroundColor: DELIGO }}
              >{t("close")}</button>
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