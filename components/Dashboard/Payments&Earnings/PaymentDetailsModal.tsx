
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PaymentPdf } from "@/utils/PaymentPdf";
import { PayoutData } from "@/types/payment.type";
import { formatDateTime } from "@/utils/formatter";

interface Props {
    open: boolean;
    onClose: () => void;
    payment: PayoutData;
}

export function PaymentDetailsModal({ open, onClose, payment }: Props) {
    const pdfRef = useRef<HTMLDivElement>(null);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                </DialogHeader>

                {/* PDF CONTENT */}
                <div ref={pdfRef} className="space-y-4 bg-white p-4 rounded-md">
                    <InfoRow label="Transaction ID" value={payment?.payoutId} />
                    <InfoRow label="Partner" value={`${payment?.userId?.name?.firstName || ""} ${payment?.userId?.name?.lastName || ""}`} />
                    <InfoRow label="Date" value={formatDateTime(payment?.createdAt)} />
                    <InfoRow label="Amount" value={`€ ${payment?.amount}`} />
                    <InfoRow label="Status" value={payment?.status} />
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <PDFDownloadLink
                        document={<PaymentPdf payments={[payment]} />}
                        fileName={`${payment?.payoutId}.pdf`}
                    >
                        {({ loading }) => (
                            <Button disabled={loading} className="bg-[#DC3173]">
                                {loading ? "Preparing..." : "Export as PDF"}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b pb-2 text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
