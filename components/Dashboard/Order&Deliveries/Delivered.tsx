/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CheckCircle, MapPin, Bike, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { formatDateTime } from "@/utils/formatter";
import { motion } from 'framer-motion';
import PaginationComponent from "@/components/Filtering/PaginationComponent";

const DELIGO = "#DC3173";

const Delivered = ({ deliveries }: { deliveries: any }) => {
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
                    title={t("delivered_orders")}
                    desc={t("completed_delivery_history")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />

            {deliveries?.data?.length < 1 && <div className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                <h1 className='text-xl font-semibold italic'>{t("no_results_found")}</h1>
            </div>}

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {deliveries?.data?.map((delivery: any) => (
                    <div
                        key={delivery?._id}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold bg-[#DC3173]`}
                            >
                                {(
                                    (delivery?.deliveryPartnerId?.name?.firstName?.trim()?.[0] || "") +
                                    (delivery?.deliveryPartnerId?.name?.lastName?.trim()?.[0] || "")
                                ).toUpperCase() || "NA"}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {delivery?.deliveryPartnerId?.name?.firstName || "MD"} {" "} {delivery?.deliveryPartnerId?.name?.lastName || "Name"}
                                </div>
                                <div className="text-xs text-gray-500 truncate">#{delivery.deliveryPartnerId?.userId || "DL-user"} • {formatDateTime(delivery.createdAt)}</div>
                            </div>

                            {/* SUCCESS ICON */}
                            <CheckCircle size={20} color={DELIGO} />
                        </div>

                        {/* TIMELINE */}
                        <div className="mt-4 ml-1 border-l-2 border-(--deligo)/30 pl-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} color={DELIGO} className="mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("pickup")}</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {`${delivery?.pickupAddress?.street || ""}, ${delivery?.pickupAddress?.city || ""}, ${delivery?.pickupAddress?.state || ""}, ${delivery?.pickupAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={16} color={DELIGO} className="mt-1" />
                                <div>
                                    <div className="text-xs text-gray-500">{t("drop_off")}</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {`${delivery?.deliveryAddress?.street || ""}, ${delivery?.deliveryAddress?.city || ""}, ${delivery?.deliveryAddress?.state || ""}, ${delivery?.deliveryAddress?.country || ""}` || "Portugal"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2"><Bike size={16} color={DELIGO} /> {delivery?.distance || "0 KM"}</div>
                            <div className="flex items-center gap-2"><Clock size={16} color={DELIGO} /> {delivery?.completedDeliveryTime || "0 min"}</div>
                        </div>

                        <div className="mt-2 text-sm font-semibold text-(--deligo)">€{delivery?.totalFee || 0}</div>
                    </div>
                ))}
            </div>

            {/* pagination */}
            {!!deliveries?.meta?.totalPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 md:px-6 py-10"
                >
                    <PaginationComponent
                        totalPages={deliveries?.meta?.totalPage as number}
                    />
                </motion.div>
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


export default Delivered;