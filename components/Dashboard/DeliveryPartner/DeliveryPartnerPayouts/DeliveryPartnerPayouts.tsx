/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import AllFilters from '@/components/Filtering/AllFilters';
import { useTranslation } from '@/hooks/use-translation';
import { getSortOptions } from '@/utils/sortOptions';
import { motion } from 'framer-motion';
import { CalendarCheck, CalendarMinus, CalendarPlus, Cog, Euro, FileText, MoreVertical, PlusCircleIcon, Truck } from 'lucide-react';
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

const DeliveryPartnerPayouts = () => {
    const { t } = useTranslation();
    const sortOptions = getSortOptions(t);
    const payouts = [] as any[];

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
                    onClick={() => console.log("clicked")}
                    icon={<PlusCircleIcon className="mr-2 h-5 w-5" />}
                    button_title={"Pay to Partner"}
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
                                    <>
                                        <Truck className="w-4" />
                                        Delivery Partner
                                    </>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <CalendarPlus className="w-4" />
                                    Start Date
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <CalendarMinus className="w-4" />
                                    End Date
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
                                    <CalendarCheck className="w-4" />
                                    Payment Date
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="text-[#DC3173] flex gap-2 items-center">
                                    <FileText className="w-4" />
                                    Document
                                </div>
                            </TableHead>
                            <TableHead className="text-right text-[#DC3173] flex gap-2 items-center justify-end">
                                <Cog className="w-4" />
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payouts?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    className="text-[#DC3173] text-lg text-center"
                                    colSpan={7}
                                >
                                    No payouts found
                                </TableCell>
                            </TableRow>
                        ) : payouts?.map((payout) => (
                            <TableRow key={payout._id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={payout?.userId?.profilePhoto}
                                                alt={`${payout?.userId?.name?.firstName} ${payout?.userId?.name?.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {payout?.userId?.name?.firstName?.charAt(0)}
                                                {payout?.userId?.name?.lastName?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold">
                                                {payout?.userId?.name?.firstName}{" "}
                                                {payout?.userId?.name?.lastName}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {payout?.userId?.userId}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {payout.startDate
                                        ? formatDateTime(payout.startDate)
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    {payout.endDate ? formatDateTime(payout.endDate) : "-"}
                                </TableCell>
                                <TableCell>€{formatPrice(Number(payout.amount) || 0)}</TableCell>
                                <TableCell>
                                    {payout.paymentDate
                                        ? formatDateTime(payout.paymentDate)
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    {payout.payoutProof ? (
                                        <button
                                            onClick={() =>
                                                // downloadFileFromAnyLink(payout.payoutProof as string)
                                                console.log("download file")
                                            }
                                            className="flex items-center gap-1 bg-[#DC3173] hover:bg-[#DC3173]/90 text-white px-2 py-1.5 font-semibold text-[10px] rounded-md"
                                        >
                                            Download
                                        </button>
                                    ) : (
                                        "-"
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                            // onClick={() =>
                                            //     router.push(
                                            //         `${payoutLinks[userRole]}/${payout.payoutId}`,
                                            //     )
                                            // }
                                            >
                                                View
                                            </DropdownMenuItem>
                                            {payout.status === "PENDING" && (
                                                <DropdownMenuItem
                                                // onClick={() =>
                                                //     router.push(
                                                //         `${payoutLinks[userRole]}/${payout.payoutId}/settle`,
                                                //     )
                                                // }
                                                >
                                                    Settle Payout
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>

        </>
    );
};

export default DeliveryPartnerPayouts;