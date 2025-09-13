import React from "react";

const ReviewCardSampler = ({ review }) => {
  const reviewerName = review?.reviewer?.name || "Anonymous";
  const reviewerImage = review?.reviewer?.profile_image;
  const productName = review?.product?.name;
  const productImage = review?.product?.images?.[0];
  const rating = review?.rating || 0;
  const description = review?.description;
  const date = review?.createdAt;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{ color: i < rating ? "#FFB400" : "#d3d3d3", fontSize: "16px" }}
      >
        ★
      </span>
    ));
  };

  return (
    <div
      style={{
        padding: "15px",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: "15px",
        color: "gray",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={reviewerImage}
          alt={reviewerName}
          className="rounded-full mr-3 w-12 h-12 object-cover"
        />
        <div className="flex justify-between items-center w-full">
          <div>
            <span style={{ fontWeight: "bold" }}>{reviewerName}</span>
            <div>{renderStars(rating)}</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div style={{ marginLeft: "auto", color: "#888" }}>
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <p style={{ margin: "10px 0", color: "#555" }}>{description}</p>

      {productImage && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={productImage}
            alt={productName}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "5px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <span>{productName}</span>
        </div>
      )}
    </div>
  );
};

export default ReviewCardSampler;
