import React from "react";
import { useGetSingleProductReviewQuery } from "../../../../Redux/sampler/reviewApis";

const ReviewRatingSampler = ({ id }) => {
  const { data: getSingleProduct } = useGetSingleProductReviewQuery({ id });

  const fiveStar = getSingleProduct?.data?.starCounts?.fiveStar || 0;
  const fourStar = getSingleProduct?.data?.starCounts?.fourStar || 0;
  const threeStar = getSingleProduct?.data?.starCounts?.threeStar || 0;
  const twoStar = getSingleProduct?.data?.starCounts?.twoStar || 0;
  const oneStar = getSingleProduct?.data?.starCounts?.oneStar || 0;

  const totalReviews = getSingleProduct?.data?.meta?.total || 0;

  const starCount = [
    { stars: 5, count: fiveStar },
    { stars: 4, count: fourStar },
    { stars: 3, count: threeStar },
    { stars: 2, count: twoStar },
    { stars: 1, count: oneStar },
  ];

  const getProgressWidth = (count) => {
    if (!totalReviews) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="!text-gray-500">
      <div>
        <span className="text-4xl">
          {getSingleProduct?.data?.averageRating || 0}
        </span>
        <span>⭐</span>
        <span>({totalReviews} Reviews)</span>
      </div>

      {/* Rating Breakdown */}
      <div>
        {starCount.map(({ stars, count }) => (
          <div key={stars} style={{ marginBottom: "10px" }}>
            <span>{stars} stars</span>
            <div
              style={{
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                overflow: "hidden",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: `${getProgressWidth(count)}%`,
                  height: "100%",
                  backgroundColor: "#f57c00",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRatingSampler;
