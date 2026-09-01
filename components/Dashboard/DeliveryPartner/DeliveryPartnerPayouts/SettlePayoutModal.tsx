'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Loader2, UploadCloud } from 'lucide-react';
import { settlePartnerPayout } from '@/services/dashboard/deliveryPartner/deliveryPartner';
import { useTranslation } from '@/hooks/use-translation';

interface SettleProps {
    isOpen: boolean;
    onClose: () => void;
    payoutId: string;
}

const SettlePayoutModal = ({ isOpen, onClose, payoutId }: SettleProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const bankReferenceId = form.bankReferenceId.value;
        const remarks = form.bankReferenceId.value;

        const formData = new FormData();

        if (!file) {
            return toast.error("Payout proof image is mandatory");
        } else if (file.size > 5 * 1024 * 1024) {
            toast.error("File must be less than 5MB");
            return;
        }

        const payload = {
            bankReferenceId,
            remarks
        }

        formData.append("file", file);
        formData.append("data", JSON.stringify(payload));

        setLoading(true);
        try {

            const res = await settlePartnerPayout(payoutId, formData);

            if (res.success) {
                toast.success(res.message || "Settlement completed successfully");
                onClose();
            } else {
                toast.error(res.message || "Failed to settle payout");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle className="text-[#DC3173]">{t("finalize_settlement")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankReferenceId">{t("bank_reference_id")}</Label>
                        <Input id="bankReferenceId" name="bankReferenceId" placeholder="Ref: 123456789" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="remarks">{t("remarks_optional")}</Label>
                        <Textarea id="remarks" name="remarks" placeholder={t("add_any_notes_here")} />
                    </div>

                    <div className="space-y-2">
                        <Label>{t("payout_proof_screenshot_receipt")}</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null,)}
                            />
                            <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                            <p className="text-xs text-slate-500 mt-2">
                                {file ? file.name : t("click_or_drag_image_to_upload")}
                            </p>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#DC3173] hover:bg-[#DC3173]/90" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        {t("complete_settlement")}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SettlePayoutModal;