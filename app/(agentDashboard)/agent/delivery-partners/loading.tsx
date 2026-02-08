import { CardGridSkeleton } from "@/components/skeletons/common/CardGridSkeleton";
import FilterSkeleton from "@/components/skeletons/common/FilterSkeleton";
import PaginationSkeleton from "@/components/skeletons/common/PaginationSkeleton";


export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            <div className="h-24 w-full bg-[#DC3173] rounded-xl" />
            <FilterSkeleton />
            <CardGridSkeleton count={6} />
            <PaginationSkeleton />
        </div>
    );
}