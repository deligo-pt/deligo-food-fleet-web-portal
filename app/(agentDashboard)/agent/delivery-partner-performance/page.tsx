/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useMemo, useState } from "react";
import { Search, BarChart2, Download, Eye, ArrowUpRight, RefreshCcw } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";



const DELIGO = "#DC3173";

type DailyPoint = { date: string; value: number };

type PartnerPerf = {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  rating: number;
  deliveries: number;
  avgDeliveryMins: number;
  acceptanceRate: number;
  cancellations: number;
  earnings: number;
  lastActive: string;
  spark: DailyPoint[];
  avatarColor?: string;
};

const sample: PartnerPerf[] = [
  {
    id: "DP-1001",
    name: "João Silva",
    city: "Lisbon",
    vehicle: "Bicycle",
    rating: 4.6,
    deliveries: 78,
    avgDeliveryMins: 22,
    acceptanceRate: 92,
    cancellations: 2,
    earnings: 1425.5,
    lastActive: "Online",
    spark: [
      { date: "2025-11-10", value: 5 },
      { date: "2025-11-11", value: 4 },
      { date: "2025-11-12", value: 6 },
      { date: "2025-11-13", value: 3 },
      { date: "2025-11-14", value: 7 },
      { date: "2025-11-15", value: 8 },
      { date: "2025-11-16", value: 10 },
      { date: "2025-11-17", value: 9 },
      { date: "2025-11-18", value: 6 },
      { date: "2025-11-19", value: 5 },
      { date: "2025-11-20", value: 6 },
      { date: "2025-11-21", value: 7 },
      { date: "2025-11-22", value: 8 },
      { date: "2025-11-23", value: 9 },
    ],
    avatarColor: "bg-pink-400",
  },
  {
    id: "DP-1002",
    name: "Maria Fernandes",
    city: "Porto",
    vehicle: "Motorbike",
    rating: 4.8,
    deliveries: 102,
    avgDeliveryMins: 18,
    acceptanceRate: 96,
    cancellations: 1,
    earnings: 1920.0,
    lastActive: "10 min ago",
    spark: [
      { date: "2025-11-10", value: 6 },
      { date: "2025-11-11", value: 5 },
      { date: "2025-11-12", value: 7 },
      { date: "2025-11-13", value: 10 },
      { date: "2025-11-14", value: 8 },
      { date: "2025-11-15", value: 9 },
      { date: "2025-11-16", value: 11 },
      { date: "2025-11-17", value: 12 },
      { date: "2025-11-18", value: 9 },
      { date: "2025-11-19", value: 8 },
      { date: "2025-11-20", value: 10 },
      { date: "2025-11-21", value: 11 },
      { date: "2025-11-22", value: 12 },
      { date: "2025-11-23", value: 13 },
    ],
    avatarColor: "bg-rose-300",
  },
  {
    id: "DP-1003",
    name: "Rui Costa",
    city: "Coimbra",
    vehicle: "Scooter",
    rating: 4.1,
    deliveries: 48,
    avgDeliveryMins: 27,
    acceptanceRate: 85,
    cancellations: 5,
    earnings: 800.25,
    lastActive: "Offline",
    spark: [
      { date: "2025-11-10", value: 3 },
      { date: "2025-11-11", value: 4 },
      { date: "2025-11-12", value: 2 },
      { date: "2025-11-13", value: 4 },
      { date: "2025-11-14", value: 3 },
      { date: "2025-11-15", value: 5 },
      { date: "2025-11-16", value: 6 },
      { date: "2025-11-17", value: 4 },
      { date: "2025-11-18", value: 3 },
      { date: "2025-11-19", value: 2 },
      { date: "2025-11-20", value: 3 },
      { date: "2025-11-21", value: 5 },
      { date: "2025-11-22", value: 4 },
      { date: "2025-11-23", value: 4 },
    ],
    avatarColor: "bg-amber-300",
  },
];

