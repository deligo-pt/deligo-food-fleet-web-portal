"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, UploadCloud, X } from "lucide-react";
import { settlePartnerPayout, uploadSingleImage } from "@/services/dashboard/deliveryPartner/deliveryPartner";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";


type PaymentMethod = "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING" | "OTHER";

const PAYMENT_METHODS: { value: PaymentMethod; labelKey: string; fallback: string }[] = [
    { value: "BANK_TRANSFER", labelKey: "bank_transfer", fallback: "Bank Transfer" },
    { value: "MOBILE_BANKING", labelKey: "mobile_banking", fallback: "Mobile Banking" },
    { value: "CASH", labelKey: "cash", fallback: "Cash" },
    { value: "OTHER", labelKey: "other", fallback: "Other" },
];

interface SettleProps {
    isOpen: boolean;
    onClose: () => void;
    payoutId: string;
}

const SettlePayoutModal = ({ isOpen, onClose, payoutId }: SettleProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("BANK_TRANSFER");
    const [referenceId, setReferenceId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleClose = () => {
        if (loading || uploading) return;
        resetForm();
        onClose();
    };

    const clearFile = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl(null);
    };

    // in resetForm / handleClose:
    const resetForm = () => {
        clearFile();
        setPaymentMethod("BANK_TRANSFER");
        setReferenceId("");
        setRemarks("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;

        // cleanup previous preview
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }

        if (!selected) {
            setFile(null);
            return;
        }

        if (selected.size > 5 * 1024 * 1024) {
            toast.error(t("file_must_be_less_than_5mb") || "File must be less than 5MB");
            return;
        }

        if (!selected.type.startsWith("image/")) {
            toast.error(t("only_images_allowed") || "Only image files are allowed");
            return;
        }

        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentMethod) {
            toast.error(t("payment_method_required") || "Payment method is required");
            return;
        }

        setLoading(true);
        const toastId = toast.loading(t("completing_settlement") || "Completing settlement...");

        try {
            let payoutProofUrl: string | undefined;

            // 1) Upload proof first (if provided)
            if (file) {
                setUploading(true);
                toast.loading("Uploading proof...", { id: toastId });

                const uploadResult = await uploadSingleImage(file);
                const url = uploadResult.data?.[0] || null;

                if (!uploadResult?.success && !url) {
                    toast.error(
                        uploadResult?.message || t("upload_failed") || "Failed to upload proof",
                        { id: toastId }
                    );
                    return;
                }

                if (!url || typeof url !== "string") {
                    toast.error(t("invalid_upload_url") || "Upload did not return a valid URL", {
                        id: toastId,
                    });
                    return;
                }

                payoutProofUrl = url;
                setUploading(false);
            }

            // 2) Confirm settlement with JSON payload
            toast.loading("Completing settlement...", { id: toastId });

            const payload = {
                paymentMethod,
                referenceId: referenceId.trim() || "",
                payoutProof: payoutProofUrl || "",
                remarks: remarks.trim() || "",
            };

            const res = await settlePartnerPayout(payoutId, payload);

            if (res.success) {
                toast.success(
                    res.message || t("settlement_completed") || "Settlement completed successfully",
                    { id: toastId }
                );
                resetForm();
                onClose();
                router.refresh();
                return;
            }

            const errorSources = res?.data?.errorSources;
            if (errorSources?.length > 0) {
                toast.error(
                    errorSources
                        ?.map((err: { path: string; message: string }) => err?.message)
                        .join(", "),
                    { id: toastId }
                );
            } else {
                toast.error(
                    res.message || "Failed to initiate payout",
                    { id: toastId }
                );
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(t("unexpected_error") || "An unexpected error occurred", {
                id: toastId,
            });
        } finally {
            setUploading(false);
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-[#DC3173]">
                        {t("finalize_settlement")}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    {/* Payment Method */}
                    <div className="space-y-2">
                        <Label>{t("payment_method") || "Payment Method"} *</Label>
                        <Select
                            value={paymentMethod}
                            onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("select_payment_method") || "Select method"} />
                            </SelectTrigger>
                            <SelectContent>
                                {PAYMENT_METHODS.map((m) => (
                                    <SelectItem key={m.value} value={m.value}>
                                        {t(m.labelKey) || m.fallback}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Bank / transaction reference */}
                    <div className="space-y-2">
                        <Label htmlFor="referenceId">
                            {t("bank_reference_id") || "Reference ID"}{" "}
                            <span className="text-slate-400 font-normal">
                                ({t("optional") || "optional"})
                            </span>
                        </Label>
                        <Input
                            id="referenceId"
                            value={referenceId}
                            onChange={(e) => setReferenceId(e.target.value)}
                            placeholder="Ref: 123456789"
                        />
                    </div>

                    {/* Remarks */}
                    <div className="space-y-2">
                        <Label htmlFor="remarks">
                            {t("remarks_optional") || "Remarks"}{" "}
                            <span className="text-slate-400 font-normal">
                                ({t("optional") || "optional"})
                            </span>
                        </Label>
                        <Textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder={t("add_any_notes_here") || "Add any notes here"}
                            rows={3}
                        />
                    </div>

                    {/* Proof upload */}
                    <div className="space-y-2">
                        <Label>
                            {t("payout_proof_screenshot_receipt") || "Payout proof"}{" "}
                            <span className="text-slate-400 font-normal">
                                ({t("optional") || "optional"})
                            </span>
                        </Label>

                        {!file ? (
                            /* Empty state – drop zone */
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-[#DC3173]/40 hover:bg-[#DC3173]/5 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    disabled={loading || uploading}
                                />
                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                        <UploadCloud className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">
                                        {t("click_or_drag_image_to_upload") || "Click or drag image to upload"}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        PNG, JPG, WEBP · Max 5MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* Preview state */
                            <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                                {/* Image preview */}
                                <div className="relative w-full aspect-16/10 bg-slate-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={previewUrl || ""}
                                        alt="Payout proof preview"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* File meta + actions */}
                                <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-slate-100 bg-white">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            {(file.size / 1024).toFixed(1)} KB · {file.type || "image"}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {/* Change file */}
                                        <label className="relative cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                                disabled={loading || uploading}
                                            />
                                            <span className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                                                {t("change") || "Change"}
                                            </span>
                                        </label>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            disabled={loading || uploading}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md text-red-600 border border-red-100 hover:bg-red-50 transition disabled:opacity-50"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                            {t("remove") || "Remove"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#DC3173] hover:bg-[#DC3173]/90"
                        disabled={loading || uploading}
                    >
                        {(loading || uploading) && (
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        )}
                        {uploading
                            ? t("uploading_proof") || "Uploading..."
                            : t("complete_settlement") || "Complete Settlement"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SettlePayoutModal;