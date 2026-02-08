import { SkeletonBase } from "./SkeletonBase";


export const StatSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <SkeletonBase className="h-4 w-24" />
                    <SkeletonBase className="h-6 w-6 rounded-full" />
                </div>
                <SkeletonBase className="h-8 w-12 mb-2" />
                <SkeletonBase className="h-3 w-32" />
            </div>
        ))}
    </div>
);