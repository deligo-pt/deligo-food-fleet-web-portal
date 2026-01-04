"use client"
import React, { useState, useMemo, JSX } from "react";
import { Search, Clock, MapPin, Bike, Eye, Package as PackageIcon, User } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";



type PendingPickup = {
  id: string;
  partnerName: string;
  avatarColor: string;
  merchant: string;
  customer: string;
  pickup: string;
  drop: string;
  eta: string;
  distance: string;
  items: number;
  date: string;
};

const DELIGO = "#DC3173";

const sample: PendingPickup[] = [
  {
    id: "PP-9001",
    partnerName: "João Silva",
    avatarColor: "bg-pink-400",
    merchant: "McDonald's Lisboa",
    customer: "Daniel Sousa",
    pickup: "Rua da Paz 14",
    drop: "Av. Liberdade 90",
    eta: "5 min",
    distance: "2.1 km",
    items: 3,
    date: "2025-11-23 14:50",
  },
  {
    id: "PP-9002",
    partnerName: "Maria Fernandes",
    avatarColor: "bg-rose-300",
    merchant: "Burger King Porto",
    customer: "Sofia Mendes",
    pickup: "Rua Central 41",
    drop: "Rua Rosa 18",
    eta: "3 min",
    distance: "1.2 km",
    items: 1,
    date: "2025-11-23 12:33",
  },
  {
    id: "PP-9003",
    partnerName: "Rui Costa",
    avatarColor: "bg-amber-300",
    merchant: "KFC Coimbra",
    customer: "Miguel Rocha",
    pickup: "Av. Norte 10",
    drop: "Praça Sul 22",
    eta: "7 min",
    distance: "3.8 km",
    items: 2,
    date: "2025-11-23 09:15",
  },
];

export default function PendingPickupPage(): JSX.Element {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<PendingPickup | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sample;
    return sample.filter(
      (d) =>
        d.partnerName.toLowerCase().includes(q) ||
        d.customer.toLowerCase().includes(q) ||
        d.pickup.toLowerCase().includes(q) ||
        d.merchant.toLowerCase().includes(q) ||
        d.drop.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <PackageIcon size={20} /> {t("pending_pickup_orders")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("orders_accepted_by_delivery")}
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-80">
          <span className="p-2 text-gray-500">
            <Search size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partner, merchant, customer, ID…"
            className="px-3 py-2 outline-none text-sm w-full"
            aria-label="Search pending pickups"
          />
        </div>
      </div>

      {/* Grid of pickup cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <article
            key={d.id}
            onClick={() => setActive(d)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
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
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                  <span className="ml-auto text-xs text-gray-400">{d.date}</span>
                </div>
                <div className="text-xs text-gray-500 truncate">#{d.id} • {d.merchant}</div>
              </div>

              <span className="px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs flex items-center gap-1">
                <Clock size={12} /> {t("eta")} {d.eta}
              </span>
            </div>

            {/* Timeline */}
            <div className="mt-4 ml-1 border-l-2 border-gray-200 pl-4 space-y-3">
              <div className="flex items-start gap-3">
                <User size={16} className="text-blue-600 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">{t("customer")}</div>
                  <div className="text-sm font-medium text-gray-800 truncate">{d.customer}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-green-600 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">{t("pickup_address")}</div>
                  <div className="text-sm font-medium text-gray-800 truncate">{d.pickup}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-red-600 mt-1" />
                <div>
                  <div className="text-xs text-gray-500">{t("drop_off_address")}</div>
                  <div className="text-sm font-medium text-gray-800 truncate">{d.drop}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Bike size={16} /> <span>{d.distance}</span>
              </div>
              <div className="text-xs text-gray-500">{t("items")}: {d.items}</div>
            </div>
          </article>
        ))}
      </div>

      {/* Drawer Preview */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="button"
            aria-label="Close preview"
          />

          <aside className="ml-auto w-full sm:w-[460px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{active.partnerName}</h3>
                <p className="text-xs text-gray-500">{active.id} • {active.date}</p>
              </div>

              <div className="text-xs text-gray-400">{t("preview_only")}</div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white ${active.avatarColor}`}>
                  {active.partnerName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>
                  <div className="text-sm font-medium">{active.partnerName}</div>
                  <div className="text-xs text-gray-500">{t("eta")}: {active.eta}</div>
                  <div className="text-xs text-gray-500 mt-1">{active.merchant}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">{t("customer")}</div>
                <div className="text-sm font-medium">{active.customer}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">{t("pickup_address")}</div>
                <div className="text-sm font-medium">{active.pickup}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">{t("drop_off_address")}</div>
                <div className="text-sm font-medium">{active.drop}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">{t("distance")}</div>
                  <div className="text-sm font-semibold">{active.distance}</div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">{t("items")}</div>
                  <div className="text-sm font-semibold">{active.items}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: DELIGO }}
              >
                {t("close")}
              </button>
              <button
                onClick={() => {
                  // optional: open partner profile / details page
                  setActive(null);
                }}
                className="px-4 py-2 rounded-md border bg-white flex items-center gap-2"
              >
                <Eye size={14} /> {t("view_partner")}
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
          animation: slide-in 180ms cubic-bezier(.2, .9, .2, 1) both;
        }
      `}</style>
    </div>
  );
}
