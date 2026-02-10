
import { FormSkeleton } from "@/components/skeletons/common/FormSkeleton";
import { SkeletonBase } from "@/components/skeletons/common/SkeletonBase";

export default function Loading() {
    return (
        <div className="p-6 space-y-6 flex flex-col items-center w-full">
            {/* Page Header */}
            <div className="flex flex-col items-center space-y-2 mb-4">
                <SkeletonBase className="h-8 w-48" />
                <SkeletonBase className="h-4 w-64" />
            </div>

            <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <FormSkeleton fields={4} />

                <div className="p-8 border-t border-gray-50 flex flex-col items-center space-y-4">
                    <SkeletonBase className="h-10 w-10 rounded-full" />
                    <SkeletonBase className="h-6 w-48" />
                    <SkeletonBase className="h-10 w-32" />
                </div>
            </div>
        </div>
    );
}