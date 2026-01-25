/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Clock, MapPin, Navigation, SignalHigh } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { getSortOptions } from "@/utils/sortOptions";
import { formatDateTime } from "@/utils/formatter";

const OnTheWay = ({ deliveries }: { deliveries: any }) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);

    return (
        <div>
            <DashboardPageHeader
                title={t("on_the_way_deliveries")}
                desc={t("live_tracking")}
            />

            <AllFilters sortOptions={sortOptions} />

            {deliveries?.length < 1 && <div className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                <h1 className='text-xl font-semibold italic'>{t("no_results_found")}</h1>
            </div>}

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {deliveries?.map((delivery: any) => (
                    <div
                        key={delivery?._id}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold bg-[#DC3173]`}>
                                {(
                                    (delivery?.deliveryPartnerId?.name?.firstName?.trim()?.[0] || "") +
                                    (delivery?.deliveryPartnerId?.name?.lastName?.trim()?.[0] || "")
                                ).toUpperCase() || "NA"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {delivery?.deliveryParterId?.name?.firstName || "MD"} {" "} {delivery?.deliveryParterId?.name?.lastName || "Name"}
                                </div>
                                <div className="text-xs text-gray-500 truncate">#{delivery.deliveryPartnerId?.userId || "DL-user"} • {formatDateTime(delivery.createdAt)}</div>
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
                                    <div className="text-sm font-medium text-gray-800">
                                        {`${delivery?.pickupAddress?.street || ""}, ${delivery?.pickupAddress?.city || ""}, ${delivery?.pickupAddress?.state || ""}, ${delivery?.pickupAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-red-600 mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("drop_off")}</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {`${delivery?.deliveryAddress?.street || ""}, ${delivery?.deliveryAddress?.city || ""}, ${delivery?.deliveryAddress?.state || ""}, ${delivery?.deliveryAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROUTE STATS */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2"><Navigation size={16} /> {delivery?.distance || '0 KM'}</div>
                            <div className="flex items-center gap-2"><Clock size={16} /> ETA {delivery.remainingDeliveryTime || "0 min"}</div>
                        </div>

                        <div className="mt-2 text-xs text-gray-500">{t("time_elapsed")}: {delivery?.timeElapsed || "0 min"} • {t("speed")}: {delivery?.speed || "0 km/h"}</div>
                    </div>
                ))}
            </div>

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