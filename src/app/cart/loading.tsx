import Skeleton from 'react-loading-skeleton'

export default function Loading() {
    return <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow-md mb-4 mx-6 gap-4 border border-gray-100">
    {/* Checkbox skeleton */}
    <div className="flex items-center">
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
    </div>

    {/* Left section skeleton */}
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Image skeleton */}
        <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg animate-pulse" />

        {/* Product information skeleton */}
        <div className="flex flex-col justify-between space-y-2 w-full sm:w-[400px]">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
            
            {/* Description skeletons */}
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />

            {/* Action buttons skeleton */}
            <div className="flex gap-2 mt-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>
    </div>

    {/* Right section skeleton */}
    <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 w-full md:w-auto">
        {/* Price skeleton */}
        <div className="text-right">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Quantity control skeleton */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
    </div>
</div>
}