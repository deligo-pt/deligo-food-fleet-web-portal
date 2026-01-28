'use client';
import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import AllFilters from '@/components/Filtering/AllFilters';
import { useTranslation } from '@/hooks/use-translation';
import { getSortOptions } from '@/utils/sortOptions';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleCheckBig, Clock2, Cog, IdCard, Mail } from "lucide-react";
import { ISos } from '@/types/sos.type';
import { Badge, issueStyles, statusStyles } from "./SosBadges";
import { useState } from 'react';
import { formatDateTime } from '@/utils/formatter';
import { Metadata } from 'next';
import SosDetailsModal from './SosDetailsModal';

interface IProps {
    sosAlerts: {
        data: ISos[];
        meta: Metadata
    }
}

const DeliveryPartnerEmergencyAlerts = ({ sosAlerts }: IProps) => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const [selectedSos, setSelectedSos] = useState<ISos | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                        {sosAlerts?.data?.length === 0 && (
                            <TableRow>
                                <TableCell
                                    className="text-[#DC3173] text-lg text-center"
                                    colSpan={5}
                                >
                                    {t("no_alerts_found")}
                                </TableCell>
                            </TableRow>
                        )}
                        {sosAlerts?.data?.map((alert: ISos) => (
                            <TableRow key={alert?._id} className="hover:bg-gray-50">
                                {/* Partner */}
                                <TableCell>
                                    <div className="font-semibold">
                                        {alert?.userId?.id?.name?.firstName} {" "} {alert?.userId?.id?.name?.lastName}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        ID: {alert?.userId?.id?.userId}
                                    </p>
                                </TableCell>

                                {/* Issue */}
                                <TableCell>
                                    {alert?.issueTags?.map(issue => (
                                        <Badge
                                            key={issue}
                                            label={issue}
                                            className={issueStyles[issue]}
                                        />
                                    ))}
                                </TableCell>

                                {/* Time */}
                                <TableCell className="text-gray-600 flex items-center gap-2">
                                    <Clock2 size={14} />
                                    {formatDateTime(alert?.createdAt)}
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <Badge
                                        label={alert?.status}
                                        className={statusStyles[alert?.status]}
                                    />
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedSos(alert);
                                            setIsModalOpen(true);
                                        }}
                                        className="text-pink-600 font-semibold hover:underline"
                                    >
                                        View Details
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>

            {/* Drawer */}
            <SosDetailsModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sos={selectedSos}
            />
        </>
    );
};

export default DeliveryPartnerEmergencyAlerts;