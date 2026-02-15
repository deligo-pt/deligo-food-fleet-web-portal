/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PaymentPdf } from "@/utils/PaymentPdf";

interface Props {
    open: boolean;
    onClose: () => void;
    payments: any[];
}

export function ExportAllPaymentsModal({ open, onClose, payments }: Props) {
    const pdfRef = useRef<HTMLDivElement>(null);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Export Payment History</DialogTitle>
                </DialogHeader>

                {/* PDF CONTENT */}
                <div ref={pdfRef} className="bg-white p-4 rounded-md">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Transaction Id</th>
                                <th>Date</th>
                                <th>Partner</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.map((p) => (
                                <tr key={p?.id} className="border-t">
                                    <td className="p-2">{p?.id}</td>
                                    <td>{p?.date}</td>
                                    <td>{p?.partner}</td>
                                    <td>€ {p?.amount}</td>
                                    <td>{p?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <PDFDownloadLink
                        document={<PaymentPdf payments={payments} />}
                        fileName="payment-history.pdf"
                    >
                        {({ loading }) => (
                            <Button disabled={loading}>
                                {loading ? "Preparing..." : "Export as PDF"}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </DialogContent>
        </Dialog>
    );
}
