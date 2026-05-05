/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import AllFilters from '@/components/Filtering/AllFilters';
import { useTranslation } from '@/hooks/use-translation';
import { getSortOptions } from '@/utils/sortOptions';
import { motion } from 'framer-motion';
import { CalendarCheck, Cog, Euro, FileText, MoreVertical, PlusCircleIcon, Truck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatPrice } from '@/utils/formatPrice';
import { formatDateTime } from '@/utils/formatter';
import { TDeliveryPartner } from '@/types/delivery-partner.type';
import { useState } from 'react';
import PayToPartnerModal from './PayToPartnerModal';
import SettlePayoutModal from './SettlePayoutModal';
import { useRouter } from 'next/navigation';
import { IPayout } from '@/types/payout.type';

interface IProps {
    partners: TDeliveryPartner[],
    payouts: { data: IPayout[] }
}

const DeliveryPartnerPayouts = ({ partners, payouts }: IProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [settleId, setSettleId] = useState<string | null>(null);
    const sortOptions = getSortOptions(t);
    const filteredPayouts = payouts?.data?.filter((payout: IPayout) => payout?.senderId?.role === 'FLEET_MANAGER') || [];
    const router = useRouter();

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
                    title={t("delivery_partners")}
                    desc={t("manage_your_delivery")}
                    isButton={true}
                    onClick={() => setIsModalOpen(true)}
                    icon={<PlusCircleIcon className="mr-2 h-5 w-5" />}
                    button_title={"Pay to Partner"}
                />
            </motion.div>

            {/* Modal Component */}
            <PayToPartnerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                partners={Array.isArray(partners) ? partners : []}
            />

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
                                    <Truck className="w-4" />
                                    Delivery Partner
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <FileText className="w-4" />
                                    Payout ID
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <Euro className="w-4" />
                                    Amount
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <PlusCircleIcon className="w-4" />
                                    Method
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <CalendarCheck className="w-4" />
                                    Created At
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <Cog className="w-4" />
                                    Status
                                </div>
                            </TableHead>
                            <TableHead className="text-right text-[#DC3173]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPayouts?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    className="text-[#DC3173] text-lg text-center"
                                    colSpan={7}
                                >
                                    No payouts found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPayouts?.map((payout: any) => (
                                <TableRow key={payout._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage
                                                    src={payout?.userId?.profilePhoto}
                                                    alt={`${payout?.userId?.name?.firstName}`}
                                                />
                                                <AvatarFallback>
                                                    {payout?.userId?.name?.firstName?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-sm">
                                                    {payout?.userId?.name?.firstName} {payout?.userId?.name?.lastName}
                                                </div>
                                                <div className="text-[10px] text-slate-400">
                                                    {payout?.userId?.userId}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="font-mono text-xs text-slate-600">
                                        {payout.payoutId}
                                    </TableCell>

                                    <TableCell className="font-bold">
                                        €{formatPrice(Number(payout.amount) || 0)}
                                    </TableCell>

                                    <TableCell>
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 uppercase">
                                            {payout.paymentMethod?.replace('_', ' ')}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-xs text-slate-500">
                                        {payout.createdAt ? formatDateTime(payout.createdAt) : "-"}
                                    </TableCell>

                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${payout.status === 'PROCESSING'
                                            ? 'bg-amber-100 text-amber-600'
                                            : 'bg-green-100 text-green-600'
                                            }`}>
                                            {payout.status}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="h-4 w-4 text-slate-400" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    router.push(`/agent/delivery-partner-payouts/${payout?.payoutId}`)
                                                }}>
                                                    View Details
                                                </DropdownMenuItem>
                                                {payout.status === "PROCESSING" && (
                                                    <DropdownMenuItem
                                                        className="text-[#DC3173] font-semibold"
                                                        onClick={() => setSettleId(payout?.payoutId)}
                                                    >
                                                        Settle Payout
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </motion.div>

            {/* settle payout modal */}
            <SettlePayoutModal
                isOpen={!!settleId}
                onClose={() => setSettleId(null)}
                payoutId={settleId || ""}
            />

        </>
    );
};

export default DeliveryPartnerPayouts;