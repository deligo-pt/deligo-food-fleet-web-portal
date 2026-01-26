/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import AllFilters from '@/components/Filtering/AllFilters';
import { useTranslation } from '@/hooks/use-translation';
import { ORDER_STATUS } from '@/types/order-deliveries';
import { formatDateTime } from '@/utils/formatter';
import { getSortOptions } from '@/utils/sortOptions';
import { StatusPill } from '@/utils/statusPill';
import { Bike, Clock, MapPin, } from 'lucide-react';
import { motion } from 'framer-motion';

const AllDeliveries = ({ deliveries }: { deliveries: any }) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);

    const ESTIMATED_TIME_STATUSES = new Set([
        ORDER_STATUS.PENDING,
        ORDER_STATUS.ACCEPTED,
        ORDER_STATUS.AWAITING_PARTNER,
        ORDER_STATUS.DISPATCHING,
        ORDER_STATUS.ASSIGNED,
        ORDER_STATUS.PREPARING,
        ORDER_STATUS.READY_FOR_PICKUP,
    ]);

    const ONGOING_STATUSES = new Set([
        ORDER_STATUS.PICKED_UP,
        ORDER_STATUS.ON_THE_WAY,
    ]);

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
                    title={t("all_deliveries")}
                    desc={t("track_every_delivery")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />

            {deliveries?.length < 1 && <div className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                <h1 className='text-xl font-semibold italic'>{t("no_results_found")}</h1>
            </div>}

            {/* Delivery List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
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

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold text-gray-900 truncate">
                                        {delivery?.deliveryParterId?.name?.firstName || "MD"} {" "} {delivery?.deliveryParterId?.name?.lastName || "Name"}
                                    </div>
                                    <StatusPill s={delivery.orderStatus} />
                                </div>
                                <div className="text-xs text-gray-500">#{delivery.deliveryPartnerId?.userId || "DL-user"} • {formatDateTime(delivery.createdAt)}</div>
                            </div>
                        </div>

                        {/* Timeline route */}
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

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-2"><Bike size={16} /> {delivery?.distance || "0 KM"}</div>

                            {ESTIMATED_TIME_STATUSES.has(delivery?.orderStatus) ? (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock size={16} />
                                    {delivery?.estimatedDeliveryTime || "0 min"}
                                </div>
                            ) : ONGOING_STATUSES.has(delivery?.orderStatus) ? (
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <Clock size={16} />
                                    {delivery.remainingDeliveryTime || "0 min"}
                                </div>
                            ) : delivery?.orderStatus === ORDER_STATUS.DELIVERED ? (
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Clock size={16} />
                                    {delivery?.completedDeliveryTime || "0 min"}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    —
                                </div>
                            )}

                            <div className="text-sm font-semibold text-gray-900">€{delivery.totalFee || 0}</div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(8px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        .animate-slide-in { animation: slide-in 180ms cubic-bezier(.2,.9,.2,1) both }
      `}</style>

        </div>
    );
};

export default AllDeliveries;