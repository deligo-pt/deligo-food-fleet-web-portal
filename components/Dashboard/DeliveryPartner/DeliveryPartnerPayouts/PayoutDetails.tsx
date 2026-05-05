
import {
    ArrowLeft,
    CreditCard,
    User,
    Calendar,
    CheckCircle2,
    ExternalLink,
    Building2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardPageHeader from '@/components/common/DashboardPageHeader/DashboardPageHeader';
import { formatDateTime } from '@/utils/formatter';
import Link from 'next/link';
import Image from 'next/image';
import { IPayout } from '@/types/payout.type';

interface PayoutDetailsProps {
    payout: IPayout;
}

const PayoutDetails = ({ payout }: PayoutDetailsProps) => {

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PAID': return "bg-green-100 text-green-700";
            case 'PROCESSING': return "bg-amber-100 text-amber-700";
            case 'REJECTED': return "bg-red-100 text-red-700";
            default: return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="space-y-6 bg-slate-50 min-h-screen">
            {/* Header Navigation */}
            <Link
                href="/agent/delivery-partner-payouts"
                className="flex items-center gap-2 text-sm text-[#DC3173] font-medium cursor-pointer hover:underline w-fit"
            >
                <ArrowLeft size={16} />
                Back to Payouts
            </Link>

            {/* Hero Section */}
            <DashboardPageHeader
                title={"Payout Details"}
                desc={"View the details and status of this payout request"}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Amount & Summary Card */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    {payout.payoutId}
                                    <Badge variant="secondary" className={`${getStatusStyles(payout.status)} border-none px-3 py-1`}>
                                        {payout.status}
                                    </Badge>
                                </CardTitle>
                                <p className="text-sm text-slate-500 mt-1">
                                    Created {formatDateTime(payout.createdAt)} • Last updated {formatDateTime(payout.updatedAt)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Payout Amount</label>
                                    <div className="text-4xl font-black text-slate-900 flex items-baseline gap-1">
                                        €{payout.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                                    </div>
                                    <Badge className="mt-2 bg-blue-50 text-blue-600 hover:bg-blue-50 border-none font-semibold">
                                        {payout.paymentMethod?.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Remarks</label>
                                    <p className="text-sm text-slate-600 italic">
                                        {payout.remarks || "No remarks provided"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <div className="bg-pink-50 p-6 rounded-2xl">
                                    <CreditCard className="w-16 h-16 text-[#DC3173] opacity-80" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Details Section */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#DC3173]" />
                                Bank Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Bank Name", value: `${payout?.bankDetails?.bankName || "N/A"}` },
                                { label: "Account Holder", value: `${payout?.bankDetails?.accountHolderName || "N/A"}` },
                                { label: "IBAN", value: `${payout?.bankDetails?.iban || "N/A"}` },
                                { label: "Swift / BIC", value: `${payout?.bankDetails?.swiftCode || "N/A"}` },
                                { label: "Bank Reference ID", value: payout.bankReferenceId || "N/A" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{item.label}</p>
                                    <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Payout Proof Card */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#DC3173]" />
                                Payout Proof
                            </CardTitle>
                            {payout.payoutProof && (
                                <Button variant="ghost" size="sm" className="text-[#DC3173] text-xs font-bold gap-1" asChild>
                                    <a href={payout.payoutProof} target="_blank" rel="noreferrer">
                                        <ExternalLink size={14} />
                                        Open Full Size
                                    </a>
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            {payout.status === 'PAID' && payout.payoutProof ? (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
                                    <Image
                                        src={payout.payoutProof}
                                        alt="Payout Proof"
                                        fill
                                        className="object-contain bg-white"
                                    />
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50 text-center">
                                    {payout.status === 'REJECTED' ? <AlertCircle className="w-12 h-12 mb-2 opacity-20" /> : <Clock className="w-12 h-12 mb-2 opacity-20" />}
                                    <p className="text-sm font-medium">
                                        {payout.status === 'PAID' ? "Proof missing" : `Payout is ${payout.status.toLowerCase()}.`}
                                    </p>
                                    <p className="text-xs">Proof will be visible once settlement is finalized.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Sidebar Stats */}
                <div className="space-y-6">

                    {/* Payout Status Timeline */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">Payout Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 relative">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-[#DC3173] flex items-center justify-center text-white shrink-0 z-10">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div className={`w-0.5 h-full mt-1 ${payout.status === 'PAID' ? 'bg-[#DC3173]' : 'bg-slate-200'}`}></div>
                                </div>
                                <div className="pb-6">
                                    <p className="text-sm font-bold">Pending</p>
                                    <p className="text-xs text-slate-500">Payout request created</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${payout.status === 'PAID' ? 'bg-[#DC3173] text-white border-[#DC3173]' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                        <CheckCircle2 size={16} />
                                    </div>
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${payout.status === 'PAID' ? 'text-slate-900' : 'text-slate-400'}`}>Paid</p>
                                    <p className="text-xs text-slate-400">Funds delivered</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Partner Info */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <User className="w-4 h-4 text-[#DC3173]" />
                                {payout.userModel?.replace(/([A-Z])/g, ' $1').trim() || "Delivery Partner"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-pink-100">
                                    <AvatarImage src={payout.userId.profilePhoto} />
                                    <AvatarFallback>{payout.userId.name.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold uppercase">{payout.userId.name.firstName} {payout.userId.name.lastName}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">ID: {payout.userId.userId}</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Processed By</p>
                                <p className="text-xs font-semibold text-slate-700">
                                    {payout.senderId.name.firstName} {payout.senderId.name.lastName}
                                    <span className="text-slate-400 ml-1 font-normal">({payout.senderId.role.replace('_', ' ')})</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timestamps Card */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold">Timestamps</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { icon: Calendar, label: "Created At", value: formatDateTime(payout.createdAt) },
                                { icon: Clock, label: "Last Update", value: formatDateTime(payout.updatedAt) },
                                { icon: CheckCircle2, label: "Payment Date", value: payout.status === 'PAID' ? formatDateTime(payout.updatedAt) : "-" }
                            ].map((time, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <time.icon className={`w-4 h-4 ${time.value === '-' ? 'text-slate-300' : 'text-[#DC3173]'}`} />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400">{time.label}</p>
                                        <p className="text-xs font-medium text-slate-600">{time.value}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PayoutDetails;