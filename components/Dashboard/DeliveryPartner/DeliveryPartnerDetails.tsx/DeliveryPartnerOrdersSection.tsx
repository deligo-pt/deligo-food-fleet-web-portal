"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Info, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ReusableTable from "@/components/common/ReusableTable/ReusableTable";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { getOrderColumns } from "./getOrderColumns";
import { TOrder } from "@/types/order-deliveries";
import { useTranslation } from "@/hooks/use-translation";
import DeliveryPartnerSection from "./DeliveryPartnerSection";
import { initiateRiderPayout } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { TMeta } from "@/types";

interface Props {
    orderResult: {
        data: TOrder[];
        meta: TMeta;
    };
    deliveryPartnerId: string;
}

export default function DeliveryPartnerOrdersSection({
    orderResult,
    deliveryPartnerId
}: Props) {
    const { t } = useTranslation();
    const router = useRouter();

    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Only unsettled rider payouts can be selected
    const selectableOrders = useMemo(
        () =>
            (orderResult?.data || []).filter(
                (o) =>
                    o.orderStatus === "DELIVERED" &&
                    o.payoutMetadata?.rider?.isSettled === false
            ),
        [orderResult?.data]
    );

    const toggleSelect = (orderId: string, canSelect: boolean) => {
        if (!canSelect) return;
        setSelectedIds((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleSelectAllSelectable = () => {
        const allSelectableIds = selectableOrders.map((o) => o._id);
        setSelectedIds(allSelectableIds);
    };

    const handleDeselect = () => {
        setSelectedIds([]);
        setIsSelectMode(false);
    };

    const handleInitiatePayout = async () => {
        if (selectedIds.length === 0) {
            toast.error(t("select_at_least_one_order") || "Select at least one order");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading(
            t("initiating_payout") || "Initiating rider payout..."
        );

        try {
            const result = await initiateRiderPayout({
                deliveryPartnerId,
                orderIds: selectedIds,
                // remarks: optional
            });

            if (result.success) {
                toast.success(
                    result.message || "Rider payout initiated successfully",
                    { id: toastId }
                );
                setSelectedIds([]);
                setIsSelectMode(false);
                router.refresh();
                return;
            }

            const errorSources = result?.data?.errorSources;
            if (errorSources?.length > 0) {
                toast.error(
                    errorSources
                        ?.map((err: { path: string; message: string }) => err?.message)
                        .join(", "),
                    { id: toastId }
                );
            } else {
                toast.error(
                    result.message || "Failed to initiate payout",
                    { id: toastId }
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = getOrderColumns({
        t,
        isSelectMode,
        selectedIds,
        onToggleSelect: toggleSelect,
    });

    return (
        <DeliveryPartnerSection
            title={t("all_orders")}
            icon={<CalendarClock />}
        >
            <div>
                <div className="flex flex-row items-end w-full justify-end my-2">
                    <div className="flex items-center gap-2">
                        {!isSelectMode ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsSelectMode(true)}
                                className="border-[#DC3173] text-[#DC3173] hover:bg-[#DC3173]/10"
                            >
                                {t("select") || "Select"}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDeselect}
                                    className="gap-1"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    {t("deselect") || "Deselect"}
                                </Button>

                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        disabled={selectedIds.length === 0 || isSubmitting}
                                        onClick={handleInitiatePayout}
                                        className="bg-[#DC3173] hover:bg-[#DC3173]/90 text-white"
                                    >
                                        {isSubmitting
                                            ? t("processing") || "Processing..."
                                            : `${t("initiate_payout") || "Initiate Payout"}${selectedIds.length > 0
                                                ? ` (${selectedIds.length})`
                                                : ""
                                            }`}
                                    </Button>

                                    {/* Info popover */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="p-1.5 rounded-full text-gray-400 hover:text-[#DC3173] hover:bg-[#DC3173]/10 transition"
                                            >
                                                <Info className="w-4 h-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            align="end"
                                            className="w-72 text-sm text-gray-600"
                                        >
                                            <p className="font-medium text-gray-900 mb-1">
                                                {t("initiate_payout") || "Initiate Payout"}
                                            </p>
                                            <p>
                                                {t("initiate_payout_helper") ||
                                                    "Select one or more delivered orders that have not been settled yet for this delivery partner. Only orders with an unsettled rider payout can be selected. Click “Initiate Payout” to create a settlement for the selected orders."}
                                            </p>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {selectableOrders.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleSelectAllSelectable}
                                        className="text-xs text-gray-500"
                                    >
                                        {t("select_all") || "Select all eligible"}
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <section>
                    <ReusableTable
                        data={orderResult?.data}
                        meta={orderResult?.meta}
                        columns={columns}
                        getRowKey={(row) => row._id as string}
                        emptyMessage={t("no_orders_found")}
                        getRowClassName={(row) => {
                            if (!isSelectMode) return "";
                            const canSelect =
                                row.orderStatus === "DELIVERED" &&
                                row.payoutMetadata?.rider?.isSettled === false;
                            return canSelect ? "" : "opacity-50 pointer-events-none";
                        }}
                    />

                    {!!orderResult?.meta?.totalPage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-4 md:px-6"
                        >
                            <PaginationComponent
                                totalPages={orderResult.meta.totalPage as number}
                            />
                        </motion.div>
                    )}
                </section>
            </div>
        </DeliveryPartnerSection>
    );
}