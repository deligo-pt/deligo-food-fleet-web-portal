import FilterSkeleton from "@/components/skeletons/common/FilterSkeleton";
import PaginationSkeleton from "@/components/skeletons/common/PaginationSkeleton";
import { StatSkeleton } from "@/components/skeletons/common/StatSkeleton";
import { TableSkeleton } from "@/components/skeletons/common/TableSkeleton";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            <div className="h-24 w-full bg-[#DC3173] rounded-xl" />
            <FilterSkeleton />
            <StatSkeleton count={4} />
            <div className="space-y-4 bg-white p-6 rounded-xl">
                <TableSkeleton rows={3} cols={1} />
            </div>
            <PaginationSkeleton />
        </div>
    );
}