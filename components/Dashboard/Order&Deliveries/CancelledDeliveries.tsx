/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { XCircle, MapPin, Bike, AlertTriangle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { formatDateTime } from "@/utils/formatter";
import { motion } from 'framer-motion';

const DELIGO = "#DC3173";

const CancelledDeliveries = ({ deliveries }: { deliveries: any }) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);

    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <DashboardPageHeader
                    title={t("cancelled_deliveries")}
                    desc={t("view_failed_cancelled")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />

            {deliveries?.length < 1 && <div className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                <h1 className='text-xl font-semibold italic'>{t("no_results_found")}</h1>
            </div>}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {deliveries?.map((delivery: any) => (
                    <article
                        key={delivery?._id}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-red-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                        role="button"
                        tabIndex={0}
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

                            <XCircle size={20} color={DELIGO} />
                        </div>

                        <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                            <AlertTriangle size={14} /> <span>{delivery?.remarks || "Customer cancelled before pickup"}</span>
                        </p>

                        {/* Timeline */}
                        <div className="mt-4 ml-1 border-l-2 border-red-200 pl-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-green-600 mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("pickup")}</div>
                                    <div className="text-sm font-medium text-gray-800 truncate">
                                        {`${delivery?.pickupAddress?.street || ""}, ${delivery?.pickupAddress?.city || ""}, ${delivery?.pickupAddress?.state || ""}, ${delivery?.pickupAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-red-600 mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("drop_off")}</div>
                                    <div className="text-sm font-medium text-gray-800 truncate">
                                        {`${delivery?.deliveryAddress?.street || ""}, ${delivery?.deliveryAddress?.city || ""}, ${delivery?.deliveryAddress?.state || ""}, ${delivery?.deliveryAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Bike size={16} color={DELIGO} /> <span>{delivery?.completedDeliveryTime || "0 min"}</span>
                            </div>
                            <div className="text-sm font-semibold text-red-500">{t("refund")} €{delivery?.refund || 0}</div>
                        </div>
                    </article>
                ))}
            </div>

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
