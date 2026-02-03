/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import AllFilters from "@/components/Filtering/AllFilters";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { getSortOptions } from "@/utils/sortOptions";
import { motion } from 'framer-motion';

const DELIGO = "#DC3173";


const DeliveryPartnerReviews = ({ reviews }: any) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);

    function SentimentTag({ type }: { type: any }) {
        if (type === "POSITIVE")
            return <span className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700">{t("positive")}</span>;
        if (type === "NEUTRAL")
            return <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">{t("neutral")}</span>;
        return <span className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600">{t("negative")}</span>;
    }

    return (
        <div>
            <style>{`:root{--deligo:${DELIGO}}`}</style>
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
                    title={t("delivery_partner_reviews")}
                    desc={t("analyze_customer_feedback")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />

            {/* REVIEWS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {reviews?.map((r: any) => (
                    <div
                        key={r?._id}
                        className="cursor-pointer bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold bg-[#DC3173]`}>
                                {(
                                    (r?.targetId?.name?.firstName?.[0] || "") +
                                    (r?.targetId?.name?.lastName?.[0] || "")
                                ).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {r?.targetId?.name?.firstName} {" "} {r?.targetId?.name?.lastName}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {r?.targetId?.userId}
                                </div>
                            </div>

                            <div className="ml-auto flex items-center gap-1 text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-sm font-medium text-gray-800">{r?.rating}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 line-clamp-3 mb-3">{r?.review ? r?.review : "The customer hasn't said anything!"}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                            <span>#{r?.orderId?.orderId || ""}</span>
                            <SentimentTag type={r?.sentiment} />
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
}


export default DeliveryPartnerReviews;