/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Download, RefreshCcw } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { IPartnersAnalyticsResponse, PartnerRow } from "@/types/delivery-partner.type";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import SearchFilter from "@/components/Filtering/SearchFilter";
import SelectFilter from "@/components/Filtering/SelectFilter";
import { getDaysOptions } from "@/utils/daysOption";
import PartnerPerformanceCard from "./PartnerPerformanceCard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const DELIGO = "#DC3173";

const DeliveryPartnerPerformance = ({ partnerPerformance }: { partnerPerformance: IPartnersAnalyticsResponse }) => {
    const { t } = useTranslation();
    const daysOption = getDaysOptions(t);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const sortOptions = [
        { label: t("newest_first"), value: "-createdAt" },
        { label: t("oldest_first"), value: "createdAt" },
        { label: t("top_deliveries"), value: "top-deliveries" },
        { label: t("top_rating"), value: "top-rating" },
        { label: t("top_earnings"), value: "top-earnings" }
    ];

    function exportCSV(data: PartnerRow[]) {
        const headers = [
            "ID",
            "Display ID",
            "Name",
            "City",
            "Vehicle",
            "Deliveries",
            "Avg Delivery Time",
            "Acceptance Rate",
            "Earnings",
        ];

        const rows = data.map((d) => [
            d.id,
            d.displayId,
            d.name,
            d.city,
            d.vehicle,
            d.deliveries,
            d.avgMins,
            d.acceptance,
            d.earnings,
        ]);

        // Escape commas & quotes properly
        const escape = (value: unknown) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csvContent = [
            headers.map(escape).join(","),
            ...rows.map((row) => row.map(escape).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `partner-performance-${new Date()
            .toISOString()
            .slice(0, 10)}.csv`;
        a.click();

        URL.revokeObjectURL(url);
    }

    function refresh() {
        startTransition(() => {
            router.refresh();
        });
    };

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
                    title={t("delivery_partner_performance")}
                    desc={t("sortable_filterable_exportable")}
                />
            </motion.div>

            <div className="flex flex-row justify-between items-center my-5">
                <SearchFilter paramName="searchTerm" placeholder="Search name, city or vehicle" />
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <SelectFilter
                        paramName="sortBy"
                        options={sortOptions}
                        placeholder="Sort By"
                    />
                    <SelectFilter
                        paramName="timeframe"
                        options={daysOption}
                        placeholder="Timeframe"
                    />

                    <button onClick={() => exportCSV(partnerPerformance.table.data)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border shadow-sm text-sm hover:scale-105 transition">
                        <Download size={14} /> {t("export")}
                    </button>

                    <button
                        onClick={refresh}
                        disabled={isPending}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white disabled:opacity-60"
                        style={{ backgroundColor: DELIGO }}
                    >
                        <RefreshCcw
                            size={14}
                            className={isPending ? "animate-spin" : ""}
                        />
                        {isPending ? t("refreshing") : t("refresh")}
                    </button>

                </div>
            </div>

            {/* KPI Cards — unique glassy style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <PartnerPerformanceCard
                    title={t("top_partner_deliveries")}
                    value={partnerPerformance?.cards?.topPartnerDeliveries?.toString() || "0"}
                    bottomText={t("in_the_selected_timeframe")}
                />
                <PartnerPerformanceCard
                    title={t("avg_delivery_time")}
                    value={partnerPerformance?.cards?.avgDeliveryTime || "0 min"}
                    bottomText={t("lower_is_better")}
                />
                <PartnerPerformanceCard
                    title={t("avg_acceptance_rate")}
                    value={partnerPerformance?.cards?.avgAcceptanceRate || "0%"}
                    bottomText={t("higher_is_better")}
                />

                <PartnerPerformanceCard
                    title={t("total_earnings")}
                    value={partnerPerformance?.cards?.totalEarnings || "€0.00"}
                    bottomText={t("aggregate")}
                />
            </div>

            {/* Table — responsive columns to avoid horizontal scroll */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-2xl p-4 md:p-6 overflow-x-auto"
            >
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("partner")}</TableHead>
                            <TableHead className="hidden md:table-cell">{t("city")}</TableHead>
                            <TableHead>{t("deliveries")}</TableHead>
                            <TableHead className="hidden lg:table-cell">{t("avg_mins")}</TableHead>
                            <TableHead>{t("acceptance")}</TableHead>
                            <TableHead>{t("earnings")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {partnerPerformance?.table?.data?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                                    {t("no_partners_found")}
                                </TableCell>
                            </TableRow>
                        )}

                        {(partnerPerformance?.table?.data || []).map((p) => (
                            <TableRow key={p.id} className="hover:bg-gray-50">
                                {/* Partner */}
                                <TableCell>
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-[#DC3173]">
                                            {p.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .slice(0, 2)
                                                .join("")}
                                        </div>

                                        <div className="truncate">
                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                {p.name}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">
                                                {p.displayId} • {p.vehicle}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* City */}
                                <TableCell className="hidden md:table-cell">
                                    {p.city}
                                </TableCell>

                                {/* Deliveries */}
                                <TableCell className="font-medium">
                                    {p.deliveries}
                                </TableCell>

                                {/* Avg Minutes */}
                                <TableCell className="hidden lg:table-cell">
                                    {p.avgMins}
                                </TableCell>

                                {/* Acceptance */}
                                <TableCell>
                                    <span className="font-medium">{p.acceptance}</span>
                                </TableCell>

                                {/* Earnings */}
                                <TableCell>
                                    €{p.earnings}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
            {!!partnerPerformance?.table?.meta?.totalPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 md:px-6 py-5"
                >
                    <PaginationComponent
                        totalPages={partnerPerformance?.table?.meta?.totalPage as number}
                    />
                </motion.div>
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



export default DeliveryPartnerPerformance