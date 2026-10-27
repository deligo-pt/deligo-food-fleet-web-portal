"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { cancelPartnerPayout } from "@/services/dashboard/deliveryPartner/deliveryPartner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    payoutId: string;
}

const CancelPartnerPayoutModal = ({ isOpen, onClose, payoutId }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!payoutId) return;

        setLoading(true);
        const toastId = toast.loading("Cancelling settlement...");

        try {
            const res = await cancelPartnerPayout(payoutId);

            if (res.success) {
                toast.success(
                    res.message || t("payout_cancelled") || "Settlement cancelled successfully",
                    { id: toastId }
                );
                onClose();
                router.refresh();
            } else {
                toast.error(
                    res.message || t("failed_to_cancel") || "Failed to cancel settlement",
                    { id: toastId }
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open && !loading) onClose();
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("cancel_payout") || "Cancel Settlement"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("cancel_payout_confirm") ||
                            "Are you sure you want to cancel this rider settlement? This action cannot be undone. The related orders will become available for settlement again."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        {t("keep_settlement") || "Keep Settlement"}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("confirm_cancel") || "Yes, Cancel"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CancelPartnerPayoutModal;