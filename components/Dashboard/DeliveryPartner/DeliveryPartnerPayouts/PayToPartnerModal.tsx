'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Truck } from 'lucide-react';
import { TDeliveryPartner } from '@/types/delivery-partner.type';
import { toast } from 'sonner';
import { initiatePartnerSettlement } from '@/services/dashboard/deliveryPartner/deliveryPartner';

interface PayToPartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    partners: TDeliveryPartner[];
}

const PayToPartnerModal = ({ isOpen, onClose, partners }: PayToPartnerModalProps) => {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleInitialPayment = async (partnerId: string) => {
        setLoadingId(partnerId);
        try {
            const res = await initiatePartnerSettlement(partnerId);

            if (res.success) {
                toast.success("Settlement initiated successfully");
                onClose();
            } else {
                toast.error(res.message || "Failed to initiate settlement");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Truck className="text-[#DC3173]" />
                        Select Partner for Payout
                    </DialogTitle>
                    <DialogDescription>
                        Choose a delivery partner to initiate their payment process.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto p-6">
                    {/* Horizontal scroll enabled via overflow-x-auto */}
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="min-w-50">Partner</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partners?.length > 0 ? (
                                    partners.map((partner: TDeliveryPartner) => (
                                        <TableRow key={partner?._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={partner?.profilePhoto} />
                                                        <AvatarFallback>
                                                            {partner?.name?.firstName || "Mr"}{partner?.name?.lastName || "User"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-sm">
                                                            {partner?.name?.firstName || "Mr"}{partner?.name?.lastName || "User"}
                                                        </div>
                                                        <div className="text-xs text-slate-500">{partner?.userId}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{partner?.contactNumber || 'N/A'}</TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                                    {partner?.operationalData?.currentStatus || ""}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleInitialPayment(partner?.userId as string)}
                                                    disabled={loadingId !== null}
                                                    className="bg-[#DC3173] hover:bg-[#DC3173]/90 text-white text-xs"
                                                >
                                                    {loadingId === partner._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        "Initiate Payment"
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10 text-slate-500">
                                            No partners available.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PayToPartnerModal;