function Sparkline({ data, color = DELIGO }: { data: DailyPoint[]; color?: string }) {
  // responsive-ish sparkline SVG; width controlled by parent
  const vals = data.map((d) => d.value);
  const max = Math.max(...vals, 1);
  const min = Math.min(...vals, 0);
  const w = 120;
  const h = 36;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d.value - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const last = data[data.length - 1]?.value ?? 0;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle">
      <polyline fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" points={points} />
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((last - min) / (max - min || 1)) * h}
        r={2.5}
        fill={color}
      />
    </svg>
  );
}

export default function DeliveryPartnerPerformance() {
  const { t } = useTranslation();
  const [data, setData] = useState<PartnerPerf[]>(sample);
  const [query, setQuery] = useState("");
  const [timeframe, setTimeframe] = useState<"7d" | "14d" | "30d">("14d");
  const [sortBy, setSortBy] = useState<"deliveries" | "rating" | "earnings">("deliveries");
  const [active, setActive] = useState<PartnerPerf | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.vehicle.toLowerCase().includes(q)
    );
    arr = arr.slice().sort((a, b) => {
      if (sortBy === "deliveries") return b.deliveries - a.deliveries;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.earnings - a.earnings;
    });
    return arr;
  }, [data, query, sortBy]);

  function exportCSV() {
    const headers = ["id", "name", "city", "vehicle", "deliveries", "avgDeliveryMins", "acceptanceRate", "cancellations", "earnings"];
    const rows = data.map((d) => [d.id, d.name, d.city, d.vehicle, d.deliveries, d.avgDeliveryMins, d.acceptanceRate, d.cancellations, d.earnings]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `partner-performance-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function refresh() {
    // simulate refresh: small random change (visual)
    setData((d) => d.map((p) => ({ ...p, deliveries: Math.max(0, p.deliveries + (Math.round(Math.random() * 5) - 2)) })));
  }

  return (
    <div className="min-h-screen p-6 bg-linear-to-b from-gray-50 to-gray-100">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <BarChart2 size={20} /> {t("delivery_partner_performance")}
          </h1>
          <p className="text-sm text-gray-600">{t("sortable_filterable_exportable")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
            <span className="p-2 text-gray-500">
              <Search size={16} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, city or vehicle"
              className="px-3 py-2 outline-none text-sm w-56"
            />
          </div>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="text-sm rounded-md border px-3 py-2 bg-white"
          >
            <option value="7d">{t("last_7_days")}</option>
            <option value="14d">{t("last_14_days")}</option>
            <option value="30d">{t("last_30_days")}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm rounded-md border px-3 py-2 bg-white"
          >
            <option value="deliveries">{t("top_deliveries")}</option>
            <option value="rating">{t("top_rating")}</option>
            <option value="earnings">{t("top_earnings")}</option>
          </select>

          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border shadow-sm text-sm hover:scale-105 transition">
            <Download size={14} /> {t("export")}
          </button>

          <button onClick={refresh} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white" style={{ backgroundColor: DELIGO }}>
            <RefreshCcw size={14} /> {t("refresh")}
          </button>
        </div>
      </div>

      {/* KPI Cards — unique glassy style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-md border border-white/20 hover:shadow-xl transition">
          <div className="text-xs text-gray-500">{t("top_partner_deliveries")}</div>
          <div className="mt-2 text-xl font-semibold">{Math.max(...data.map((d) => d.deliveries))}</div>
          <div className="text-xs text-gray-400 mt-1">{t("in_the_selected_timeframe")}</div>
        </div>

        <div className="bg-linear-to-r from-white to-white/60 rounded-2xl p-4 shadow-md border border-white/20 hover:shadow-xl transition">
          <div className="text-xs text-gray-500">{t("avg_delivery_time")}</div>
          <div className="mt-2 text-xl font-semibold">{(data.reduce((s, d) => s + d.avgDeliveryMins, 0) / data.length).toFixed(0)} {t("min")}</div>
          <div className="text-xs text-gray-400 mt-1">{t("lower_is_better")}</div>
        </div>

        <div className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-md border border-white/20 hover:shadow-xl transition">
          <div className="text-xs text-gray-500">{t("avg_acceptance_rate")}</div>
          <div className="mt-2 text-xl font-semibold">{(data.reduce((s, d) => s + d.acceptanceRate, 0) / data.length).toFixed(0)}%</div>
          <div className="text-xs text-gray-400 mt-1">{t("higher_is_better")}</div>
        </div>

        <div className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-md border border-white/20 hover:shadow-xl transition">
          <div className="text-xs text-gray-500">{t("total_earnings")}</div>
          <div className="mt-2 text-xl font-semibold">€{data.reduce((s, d) => s + d.earnings, 0).toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-1">{t("aggregate")}</div>
        </div>
      </div>

      {/* Table — responsive columns to avoid horizontal scroll */}
      <div className="bg-white rounded-2xl shadow ring-1 ring-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          {/* We use table-fixed and column width hints to avoid unexpected expansion */}
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <colgroup>
              <col style={{ width: "36%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>

            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-500">{t("partner")}</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden md:table-cell">{t("city")}</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">{t("deliveries")}</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden lg:table-cell">{t("avg_mins")}</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">{t("acceptance")}</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">{t("earnings")}</th>
                <th className="px-4 py-3 text-right text-sm text-gray-500">{t("trend")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${p.avatarColor}`} aria-hidden>
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="truncate">
                        <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate">{p.id} • {p.vehicle}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 hidden md:table-cell text-sm">{p.city}</td>

                  <td className="px-4 py-4 text-sm font-medium">{p.deliveries}</td>

                  <td className="px-4 py-4 hidden lg:table-cell text-sm">{p.avgDeliveryMins} {t("min")}</td>

                  <td className="px-4 py-4 text-sm">
                    <div className="inline-flex items-center gap-2">
                      <div className="text-sm font-medium">{p.acceptanceRate}%</div>
                      <div className="text-xs text-gray-400">({p.cancellations} {t("canc")}.)</div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm">€{p.earnings.toFixed(2)}</td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="hidden sm:block">
                        <Sparkline data={p.spark} color={DELIGO} />
                      </div>
                      <button
                        onClick={() => setActive(p)}
                        className="px-2 py-1 rounded-md bg-white border shadow-sm text-sm flex items-center gap-2 hover:scale-105 transition"
                      >
                        <Eye size={14} /> {t("preview")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
          <div>{t("showing")} <strong>{filtered.length}</strong> {t("partners")}</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md border text-xs">{t("prev")}</button>
            <button className="px-3 py-1 rounded-md border text-xs">{t("next")}</button>
          </div>
        </div>
      </div>

      {/* Drawer detail (wider but responsive) */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActive(null)} />

          <aside className="ml-auto w-full sm:w-[560px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{active.name}</h3>
                <p className="text-xs text-gray-500">{active.id} • {active.city} • {active.vehicle}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-500">{t("rating")}</div>
                <div className="text-lg font-medium">{active.rating.toFixed(1)}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-linear-to-br from-white to-gray-50 border">
                <div className="text-xs text-gray-500">{t("deliveries")}</div>
                <div className="text-xl font-semibold">{active.deliveries}</div>
                <div className="text-xs text-gray-400">{t("in_timeframe")}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("avg_delivery_time")}</div>
                <div className="text-xl font-semibold">{active.avgDeliveryMins} {t("min")}</div>
                <div className="text-xs text-gray-400">{t("lower_is_better")}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t('acceptance')}</div>
                <div className="text-xl font-semibold">{active.acceptanceRate}%</div>
                <div className="text-xs text-gray-400">{active.cancellations} {t("cancellations")}</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">{t("deliveries_recent")}</h4>
              <div className="w-full overflow-hidden rounded-lg border p-3 bg-white">
                <Sparkline data={active.spark} color={DELIGO} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("earnings")}</div>
                <div className="text-lg font-semibold">€{active.earnings.toFixed(2)}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">{t("last_seen")}</div>
                <div className="text-lg font-semibold">{active.lastActive}</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button className="px-4 py-2 rounded-md border bg-white flex items-center gap-2 hover:scale-105 transition">
                <ArrowUpRight size={14} /> {t("go_to_profile")}
              </button>
              <button onClick={() => setActive(null)} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: DELIGO }}>
                {t("close")}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* small animation */}
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
