/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useMemo } from "react";
import { XCircle, MapPin, Bike, AlertTriangle, Eye } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";



type Cancelled = {
    id: string;
    partnerName: string;
    avatarColor: string;
    customer: string;
    reason: string;
    pickup: string;
    drop: string;
    time: string;
    refund: number;
    date: string;
};

const DELIGO = "#DC3173";

const sample: Cancelled[] = [
    {
        id: "CNL-6001",
        partnerName: "João Silva",
        avatarColor: "bg-pink-400",
        customer: "Daniel Sousa",
        reason: "Partner cancelled mid-route",
        pickup: "Rua da Paz 14",
        drop: "Av. Liberdade 90",
        time: "6 min active",
        refund: 4.5,
        date: "2025-11-21 16:22",
    },
    {
        id: "CNL-6002",
        partnerName: "Maria Fernandes",
        avatarColor: "bg-rose-300",
        customer: "Ana Mendes",
        reason: "Restaurant unavailable",
        pickup: "Rua Central 8",
        drop: "Rua Rosa 18",
        time: "—",
        refund: 3.2,
        date: "2025-11-21 13:40",
    },
    {
        id: "CNL-6003",
        partnerName: "Rui Costa",
        avatarColor: "bg-amber-300",
        customer: "Miguel Rocha",
        reason: "Customer cancelled before pickup",
        pickup: "Av. Norte 10",
        drop: "Praça Sul 22",
        time: "—",
        refund: 0,
        date: "2025-11-20 18:10",
    },
];

const CancelledDeliveries = ({ deliveries }: { deliveries: any }) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState<Cancelled | null>(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sample;
        return sample.filter(
            (d) =>
                d.partnerName.toLowerCase().includes(q) ||
                d.customer.toLowerCase().includes(q) ||
                d.reason.toLowerCase().includes(q) ||
                d.pickup.toLowerCase().includes(q) ||
                d.drop.toLowerCase().includes(q) ||
                d.id.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <div>

            <DashboardPageHeader
                title={t("cancelled_deliveries")}
                desc={t("view_failed_cancelled")}
            />

            <AllFilters sortOptions={sortOptions} />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((d) => (
                    <article
                        key={d.id}
                        onClick={() => setActive(d)}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-red-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === "Enter" ? setActive(d) : null)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${d.avatarColor}`}>
                                {d.partnerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                                <div className="text-xs text-gray-500 truncate">#{d.id} • {d.date}</div>
                            </div>

                            <XCircle size={20} color={DELIGO} />
                        </div>

                        <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                            <AlertTriangle size={14} /> <span>{d.reason}</span>
                        </p>

                        {/* Timeline */}
                        <div className="mt-4 ml-1 border-l-2 border-red-200 pl-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-green-600 mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("pickup")}</div>
                                    <div className="text-sm font-medium text-gray-800 truncate">{d.pickup}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-red-600 mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("drop_off")}</div>
                                    <div className="text-sm font-medium text-gray-800 truncate">{d.drop}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Bike size={16} color={DELIGO} /> <span>{d.time}</span>
                            </div>
                            <div className="text-sm font-semibold text-red-500">{t("refund")} €{d.refund.toFixed(2)}</div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Drawer */}
            {active && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActive(null)} aria-hidden />

                    <aside className="ml-auto w-full sm:w-[460px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <XCircle size={20} color={DELIGO} /> {t("cancelled")} #{active.id}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">{active.date}</p>

                        <p className="text-sm text-red-600 flex items-center gap-2 mb-4">
                            <AlertTriangle size={16} /> {active.reason}
                        </p>

                        <div className="flex items-center gap-4 mb-6">
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
                                    <div className="text-xs text-gray-500">{t("time_before_cancel")}</div>
                                    <div className="text-sm font-semibold">{active.time}</div>
                                </div>

                                <div className="p-3 rounded-lg bg-gray-50 border">
                                    <div className="text-xs text-gray-500">{t("refund")}</div>
                                    <div className="text-sm font-semibold text-red-600">€{active.refund.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button onClick={() => setActive(null)} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: DELIGO }}>
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
            transform: translateX(10px);
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
};


export default CancelledDeliveries;
