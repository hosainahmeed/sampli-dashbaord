import React from "react";

const ReviewRating = ({ rating }) => {
  const totalReviews = Object.values(rating.starCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const ratingDistribution = {
    5: rating.starCounts.fiveStar || 0,
    4: rating.starCounts.fourStar || 0,
    3: rating.starCounts.threeStar || 0,
    2: rating.starCounts.twoStar || 0,
    1: rating.starCounts.oneStar || 0,
  };

  const getProgressWidth = (star) => {
    if (totalReviews === 0) return 0;
    return (ratingDistribution[star] / totalReviews) * 100;
  };

  return (
    <div className="!mt-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-4xl font-bold">{rating.averageRating.toFixed(1)}</span>
        <span>⭐</span>
        <span className="text-gray-600">
          ({totalReviews} {totalReviews === 1 ? "Review" : "Reviews"})
        </span>
      </div>

      <div>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="mb-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>{star} stars</span>
              <span>{ratingDistribution[star]}</span>
            </div>
            <div
              style={{
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${getProgressWidth(star)}%`,
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

export default ReviewRating;
