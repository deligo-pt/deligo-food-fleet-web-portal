import { SkeletonBase } from "./SkeletonBase";


export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
    <div className="p-8 space-y-6">
        {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="space-y-2">
                <SkeletonBase className="h-4 w-24" />
                <SkeletonBase className={`w-full ${i === 2 ? 'h-32' : 'h-12'}`} />
            </div>
        ))}
        <div className="flex justify-end">
            <SkeletonBase className="h-12 w-40 rounded-lg" />
        </div>
    </div>
);