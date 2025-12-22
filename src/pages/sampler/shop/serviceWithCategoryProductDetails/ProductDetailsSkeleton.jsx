import React from "react";
import { Skeleton } from "antd";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image gallery skeleton */}
        <div className="md:w-1/2 relative">
          <div className="flex gap-4">
            {/* Thumbnail skeletons */}
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton.Image
                  key={item}
                  active
                  className="!w-16 !h-16 rounded"
                />
              ))}
            </div>

            {/* Main image skeleton */}
            <div className="flex-1 relative">
              <Skeleton.Image active className="!w-full !h-[50vh] rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right side - Product info skeleton */}
        <div className="md:w-1/2">
          {/* Product title */}
          <Skeleton.Input active className="!w-3/4 !h-8 mb-2" />

          {/* Short description */}
          <Skeleton
            active
            paragraph={{ rows: 2, width: ["100%", "80%"] }}
            title={false}
            className="mb-4"
          />

          {/* Price and rating */}
          <div className="mb-6">
            <Skeleton.Input active className="!w-32 !h-8 mb-2" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton.Input active className="!w-24 !h-5" />
              <Skeleton.Input active className="!w-12 !h-5" />
            </div>
          </div>

          {/* Variant selection skeleton */}
          <div className="mb-6">
            <Skeleton.Input active className="!w-40 !h-6 mb-3" />
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <Skeleton.Button
                  key={item}
                  active
                  className="!w-full !h-20 rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Selected variant info skeleton */}
          <div className="mb-6">
            <Skeleton
              active
              paragraph={{ rows: 2 }}
              className="p-4 bg-gray-50 rounded-lg"
            />
          </div>

          {/* Add to cart button skeleton */}
          <Skeleton.Button active className="!w-full !h-10 rounded" />
        </div>
      </div>

      {/* Collapse sections skeleton */}
      <div className="mt-8 space-y-4">
        {[1, 2].map((item) => (
          <div key={item} className="bg-gray-50 rounded-lg p-4">
            <Skeleton.Input active className="!w-32 !h-6 mb-4" />
            <Skeleton active paragraph={{ rows: 3 }} title={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
