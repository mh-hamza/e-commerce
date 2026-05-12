import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded-xl p-3 shadow-sm border border-gray-100">
      <div className="w-full aspect-[4/5] bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="space-y-3 px-1 pb-2">
        <div className="h-3 bg-gray-200 animate-pulse rounded w-1/4"></div>
        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
