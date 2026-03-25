/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Hash,
    FileText,
    Calendar,
    Handshake,
    CircleCheckBig,
    Eye,
    EuroIcon,
} from "lucide-react";
import { useState } from "react";
import { ExportAllPaymentsModal } from "./ExportAllPaymentsModal";
import { PaymentDetailsModal } from "./PaymentDetailsModal";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { PayoutResponse } from "@/types/payment.type";
import { formatDateTime } from "@/utils/formatter";
import AllFilters from "@/components/Filtering/AllFilters";


interface IProps {
    payments: PayoutResponse
}

const PaymentHistory = ({ payments }: IProps) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const filterOptions = [
        {
            label: t("status"),
            key: "status",
            placeholder: t("select_status"),
            type: "select",
            items: [
                {
                    label: t("pending"),
                    value: "PENDING",
                },
                {
                    label: t("processing"),
                    value: "PROCESSING",
                },
                {
                    label: t("paid"),
                    value: "PAID",
                },
                {
                    label: t("failed"),
                    value: "FAILED",
                },
            ],
        },
    ];


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
                    title={t("payment_history")}
                    desc={t("log_past_payouts")}
                />
            </motion.div>

            <div className="flex flex-row gap-2 justify-between items-start">
                <AllFilters sortOptions={sortOptions} filterOptions={filterOptions} />
                <Button onClick={() => setExportOpen(true)} className="bg-[#DC3173]">
                    Export
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-2xl p-4 md:p-6 my-6 overflow-x-auto"
            >
                <Table className="max-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Hash className="w-4 h-4" />
                                    {t("payout_id")}
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Calendar className="w-4 h-4" />
                                    {t("date")}
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Handshake className="w-4 h-4" />
                                    {t("partner")}
                                </div>
                            </TableHead>

                            {/* <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Clock className="w-4 h-4" />
                                    {t("period")}
                                </div>
                            </TableHead> */}

                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <EuroIcon className="w-4 h-4" />
                                    {t("amount")}
                                </div>
                            </TableHead>

                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <CircleCheckBig className="w-4 h-4" />
                                    {t("status")}
                                </div>
                            </TableHead>

                            <TableHead className="text-right">
                                <div className="flex items-center justify-end gap-2 text-[#DC3173]">
                                    <Eye className="w-4 h-4" />
                                    {t("details")}
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments?.data &&
                            payments?.data?.length > 0 &&
                            payments?.data?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-mono text-xs">
                                        {item.payoutId}
                                    </TableCell>

                                    <TableCell>
                                        {formatDateTime(item.createdAt)}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {item.userId?.name?.firstName || ""} {item.userId?.name?.lastName || ""}
                                            </span>
                                            <span className="text-xs text-muted-foreground">({item.userId?.userId})</span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="font-semibold">
                                        {item.amount.toFixed(2)}
                                    </TableCell>

                                    <TableCell>
                                        <CustomBadge
                                            variant={
                                                item.status === "PAID"
                                                    ? "success"
                                                    : item.status === "PROCESSING"
                                                        ? "warning"
                                                        : "destructive"
                                            }
                                            className="uppercase text-[10px]"
                                        >
                                            {t(item.status.toLowerCase())}
                                        </CustomBadge>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => {
                                                setSelectedPayment(item);
                                                setOpen(true);
                                            }}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <FileText className="w-4 h-4 cursor-pointer text-[#DC3173]" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {payments?.data?.length === 0 && (
                            <TableRow>
                                <TableCell
                                    className="text-[#DC3173] text-lg text-center"
                                    colSpan={5}
                                >
                                    {t("no_payment_history_found")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </motion.div>


            {!!payments?.meta?.totalPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 md:px-6"
                >
                    <PaginationComponent
                        totalPages={payments?.meta?.totalPage as number}
                    />
                </motion.div>
            )}

            {/* EXPORT individual */}
            <PaymentDetailsModal
                open={open}
                onClose={() => setOpen(false)}
                payment={selectedPayment}
            />

            {/* EXPORT ALL MODAL */}
            <ExportAllPaymentsModal
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                payments={payments?.data}
            />
        </div>
    );
}


export default PaymentHistory;