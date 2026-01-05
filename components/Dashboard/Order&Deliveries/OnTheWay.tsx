/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react";
import { Clock, MapPin, Navigation, Eye, SignalHigh } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { getSortOptions } from "@/utils/sortOptions";

const DELIGO = "#DC3173";

type OnTheWay = {
    id: string;
    partnerName: string;
    avatarColor: string;
    customer: string;
    pickup: string;
    drop: string;
    distance: string;
    timeElapsed: string;
    timeRemaining: string;
    speed: string;
    date: string;
};

const sample: OnTheWay[] = [
    {
        id: "OTW-2001",
        partnerName: "João Silva",
        avatarColor: "bg-pink-400",
        customer: "Daniel Sousa",
        pickup: "Rua da Paz 14",
        drop: "Av. Liberdade 90",
        distance: "2.4 km left",
        timeElapsed: "7 min",
        timeRemaining: "4 min",
        speed: "22 km/h",
        date: "2025-11-23 15:12",
    },
    {
        id: "OTW-2002",
        partnerName: "Maria Fernandes",
        avatarColor: "bg-rose-300",
        customer: "Bruno Vieira",
        pickup: "Rua Central 41",
        drop: "Rua Rosa 18",
        distance: "1.1 km left",
        timeElapsed: "5 min",
        timeRemaining: "2 min",
        speed: "19 km/h",
        date: "2025-11-23 14:20",
    },
    {
        id: "OTW-2003",
        partnerName: "Rui Costa",
        avatarColor: "bg-amber-300",
        customer: "Ana Moreira",
        pickup: "Av. Norte 10",
        drop: "Praça Sul 22",
        distance: "3.9 km left",
        timeElapsed: "10 min",
        timeRemaining: "8 min",
        speed: "25 km/h",
        date: "2025-11-23 13:05",
    },
];

const OnTheWay = ({ deliveries }: { deliveries: any }) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState<OnTheWay | null>(null);

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
        <div>
            <DashboardPageHeader
                title={t("on_the_way_deliveries")}
                desc={t("live_tracking")}
            />

            <AllFilters sortOptions={sortOptions} />

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((d) => (
                    <div
                        key={d.id}
                        onClick={() => setActive(d)}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${d.avatarColor}`}>
                                {d.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">{d.partnerName}</div>
                                <div className="text-xs text-gray-500 truncate">#{d.id} • {d.date}</div>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs flex items-center gap-1">
                                <SignalHigh size={12} /> {t("live")}
                            </span>
                        </div>

                        {/* TIMELINE */}
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

                        {/* ROUTE STATS */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2"><Navigation size={16} /> {d.distance}</div>
                            <div className="flex items-center gap-2"><Clock size={16} /> ETA {d.timeRemaining}</div>
                        </div>

                        <div className="mt-2 text-xs text-gray-500">{t("time_elapsed")}: {d.timeElapsed} • {t("speed")}: {d.speed}</div>
                    </div>
                ))}
            </div>

            {/* DRAWER PREVIEW */}
            {active && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActive(null)} />

                    <aside className="ml-auto w-full sm:w-[460px] bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
                        <h3 className="text-lg font-semibold">{t("on_the_way")} #{active.id}</h3>
                        <p className="text-xs text-gray-500 mb-4">{active.date}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-lg ${active.avatarColor}`}>
                                {active.partnerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </div>

                            <div>
                                <div className="text-sm font-medium">{active.partnerName}</div>
                                <div className="text-xs text-gray-500">{t("speed")}: {active.speed}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-gray-50 border">
                                <div className="text-xs text-gray-500 mb-1">{t("customer")}</div>
                                <div className="text-sm font-medium">{active.customer}</div>
                            </div>

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
                                    <div className="text-xs text-gray-500">{t("distance_left")}</div>
                                    <div className="text-sm font-semibold">{active.distance}</div>
                                </div>

                                <div className="p-3 rounded-lg bg-gray-50 border">
                                    <div className="text-xs text-gray-500">{t("eta")}</div>
                                    <div className="text-sm font-semibold">{active.timeRemaining}</div>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-gray-50 border">
                                <div className="text-xs text-gray-500">{t("time_elapsed")}</div>
                                <div className="text-sm font-semibold">{active.timeElapsed}</div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button onClick={() => setActive(null)} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: DELIGO }}>{t("close")}</button>
                            <button className="px-4 py-2 rounded-md border bg-white flex items-center gap-2"><Eye size={14} /> {t("view_partner")}</button>
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
};


export default OnTheWay;