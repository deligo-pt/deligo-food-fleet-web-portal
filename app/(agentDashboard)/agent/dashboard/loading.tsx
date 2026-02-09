import { StatSkeleton } from "@/components/skeletons/common/StatSkeleton";
import { TableSkeleton } from "@/components/skeletons/common/TableSkeleton";


export default function Loading() {
    return (
        <div className="p-6 space-y-8">
            <div className="h-32 w-full bg-[#DC3173] rounded-xl animate-pulse" />

            <StatSkeleton count={4} />

            <div className="space-y-4 bg-white p-6 rounded-xl">
                <TableSkeleton rows={3} cols={1} />
            </div>
        </div>
    );
}