"use client";

import {
    ArrowLeft,
    CreditCard,
    User,
    Calendar,
    CheckCircle2,
    ExternalLink,
    Clock,
    AlertCircle,
    Package,
    Truck,
    Mail,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { formatDateTime } from "@/utils/formatter";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { TRiderSettlement } from "@/types/payout.type";
import SettlePayoutModal from "./SettlePayoutModal";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import CancelPartnerPayoutModal from "./CancelPartnerPayoutModal";
import { generatePayoutPDF } from "@/utils/pdf/generatePayoutPDF";

interface PayoutDetailsProps {
    payout: TRiderSettlement;
}

const PayoutDetails = ({ payout }: PayoutDetailsProps) => {
    const [settleId, setSettleId] = useState<string | null>(null);
    const [cancelId, setCancelId] = useState<string | null>(null);
    const { t } = useTranslation();

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-green-100 text-green-700";
            case "PROCESSING":
                return "bg-blue-100 text-blue-700";
            case "PENDING":
                return "bg-amber-100 text-amber-700";
            case "FAILED":
            case "REJECTED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const partner = payout.deliveryPartnerId;
    const manager = payout.fleetManagerId;

    return (
        <div className="space-y-6 bg-slate-50 min-h-screen pb-10">
            {/* Back */}
            <Link
                href="/agent/delivery-partner-payouts"
                className="flex items-center gap-2 text-sm text-[#DC3173] font-medium cursor-pointer hover:underline w-fit"
            >
                <ArrowLeft size={16} />
                {t("back_to_payouts")}
            </Link>

            <DashboardPageHeader
                title={t("settlement_details")}
                desc={t("view_settlement_desc")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ──────────── LEFT ──────────── */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Amount card */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold flex items-center gap-3 flex-wrap">
                                    <span className="font-mono text-lg">
                                        {payout._id?.slice(-10).toUpperCase()}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className={`${getStatusStyles(payout.status)} border-none px-3 py-1`}
                                    >
                                        {payout.status}
                                    </Badge>
                                </CardTitle>
                                <p className="text-sm text-slate-500 mt-1">
                                    {t("created")} {formatDateTime(payout.createdAt)} · {t("last_updated")}{" "}
                                    {formatDateTime(payout.updatedAt)}
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                                        {t("settlement_amount")}
                                    </label>
                                    <div className="text-4xl font-black text-slate-900">
                                        €{formatPrice(payout.totalAmount)}
                                    </div>
                                    {payout.paymentMethod && (
                                        <Badge className="mt-2 bg-blue-50 text-blue-600 hover:bg-blue-50 border-none font-semibold">
                                            {payout.paymentMethod.replace("_", " ")}
                                        </Badge>
                                    )}
                                </div>

                                {payout.remarks && (
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                                            {t("remarks")}
                                        </label>
                                        <p className="text-sm text-slate-600 italic">
                                            {payout.remarks}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center md:justify-end">
                                <div className="bg-pink-50 p-6 rounded-2xl">
                                    <CreditCard className="w-16 h-16 text-[#DC3173] opacity-80" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Breakdown */}
                    {payout.breakdown?.length > 0 && (
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#DC3173]" />
                                    {t("earnings_breakdown")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {payout.breakdown.map((item, idx) => (
                                    <div
                                        key={item.orderId + idx}
                                        className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                            <span className="font-mono text-sm font-semibold text-slate-800">
                                                {item.orderId}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">
                                                    {t("gross")}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    €{formatPrice(item.grossEarnings)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">
                                                    {t("fleet_fee")}
                                                </p>
                                                <p className="text-sm font-semibold text-red-600">
                                                    -€{formatPrice(item.fleetFee)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">
                                                    {t("rider_slice")}
                                                </p>
                                                <p className="text-sm font-bold text-[#DC3173]">
                                                    €{formatPrice(item.riderSlice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Included Orders */}
                    {payout.orderIds?.length > 0 && (
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#DC3173]" />
                                    {t("included_orders")} ({payout.orderIds.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {payout.orderIds.map((order) => (
                                    <div
                                        key={order._id}
                                        className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100"
                                    >
                                        <div>
                                            <p className="font-mono text-sm font-semibold text-slate-800">
                                                {order.orderId}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {formatDateTime(order.createdAt)}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-50 text-green-700 border-none text-[10px]"
                                        >
                                            {order.orderStatus}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Payout Proof (if settled) */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#DC3173]" />
                                {t("payout_proof")}
                            </CardTitle>
                            {payout.payoutProof && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#DC3173] text-xs font-bold gap-1"
                                    asChild
                                >
                                    <a
                                        href={payout.payoutProof}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <ExternalLink size={14} />
                                        {t("open_full_size")}
                                    </a>
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            {payout.status === "PAID" && payout.payoutProof ? (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
                                    <Image
                                        src={payout.payoutProof}
                                        alt="Payout Proof"
                                        fill
                                        className="object-contain bg-white"
                                    />
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50 text-center">
                                    {payout.status === "FAILED" ? (
                                        <AlertCircle className="w-12 h-12 mb-2 opacity-20" />
                                    ) : (
                                        <Clock className="w-12 h-12 mb-2 opacity-20" />
                                    )}
                                    <p className="text-sm font-medium">
                                        {payout.status === "PAID"
                                            ? t("proof_missing")
                                            : `${t("settlement_is")} ${payout.status.toLowerCase()}.`}
                                    </p>
                                    <p className="text-xs">
                                        {t("proof_visibility_note")}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* ──────────── RIGHT ──────────── */}
                <div className="space-y-6">
                    {/* Status timeline */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">
                                {t("settlement_status")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            {[
                                {
                                    key: "PENDING",
                                    label: t("pending"),
                                    desc: t("settlement_request_created"),
                                },
                                {
                                    key: "PAID",
                                    label: t("paid"),
                                    desc: t("funds_delivered_to_rider"),
                                },
                            ].map((step, index, arr) => {
                                const isDone =
                                    payout.status === "PAID" ||
                                    (payout.status === "PENDING" && index === 0);
                                const isCurrent =
                                    (payout.status === "PENDING" && index === 0) ||
                                    (payout.status === "PAID" && index === 1);

                                return (
                                    <div key={step.key} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${isDone || isCurrent
                                                    ? "bg-[#DC3173] border-[#DC3173] text-white"
                                                    : "bg-slate-100 border-slate-200 text-slate-400"
                                                    }`}
                                            >
                                                <CheckCircle2 size={16} />
                                            </div>
                                            {index < arr.length - 1 && (
                                                <div
                                                    className={`w-0.5 h-8 my-1 ${payout.status === "PAID"
                                                        ? "bg-[#DC3173]"
                                                        : "bg-slate-200"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="pb-6">
                                            <p
                                                className={`text-sm font-bold ${isDone || isCurrent
                                                    ? "text-slate-900"
                                                    : "text-slate-400"
                                                    }`}
                                            >
                                                {step.label}
                                            </p>
                                            <p className="text-xs text-slate-500">{step.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Delivery Partner */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Truck className="w-4 h-4 text-[#DC3173]" />
                                {t("delivery_partner")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-pink-100">
                                    <AvatarImage src={partner?.profilePhoto} />
                                    <AvatarFallback>
                                        {partner?.name?.firstName?.[0] || "D"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold">
                                        {partner?.name?.firstName} {partner?.name?.lastName}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-mono">
                                        ID: {partner?.userId}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2 border-t border-slate-100">
                                {partner?.email && (
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Mail size={14} className="text-slate-400" />
                                        {partner.email}
                                    </div>
                                )}
                                {partner?.contactNumber && (
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Phone size={14} className="text-slate-400" />
                                        {partner.contactNumber}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Fleet Manager (initiator) */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <User className="w-4 h-4 text-[#DC3173]" />
                                {t("initiated_by")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-bold">
                                    {manager?.name?.firstName} {manager?.name?.lastName}
                                </p>
                                <p className="text-[10px] text-slate-400 font-mono">
                                    {manager?.userId}
                                </p>
                            </div>
                            {manager?.email && (
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Mail size={14} className="text-slate-400" />
                                    {manager.email}
                                </div>
                            )}
                            {manager?.contactNumber && (
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Phone size={14} className="text-slate-400" />
                                    {manager.contactNumber}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Timestamps */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">{t("timestamps")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                {
                                    icon: Calendar,
                                    label: t("created_at"),
                                    value: formatDateTime(payout.createdAt),
                                },
                                {
                                    icon: Clock,
                                    label: t("last_update"),
                                    value: formatDateTime(payout.updatedAt),
                                },
                                {
                                    icon: CheckCircle2,
                                    label: t("payment_date"),
                                    value:
                                        payout.status === "PAID"
                                            ? formatDateTime(payout.updatedAt)
                                            : "-",
                                },
                            ].map((time, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <time.icon
                                        className={`w-4 h-4 ${time.value === "-"
                                            ? "text-slate-300"
                                            : "text-[#DC3173]"
                                            }`}
                                    />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400">
                                            {time.label}
                                        </p>
                                        <p className="text-xs font-medium text-slate-600">
                                            {time.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {payout.status === "PAID" && (
                        <Button
                            onClick={() => generatePayoutPDF(payout as TRiderSettlement)}
                            className="w-full bg-[#DC3173] hover:bg-[#DC3173]/90 text-white"
                        >
                            {t("download_statement")}
                        </Button>
                    )}
                    <div className="flex flex-row gap-5 items-center w-full">
                        {payout.status === "PENDING" && (
                            <Button
                                onClick={() => setSettleId(payout?._id)}
                                className="flex-1 bg-[#DC3173] hover:bg-[#DC3173]/90 text-white"
                            >
                                {t("settle_payout")}
                            </Button>
                        )}
                        {payout.status === "PENDING" && (
                            <Button
                                onClick={() => setCancelId(payout?._id)}
                                className="flex-1 bg-[#DC3173] hover:bg-[#DC3173]/90 text-white"
                            >
                                {t("cancel_payout")}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <SettlePayoutModal
                isOpen={!!settleId}
                onClose={() => setSettleId(null)}
                payoutId={settleId || ""}
            />

            <CancelPartnerPayoutModal
                isOpen={!!cancelId}
                onClose={() => setCancelId(null)}
                payoutId={cancelId || ""}
            />
        </div>
    );
};

export default PayoutDetails;