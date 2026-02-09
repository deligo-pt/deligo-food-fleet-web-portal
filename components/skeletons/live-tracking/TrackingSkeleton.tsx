import { SkeletonBase } from "../common/SkeletonBase";


export const TrackingSkeleton = () => (
    <div className="flex flex-col h-full space-y-4">
        <div className="h-32 w-full bg-pink-500 rounded-xl animate-pulse" />

        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
            {/* Sidebar List */}
            <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl border border-gray-100 space-y-4">
                <SkeletonBase className="h-6 w-32 mb-4" /> {/* "All Drivers" Label */}
                <SkeletonBase className="h-10 w-full rounded-lg mb-6" /> {/* Search Bar */}

                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <SkeletonBase className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <SkeletonBase className="h-3 w-24" />
                                <SkeletonBase className="h-2 w-16" />
                            </div>
                        </div>
                        <SkeletonBase className="h-8 w-24 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Large Map Area */}
            <div className="flex-1 bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden">
                <SkeletonBase className="h-full w-full" />
                {/* Mock Map Controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <SkeletonBase className="h-8 w-16 rounded shadow-sm" />
                    <SkeletonBase className="h-8 w-16 rounded shadow-sm" />
                </div>
            </div>
        </div>
    </div>
);