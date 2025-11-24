"use client"

import  { useState, useMemo } from "react";
import { Search, CheckCircle, MapPin, Bike,  Clock, Eye } from "lucide-react";

const DELIGO = "#DC3173";

type Delivered = {
  id: string;
  partnerName: string;
  avatarColor: string;
  customer: string;
  pickup: string;
  drop: string;
  distance: string;
  duration: string;
  earning: number;
  date: string;
};

const sample: Delivered[] = [
  {
    id: "DLV-7001",
    partnerName: "João Silva",
    avatarColor: "bg-pink-400",
    customer: "Daniel Sousa",
    pickup: "Rua da Paz 14",
    drop: "Av. Liberdade 90",
    distance: "3.2 km",
    duration: "18 min",
    earning: 4.5,
    date: "2025-11-22 14:22",
  },
  {
    id: "DLV-7002",
    partnerName: "Maria Fernandes",
    avatarColor: "bg-rose-300",
    customer: "Ana Mendes",
    pickup: "Rua Central 8",
    drop: "Rua Rosa 18",
    distance: "1.7 km",
    duration: "12 min",
    earning: 3.8,
    date: "2025-11-22 12:40",
  },
  {
    id: "DLV-7003",
    partnerName: "Rui Costa",
    avatarColor: "bg-amber-300",
    customer: "Miguel Rocha",
    pickup: "Av. Norte 10",
    drop: "Praça Sul 22",
    distance: "4.1 km",
    duration: "22 min",
    earning: 5.1,
    date: "2025-11-21 18:15",
  },
];

export default function DeliveredPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Delivered | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sample.filter(
      (d) =>
        d.partnerName.toLowerCase().includes(q) ||
        d.customer.toLowerCase().includes(q) ||
        d.pickup.toLowerCase().includes(q) ||
        d.drop.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* HEADER */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <CheckCircle size={22} color={DELIGO} /> Delivered Orders
          </h1>
          <p className="text-sm text-gray-600">Completed delivery history with earnings & route summary.</p>
        </div>

        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-80">
          <span className="p-2 text-gray-500"><Search size={16} color={DELIGO} /></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by partner, customer, ID…"
            className="px-3 py-2 outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => setActive(d)}
            className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${d.avatarColor}`}
              >
                {d.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                <div className="text-xs text-gray-500 truncate">#{d.id} • {d.date}</div>
              </div>

              {/* SUCCESS ICON */}
              <CheckCircle size={20} color={DELIGO} />
            </div>

            {/* TIMELINE */}
            <div className="mt-4 ml-1 border-l-2 border-[var(--deligo)]/30 pl-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} color={DELIGO} className="mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Pickup</div>
                  <div className="text-sm font-medium text-gray-800">{d.pickup}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} color={DELIGO} className="mt-1" />
                <div>
                  <div className="text-xs text-gray-500">Drop-off</div>
                  <div className="text-sm font-medium text-gray-800">{d.drop}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-2"><Bike size={16} color={DELIGO}/> {d.distance}</div>
              <div className="flex items-center gap-2"><Clock size={16} color={DELIGO}/> {d.duration}</div>
            </div>

            <div className="mt-2 text-sm font-semibold text-[var(--deligo)]">€{d.earning.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* DRAWER */}
      {active && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />

          <aside className="ml-auto w-full sm:w-[460px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle size={20} color={DELIGO} /> Delivery #{active.id}
            </h3>
            <p className="text-xs text-gray-500 mb-4">{active.date}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-lg ${active.avatarColor}`}>
                {active.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div>
                <div className="text-sm font-medium">{active.partnerName}</div>
                <div className="text-xs text-gray-500">Customer: {active.customer}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">Pickup</div>
                <div className="text-sm font-medium">{active.pickup}</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500 mb-1">Drop-off</div>
                <div className="text-sm font-medium">{active.drop}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">Distance</div>
                  <div className="text-sm font-semibold">{active.distance}</div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-semibold">{active.duration}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <div className="text-xs text-gray-500">Earning</div>
                <div className="text-lg font-semibold text-[var(--deligo)]">€{active.earning.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: DELIGO }}
              >Close</button>
              <button className="px-4 py-2 rounded-md border bg-white flex items-center gap-2">
                <Eye size={14} color={DELIGO} /> View Partner
              </button>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(10px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        .animate-slide-in { animation: slide-in .2s cubic-bezier(.2,.9,.2,1) both }
      `}</style>
    </div>
  );
}
