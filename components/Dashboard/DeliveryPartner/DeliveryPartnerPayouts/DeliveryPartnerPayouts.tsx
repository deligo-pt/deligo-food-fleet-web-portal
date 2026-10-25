/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardPageHeader from "@/components/common/DashboardPageHeader/DashboardPageHeader";
import AllFilters from "@/components/Filtering/AllFilters";
import { useTranslation } from "@/hooks/use-translation";
import { getSortOptions } from "@/utils/sortOptions";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TMeta } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import ReusableTable from "@/components/common/ReusableTable/ReusableTable";
import {
    getRiderSettlementColumns,
    TRiderSettlement,
} from "./getRiderSettlementColumns";
import { generatePaymentPDF } from "@/utils/pdf/generatePaymentPDF";

interface IProps {
    partners: TDeliveryPartner[];
    payouts: { data: TRiderSettlement[]; meta?: TMeta };
}

const DeliveryPartnerPayouts = ({ payouts }: IProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const sortOptions = getSortOptions(t);

    const columns = getRiderSettlementColumns({
        t,
        onViewDetails: (row) => {
            const id = row.payoutId || row._id;
            router.push(`/agent/delivery-partner-payouts/${id}`);
        },
        onDownloadStatement: (row) => {
            generatePaymentPDF(row as any);
        },
    });

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <DashboardPageHeader
                    title={t("delivery_partner_payouts")}
                    desc={t("manage_all_delivery_partner_payouts_history")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-2 overflow-x-auto"
            >
                <ReusableTable<TRiderSettlement>
                    data={payouts?.data || []}
                    meta={payouts?.meta}
                    columns={columns}
                    getRowKey={(row) => row._id}
                    emptyMessage={t("no_payouts_found")}
                    showSerial
                    getRowClassName={(row) => {
                        if (row.status === "PENDING") return "bg-amber-50/40";
                        if (row.status === "FAILED") return "bg-red-50/30";
                        return undefined;
                    }}
                />
            </motion.div>
        </>
    );
};

export default DeliveryPartnerPayouts;