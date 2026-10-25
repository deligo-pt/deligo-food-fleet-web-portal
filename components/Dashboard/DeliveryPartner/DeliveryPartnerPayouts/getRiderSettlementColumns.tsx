"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@/components/common/ReusableTable/ReusableTable";
import { formatPrice } from "@/utils/formatPrice";
import { formatDateTime } from "@/utils/formatter";
import {
    CalendarCheck,
    Cog,
    Euro,
    FileText,
    MoreVertical,
    Truck,
} from "lucide-react";

export type TRiderSettlement = {
    _id: string;
    fleetManagerId?: string;
    deliveryPartnerId?: {
        _id: string;
        userId: string;
        name?: {
            firstName?: string;
            lastName?: string;
        };
        profilePhoto?: string;
    };
    totalAmount: number;
    orderIds?: string[];
    breakdown?: Array<{
        orderId: string;
        grossEarnings: number;
        fleetFee: number;
        riderSlice: number;
    }>;
    status: "PENDING" | "PROCESSING" | "PAID" | "FAILED" | string;
    createdAt: string;
    updatedAt?: string;
    // legacy / optional fields if some records still use old shape
    payoutId?: string;
    amount?: number;
    paymentMethod?: string;
    userId?: {
        userId?: string;
        name?: { firstName?: string; lastName?: string };
        profilePhoto?: string;
    };
};

type TFunction = (key: string) => string;

interface Params {
    t: TFunction;
    onViewDetails: (row: TRiderSettlement) => void;
    onDownloadStatement?: (row: TRiderSettlement) => void;
}

export function getRiderSettlementColumns({
    t,
    onViewDetails,
    onDownloadStatement,
}: Params): Column<TRiderSettlement>[] {
    return [
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <Truck className="w-4" />
                    {t("delivery_partner")}
                </div>
            ),
            accessor: (row) => {
                const partner = row.deliveryPartnerId || row.userId;
                const firstName = partner?.name?.firstName || "";
                const lastName = partner?.name?.lastName || "";
                const userId = partner?.userId || "-";

                return (
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage
                                src={partner?.profilePhoto}
                                alt={firstName}
                            />
                            <AvatarFallback>
                                {firstName?.charAt(0) || "D"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-sm">
                                {firstName} {lastName}
                            </div>
                            <div className="text-[10px] text-slate-400">{userId}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <FileText className="w-4" />
                    {t("payout_id") || "ID"}
                </div>
            ),
            accessor: (row) => (
                <span className="font-mono text-xs text-slate-600">
                    {row.payoutId || row._id?.slice(-8).toUpperCase()}
                </span>
            ),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <Euro className="w-4" />
                    {t("amount")}
                </div>
            ),
            accessor: (row) => (
                <span className="font-bold">
                    €{formatPrice(Number(row.totalAmount ?? row.amount) || 0)}
                </span>
            ),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <FileText className="w-4" />
                    {t("orders") || "Orders"}
                </div>
            ),
            accessor: (row) => (
                <span className="text-xs text-slate-600">
                    {row.orderIds?.length ?? row.breakdown?.length ?? 0}{" "}
                    {(row.orderIds?.length ?? row.breakdown?.length ?? 0) === 1
                        ? t("order") || "order"
                        : t("orders") || "orders"}
                </span>
            ),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <CalendarCheck className="w-4" />
                    {t("created_at")}
                </div>
            ),
            accessor: (row) => (
                <span className="text-xs text-slate-500">
                    {row.createdAt ? formatDateTime(row.createdAt) : "-"}
                </span>
            ),
        },
        {
            header: (
                <div className="text-[#DC3173] flex gap-2 items-center">
                    <Cog className="w-4" />
                    {t("status")}
                </div>
            ),
            accessor: (row) => {
                const status = row.status || "PENDING";
                const styles: Record<string, string> = {
                    PENDING: "bg-amber-100 text-amber-700",
                    PROCESSING: "bg-blue-100 text-blue-700",
                    PAID: "bg-green-100 text-green-700",
                    FAILED: "bg-red-100 text-red-700",
                };
                return (
                    <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold ${styles[status] || "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            header: (
                <div className="text-right text-[#DC3173]">{t("actions")}</div>
            ),
            className: "text-right",
            accessor: (row) => (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(row)}>
                            {t("view_details")}
                        </DropdownMenuItem>

                        {row.status === "PAID" && (
                            onDownloadStatement && (
                                <DropdownMenuItem
                                    className="text-[#DC3173] font-semibold"
                                    onClick={() => onDownloadStatement(row)}
                                >
                                    {t("download_statement")}
                                </DropdownMenuItem>
                            )
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
}