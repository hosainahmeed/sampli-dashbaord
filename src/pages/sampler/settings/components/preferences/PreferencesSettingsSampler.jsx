import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Input, message, Spin } from "antd";
import { Edit2 } from "lucide-react";
import facebookIcon from "../../../../../assets/socialsLogo/facebook.svg";
import instagramIcon from "../../../../../assets/socialsLogo/instragram.svg";
import tiktokIcon from "../../../../../assets/socialsLogo/tiktok.svg";
import webIcon from "../../../../../assets/socialsLogo/web.svg";
import whatsappIcon from "../../../../../assets/socialsLogo/whatsapp.svg";
import youtubeIcon from "../../../../../assets/socialsLogo/youtube.svg";
import {
  useGetReviewerProfileQuery,
  useUpdateReviewerProfileMutation,
} from "../../../../../Redux/sampler/reviewerProfileApis";

const PreferencesSettingsSampler = () => {
  const [openModal, setOpenModal] = useState("");

  const {
    data: reviewerProfilesData,
    isLoading,
    error,
  } = useGetReviewerProfileQuery();
  const [updateReviewerProfile, { isLoading: isUpdating }] =
    useUpdateReviewerProfileMutation();

  const [preferences, setPreferences] = useState({
    products: [],
    priceRanges: [],
    frequency: "Monthly",
    socialAccounts: {
      youtube: "",
      instagram: "",
      tiktok: "",
      whatsapp: "",
      web: "",
      facebook: "",
    },
  });

  const [tempPreferences, setTempPreferences] = useState(preferences);

  useEffect(() => {
    if (reviewerProfilesData?.data) {
      const profileData = reviewerProfilesData.data;

      const interestedProducts =
        profileData.interestedCategory?.map((cat) => cat.name) || [];

      const priceRange = [];
      if (
        profileData.minPriceForReview !== null &&
        profileData.maxPriceForReview !== null
      ) {
        const min = profileData.minPriceForReview;
        const max = profileData.maxPriceForReview;

        if (max < 25) priceRange.push("Under $25");
        else if (min >= 25 && max <= 50) priceRange.push("$25-$50");
        else if (min >= 50 && max <= 100) priceRange.push("$50-$100");
        else if (min >= 100 && max <= 250) priceRange.push("$100-$250");
        else if (min >= 250 && max <= 500) priceRange.push("$250-$500");
        else if (min >= 500) priceRange.push("$500+");
      }

      const frequencyMap = {
        Weekly: "Weekly",
        "Bi-Weekly": "Bi-Weekly",
        Monthly: "Monthly",
        Quarterly: "Quarterly",
      };

      const newPreferences = {
        products: interestedProducts,
        priceRanges: priceRange,
        frequency: frequencyMap[profileData.receiveProductBy],
        socialAccounts: {
          youtube: profileData.youtube || "",
          instagram: profileData.instagram || "",
          tiktok: profileData.tiktok || "",
          whatsapp: profileData.whatsapp || "",
          web: profileData.blog || "",
          facebook: profileData.facebook || "",
        },
      };

      setPreferences(newPreferences);
      setTempPreferences(newPreferences);
    }
  }, [reviewerProfilesData]);

  const productCategories = [
    "Tech & Electronics",
    "Home & Kitchen",
    "Fashion & Accessories",
    "Food & Beverages",
    "Beauty & Cosmetics",
    "Sports & Fitness",
    "Toys & Games",
    "Fish",
    "Human",
  ];

  const priceRanges = [
    "Under $25",
    "$25-$50",
    "$50-$100",
    "$100-$250",
    "$250-$500",
    "$500+",
  ];

  const frequencies = ["Weekly", "Bi-Weekly", "Monthly", "Quarterly"];

  const socialPlatforms = [
    { key: "facebook", label: facebookIcon },
    { key: "instagram", label: instagramIcon },
    { key: "tiktok", label: tiktokIcon },
    { key: "web", label: webIcon },
    { key: "whatsapp", label: whatsappIcon },
    { key: "youtube", label: youtubeIcon },
  ];

  const handleModalSave = async (type) => {
    try {
      let updateData = {};

      switch (type) {
        case "products":
          updateData = {};
          break;

        case "prices": {
          const priceRange = tempPreferences.priceRanges[0];
          if (priceRange === "Under $25") {
            updateData = { minPriceForReview: 0, maxPriceForReview: 24 };
          } else if (priceRange === "$25-$50") {
            updateData = { minPriceForReview: 25, maxPriceForReview: 50 };
          } else if (priceRange === "$50-$100") {
            updateData = { minPriceForReview: 50, maxPriceForReview: 100 };
          } else if (priceRange === "$100-$250") {
            updateData = { minPriceForReview: 100, maxPriceForReview: 250 };
          } else if (priceRange === "$250-$500") {
            updateData = { minPriceForReview: 250, maxPriceForReview: 500 };
          } else if (priceRange === "$500+") {
            updateData = { minPriceForReview: 500, maxPriceForReview: 999999 };
          }
          break;
        }

        case "frequency": {
          const frequencyMap = {
            Weekly: "Weekly",
            "Bi-Weekly": "Bi-Weekly",
            Monthly: "Monthly",
            Quarterly: "Quarterly",
          };
          updateData = {
            receiveProductBy: frequencyMap[tempPreferences.frequency],
          };
          break;
        }

        case "social":
          updateData = {
            youtube: tempPreferences.socialAccounts.youtube,
            instagram: tempPreferences.socialAccounts.instagram,
            tiktok: tempPreferences.socialAccounts.tiktok,
            whatsapp: tempPreferences.socialAccounts.whatsapp,
            blog: tempPreferences.socialAccounts.web,
            facebook: tempPreferences.socialAccounts.facebook,
          };
          break;
      }

      const result = await updateReviewerProfile({ data: updateData });

      if (result.error) {
        message.error("Failed to update preferences");
        return;
      }

      setPreferences(tempPreferences);
      setOpenModal("");
      message.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      message.error("Failed to update preferences");
    }
  };

  const handleModalCancel = () => {
    setTempPreferences(preferences);
    setOpenModal("");
  };

  const PreferenceSection = ({ title, items, type }) => (
    <section className="border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">{title}</h3>
        <button
          onClick={() => {
            setTempPreferences(preferences);
            setOpenModal(type);
          }}
          className="!text-blue-500 hover:!text-blue-800 flex items-center gap-2 cursor-pointer"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-gray-500 italic">No preferences set</span>
        )}
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load preferences. Please try again.
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Preferences</h2>

      <PreferenceSection
        title="What products interest you?"
        items={preferences.products}
        type="products"
      />

      <PreferenceSection
        title="Preferred price ranges to review"
        items={preferences.priceRanges}
        type="prices"
      />

      <section className="border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">
            How often would you like to receive products?
          </h3>
          <button
            onClick={() => setOpenModal("frequency")}
            className="!text-blue-500 hover:!text-blue-600 flex items-center gap-2 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {preferences.frequency}
          </span>
        </div>
      </section>

      <section className="border border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Linked Social accounts</h3>
          <button
            onClick={() => setOpenModal("social")}
            className="!text-blue-500 hover:!text-blue-600 flex items-center gap-2 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2 flex gap-3 flex-wrap">
          {reviewerProfilesData?.data &&
            Object.entries({
              youtube: reviewerProfilesData.data.youtube,
              instagram: reviewerProfilesData.data.instagram,
              tiktok: reviewerProfilesData.data.tiktok,
              whatsapp: reviewerProfilesData.data.whatsapp,
              web: reviewerProfilesData.data.blog,
              facebook: reviewerProfilesData.data.facebook,
            }).map(([platform, username]) => {
              const platformData = socialPlatforms.find(
                (p) => p.key === platform
              );
              return (
                username && (
                  <div
                    key={platform}
                    className="flex bg-gray-100 h-[30px] text-gray-800 px-3 py-1 rounded-full text-sm items-center gap-2"
                  >
                    <img
                      src={platformData?.label}
                      alt={platform}
                      className="w-6 h-6"
                    />
                    <span>:</span>
                    <span className="text-gray-600">{username}</span>
                  </div>
                )
              );
            })}
          {reviewerProfilesData?.data &&
            !Object.values({
              youtube: reviewerProfilesData.data.youtube,
              instagram: reviewerProfilesData.data.instagram,
              tiktok: reviewerProfilesData.data.tiktok,
              whatsapp: reviewerProfilesData.data.whatsapp,
              web: reviewerProfilesData.data.blog,
              facebook: reviewerProfilesData.data.facebook,
            }).some((val) => val) && (
              <span className="text-gray-500 italic">
                No social accounts linked
              </span>
            )}
        </div>
      </section>

      {/* Product Interests Modal */}
      <Modal
        title="Edit Preferences"
        open={openModal === "products"}
        onOk={() => handleModalSave("products")}
        onCancel={handleModalCancel}
        okText="Save"
        confirmLoading={isUpdating}
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          What products interest you?
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {productCategories.map((category) => (
            <div
              key={category}
              className="border border-gray-200 p-3 rounded-lg"
            >
              <Checkbox
                checked={tempPreferences.products.includes(category)}
                onChange={(e) => {
                  const newProducts = e.target.checked
                    ? [...tempPreferences.products, category]
                    : tempPreferences.products.filter((p) => p !== category);
                  setTempPreferences({
                    ...tempPreferences,
                    products: newProducts,
                  });
                }}
              >
                {category}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Price Ranges Modal */}
      <Modal
        title="Edit Price Ranges"
        open={openModal === "prices"}
        onOk={() => handleModalSave("prices")}
        onCancel={handleModalCancel}
        okText="Save"
        confirmLoading={isUpdating}
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          Preferred price ranges to review
        </h4>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range} className="border border-gray-200 p-3 rounded-lg">
              <Checkbox
                checked={tempPreferences.priceRanges.includes(range)}
                onChange={(e) => {
                  const newRanges = e.target.checked
                    ? [...tempPreferences.priceRanges, range]
                    : tempPreferences.priceRanges.filter((p) => p !== range);
                  setTempPreferences({
                    ...tempPreferences,
                    priceRanges: newRanges,
                  });
                }}
              >
                {range}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Frequency Modal */}
      <Modal
        title="Edit Frequency"
        open={openModal === "frequency"}
        onOk={() => handleModalSave("frequency")}
        onCancel={handleModalCancel}
        okText="Save"
        confirmLoading={isUpdating}
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          How often would you like to receive products?
        </h4>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <div key={freq} className="border border-gray-200 p-3 rounded-lg">
              <Checkbox
                checked={tempPreferences.frequency === freq}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTempPreferences({ ...tempPreferences, frequency: freq });
                  }
                }}
              >
                {freq}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Social Accounts Modal */}
      <Modal
        title="Edit Linked Socials"
        open={openModal === "social"}
        onOk={() => handleModalSave("social")}
        onCancel={handleModalCancel}
        okText="Save"
        confirmLoading={isUpdating}
        centered
      >
        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.key} className="space-y-1">
              <div className="flex gap-2 items-center justify-center">
                <div>
                  <img
                    src={platform.label}
                    alt={platform.key}
                    className="w-8 h-8"
                  />
                </div>
                <Input
                  value={tempPreferences.socialAccounts[platform.key]}
                  className="h-[40px]"
                  onChange={(e) => {
                    setTempPreferences({
                      ...tempPreferences,
                      socialAccounts: {
                        ...tempPreferences.socialAccounts,
                        [platform.key]: e.target.value,
                      },
                    });
                  }}
                  placeholder={`Enter your ${platform.key} username`}
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PreferencesSettingsSampler;
