'use client';
import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import AllFilters from '@/components/Filtering/AllFilters';
import { useTranslation } from '@/hooks/use-translation';
import { getSortOptions } from '@/utils/sortOptions';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleCheckBig, Clock2, Cog, IdCard, Mail, MoreVertical } from "lucide-react";

const DeliveryPartnerEmergencyAlerts = () => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const alertsData = {
        data: []
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
                    title={t("delivery_partner_emergency_alerts")}
                    desc={t("real_time_monitoring_delivery_partner")}
                />
            </motion.div>

            <AllFilters sortOptions={sortOptions} />


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-2xl p-4 md:p-6 mb-2 overflow-x-auto"
            >
                <Table className="max-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <IdCard className="w-4" />
                                    {t("partner_name")}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <Mail className="w-4" />
                                    {t("emergency_type")}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <Clock2 className="w-4" />
                                    {t("time_triggered")}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <CircleCheckBig className="w-4" />
                                    {t("status")}
                                </div>
                            </TableHead>
                            <TableHead className="text-right text-[#DC3173] flex gap-2 items-center justify-end">
                                <Cog className="w-4" />
                                {t("actions")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {partnersResult &&
                            partnersResult?.data?.length > 0 &&
                            partnersResult?.data?.map((partner) => (
                                <TableRow key={partner._id}>
                                    <TableCell>
                                        {partner.name?.firstName} {partner.name?.lastName}
                                    </TableCell>
                                    <TableCell>{partner.email}</TableCell>
                                    <TableCell>{partner.contactNumber}</TableCell>
                                    <TableCell>
                                        {partner.isDeleted ? "Deleted" : partner.status}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {!partner.isDeleted && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="h-4 w-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end"
                                                    className="min-w-20 w-auto px-2">
                                                    <DropdownMenuItem
                                                        className=""
                                                        onClick={() =>
                                                            router.push("/agent/delivery-partners/" + partner.userId)
                                                        }
                                                    >
                                                        {t("viewCTA")}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        {alertsData?.data?.length === 0 && (
                            <TableRow>
                                <TableCell
                                    className="text-[#DC3173] text-lg text-center"
                                    colSpan={5}
                                >
                                    {t("no_alerts_found")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </motion.div>

        </div>
    );
};

export default DeliveryPartnerEmergencyAlerts;