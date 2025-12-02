import { Checkbox } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAddCurrentlyShareReviewerMutation } from "../../../../Redux/sampler/authSectionApis";

const ReviewPlatforms = ({ prev, next }) => {
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [addCurrentlyShare, { isLoading }] =
    useAddCurrentlyShareReviewerMutation();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedReviews((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async () => {
    if (selectedReviews.length === 0) {
      toast.error("Please select at least one platform before proceeding.");
      return;
    }
    try {
      const res = await addCurrentlyShare({
        currentlyShareReview: selectedReviews,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        next();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="">
      <p className="pb-4 text-2xl text-center font-semibold">
        Where do you currently share reviews?
      </p>
      <div className="flex flex-col justify-between h-[425px]">
        <div className="grid grid-cols-2 gap-4">
          {["Youtube", "TikTok", "Instagram", "Blog", "WhatsApp"].map(
            (platform) => (
              <div
                key={platform}
                className="p-5 border border-gray-500 cursor-pointer"
              >
                <Checkbox value={platform} onChange={handleCheckboxChange}>
                  {platform}
                </Checkbox>
              </div>
            )
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={prev}
            className="cursor-pointer hover:!text-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer hover:!text-blue-500"
          >
            {isLoading ? "Loading..." : " Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPlatforms;
