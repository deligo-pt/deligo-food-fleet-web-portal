import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PaymentPdf } from "@/utils/PaymentPdf";
import { PayoutData } from "@/types/payment.type";
import { formatDateTime } from "@/utils/formatter";

// ✅ shadcn table
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    open: boolean;
    onClose: () => void;
    payments: PayoutData[];
}

export function ExportAllPaymentsModal({
    open,
    onClose,
    payments,
}: Props) {
    const pdfRef = useRef<HTMLDivElement>(null);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl md:min-w-2xl lg:min-w-3xl">
                <DialogHeader>
                    <DialogTitle>Export Payment History</DialogTitle>
                </DialogHeader>

                <div
                    ref={pdfRef}
                    className="bg-white p-4 rounded-md overflow-x-auto"
                >
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>Payout Id</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Partner</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {payments?.map((p) => (
                                <TableRow key={p?._id}>
                                    <TableCell className="font-medium whitespace-nowrap">
                                        {p?.payoutId}
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {formatDateTime(p?.createdAt)}
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {p?.userId?.name?.firstName || ""}{" "}
                                        {p?.userId?.name?.lastName || ""}
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        € {p?.amount}
                                    </TableCell>

                                    <TableCell className="capitalize whitespace-nowrap">
                                        {p?.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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