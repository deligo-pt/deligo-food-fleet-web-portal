import FilterSkeleton from "@/components/skeletons/common/FilterSkeleton";
import PaginationSkeleton from "@/components/skeletons/common/PaginationSkeleton";
import { StatSkeleton } from "@/components/skeletons/common/StatSkeleton";

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            <div className="h-24 w-full bg-[#DC3173] rounded-xl" />
            <FilterSkeleton />
            <StatSkeleton count={4} />
            <PaginationSkeleton />
        </div>
    );
}