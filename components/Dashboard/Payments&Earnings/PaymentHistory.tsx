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
    Clock,
    CircleCheckBig,
    Eye,
    EuroIcon,
} from "lucide-react";
import { useState } from "react";
import SearchFilter from "@/components/Filtering/SearchFilter";
import SelectFilter from "@/components/Filtering/SelectFilter";
import { ExportAllPaymentsModal } from "./ExportAllPaymentsModal";
import { PaymentDetailsModal } from "./PaymentDetailsModal";


const historyData = [
    {
        id: "TX123456",
        date: "2023-10-20",
        partner: "Alex Johnson",
        amount: 1250.5,
        status: "completed",
        period: "Oct 12 - Oct 19",
    },
    {
        id: "TX123457",
        date: "2023-10-20",
        partner: "Sarah Williams",
        amount: 980.0,
        status: "completed",
        period: "Oct 12 - Oct 19",
    },
    {
        id: "TX123458",
        date: "2023-10-20",
        partner: "Michael Brown",
        amount: 2100.75,
        status: "processing",
        period: "Oct 12 - Oct 19",
    },
    {
        id: "TX123459",
        date: "2023-10-13",
        partner: "David Wilson",
        amount: 1675.0,
        status: "completed",
        period: "Oct 05 - Oct 12",
    },
    {
        id: "TX123460",
        date: "2023-10-13",
        partner: "Emily Davis",
        amount: 450.25,
        status: "failed",
        period: "Oct 05 - Oct 12",
    },
    {
        id: "TX123461",
        date: "2023-10-13",
        partner: "Alex Johnson",
        amount: 1100.0,
        status: "completed",
        period: "Oct 05 - Oct 12",
    },
];

const PaymentHistory = () => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [exportOpen, setExportOpen] = useState(false);

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

            <div className="flex flex-row gap-2 justify-between items-center">
                <SearchFilter paramName="searchTerm" placeholder="Searching..." />
                <div className="flex flex-row gap-2 items-center">
                    <SelectFilter
                        paramName="sortBy"
                        options={sortOptions}
                        placeholder="Sort By"
                    />
                    <Button onClick={() => setExportOpen(true)} className="bg-[#DC3173]">
                        Export
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-2 overflow-x-auto"
            >
                <Table className="max-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Hash className="w-4 h-4" />
                                    {t("transaction_id")}
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

                            <TableHead>
                                <div className="flex items-center gap-2 text-[#DC3173]">
                                    <Clock className="w-4 h-4" />
                                    {t("period")}
                                </div>
                            </TableHead>

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
                        {historyData &&
                            historyData?.length > 0 &&
                            historyData?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.partner}</TableCell>
                                    <TableCell>
                                        {item.period}
                                    </TableCell>
                                    <TableCell>
                                        {item.amount}
                                    </TableCell>
                                    <TableCell>
                                        <CustomBadge
                                            variant={
                                                item.status === "completed"
                                                    ? "success"
                                                    : item.status === "processing"
                                                        ? "warning"
                                                        : "destructive"
                                            }
                                        >
                                            {item.status}
                                        </CustomBadge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => {
                                            setSelectedPayment(item);
                                            setOpen(true);
                                        }} variant="ghost" size="sm">
                                            <FileText
                                                className="cursor-pointer"

                                            />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {historyData?.length === 0 && (
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


            {/* {!!historyData?.meta?.totalPage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 md:px-6"
                >
                    <PaginationComponent
                        totalPages={historyData?.meta?.totalPage as number}
                    />
                </motion.div>
            )} */}

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
                payments={historyData}
            />
        </div>
    );
}


export default PaymentHistory;