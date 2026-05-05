
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// A reusable Skeleton component if you don't have one in your UI library
const SkeletonItem = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

const PayoutDetailsLoading = () => {
    return (
        <div className="space-y-6 bg-slate-50 min-h-screen p-4 lg:p-8">
            {/* Back Link Skeleton */}
            <SkeletonItem className="h-4 w-32" />

            {/* Hero Section Skeleton */}
            <div className="rounded-xl p-8 bg-[#DC3173] animate-pulse h-32 w-full" />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Amount & Summary Card Skeleton */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-2">
                                <SkeletonItem className="h-8 w-48" />
                                <SkeletonItem className="h-4 w-64" />
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <SkeletonItem className="h-3 w-24" />
                                    <SkeletonItem className="h-10 w-40" />
                                    <SkeletonItem className="h-6 w-20" />
                                </div>
                                <div className="space-y-2">
                                    <SkeletonItem className="h-3 w-20" />
                                    <SkeletonItem className="h-4 w-full" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <SkeletonItem className="h-24 w-24 rounded-2xl" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Details Skeleton */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <SkeletonItem className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                                    <SkeletonItem className="h-2 w-16" />
                                    <SkeletonItem className="h-4 w-32" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Sidebar Stats */}
                <div className="space-y-6">
                    {/* Status Card Skeleton */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <SkeletonItem className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="flex gap-4">
                                <SkeletonItem className="h-8 w-8 rounded-full" />
                                <div className="space-y-2">
                                    <SkeletonItem className="h-4 w-20" />
                                    <SkeletonItem className="h-3 w-32" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <SkeletonItem className="h-8 w-8 rounded-full" />
                                <div className="space-y-2">
                                    <SkeletonItem className="h-4 w-20" />
                                    <SkeletonItem className="h-3 w-32" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Partner Card Skeleton */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <SkeletonItem className="h-4 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <SkeletonItem className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <SkeletonItem className="h-4 w-32" />
                                    <SkeletonItem className="h-3 w-24" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timestamps Skeleton */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <SkeletonItem className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <SkeletonItem className="h-4 w-4" />
                                    <div className="space-y-1">
                                        <SkeletonItem className="h-2 w-16" />
                                        <SkeletonItem className="h-3 w-24" />
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

export default PayoutDetailsLoading;