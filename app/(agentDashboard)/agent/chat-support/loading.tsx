import { SkeletonBase } from "@/components/skeletons/common/SkeletonBase";


export default function Loading() {
    return (
        <div className="p-6 space-y-6 flex flex-col items-center w-full">
            <div className="flex flex-col items-center space-y-2 mb-4">
                <SkeletonBase className="h-8 w-48" />
                <SkeletonBase className="h-4 w-64" />
            </div>

            <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col h-[600px]">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                        <SkeletonBase className="h-10 w-10 rounded-full" />
                        <div className="space-y-1">
                            <SkeletonBase className="h-4 w-32" />
                            <SkeletonBase className="h-3 w-20" />
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="flex-1 p-6 space-y-6">
                        <div className="flex gap-3">
                            <SkeletonBase className="h-8 w-8 rounded-full" />
                            <SkeletonBase className="h-12 w-2/3 rounded-2xl rounded-tl-none" />
                        </div>
                        <div className="flex flex-row-reverse gap-3">
                            <SkeletonBase className="h-12 w-1/2 rounded-2xl rounded-tr-none bg-pink-100" />
                        </div>
                        <div className="flex gap-3">
                            <SkeletonBase className="h-8 w-8 rounded-full" />
                            <SkeletonBase className="h-20 w-3/4 rounded-2xl rounded-tl-none" />
                        </div>
                    </div>

                    {/* Input Bar */}
                    <div className="p-4 border-t border-gray-100 flex gap-2">
                        <SkeletonBase className="h-12 flex-1 rounded-xl" />
                        <SkeletonBase className="h-12 w-12 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}