import React, { use, useEffect, useState } from "react";
import { FaCircleChevronRight } from "react-icons/fa6";
import { Modal, Input, Button, Upload, message } from "antd";
import toast from "react-hot-toast";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
} from "../../../../../Redux/sampler/shippingAddressApis";
import ContactAndShipping from "./ContactAndShipping";
import {
  useGetReviewerProfileQuery,
  useUpdateReviewerProfileMutation,
} from "../../../../../Redux/sampler/reviewerProfileApis";

const BasicDetailsSettingsSampler = () => {
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const { data: getAllShippingAddress } = useGetShippingAddressQuery();
  const [updateShipping] = useUpdateShippingAddressMutation();
  const { data: getReviewerData } = useGetReviewerProfileQuery();
  const [updateReviewerProfile, { isLoading: isUpdating }] =
    useUpdateReviewerProfileMutation();

  const [username, setUsername] = useState(
    getReviewerData?.data?.username || ""
  );
  const [name, setName] = useState(getReviewerData?.data?.name || "");
  const [bio, setBio] = useState(getReviewerData?.data?.bio || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (getReviewerData?.data) {
      const profileData = getReviewerData.data;
      setUsername(profileData.username);
      setName(profileData.name);
      setBio(profileData.bio);
    }
  }, [getReviewerData]);

  const handleSavePhoto = () => {
    setShowPhotoModal(false);
    toast.success("Photo selected!");
  };

  const handleInfoUpdate = async () => {
    try {
      const formData = new FormData();
      setShowPhotoModal(false);

      if (imageFile) {
        formData.append("profile_image", imageFile);
      }

      formData.append(
        "data",
        JSON.stringify({
          name,
          bio,
        })
      );

      await updateReviewerProfile({ data: formData }).unwrap();
      toast.success("Info updated successfully!");
    } catch (error) {
      toast.error("Update failed. Try again!");
    }
  };

  const handleImageChange = (info) => {
    if (info.file) {
      const isJpgOrPng =
        info.file.type === "image/jpeg" || info.file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
        return;
      }
      const isLt2M = info.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return;
      }
      setImageFile(info.file);
      setImagePreview(URL.createObjectURL(info.file));
    }
  };

  return (
    <div className="!pb-20 h-[96vh] overflow-auto scrollbar-none">
      {/* Basic Details Section */}
      <div className="rounded-lg">
        <div className="flex justify-between mt-1 border-b border-gray-200 pb-2">
          <h2 className="text-2xl font-medium">Basic Information</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={
                      getReviewerData?.data?.profile_image ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <button
                onClick={() => setShowPhotoModal(true)}
                className="!text-sm cursor-pointer !font-medium border !text-black  !bg-white !border-gray-200 px-4 py-2 rounded-lg"
              >
                Upload photo
              </button>
            </div>
            <p className="text-xs text-gray-500">Recommended size 400×400px</p>
          </div>
        </div>

        <div className="border border-gray-200 p-5">
          <div className="mb-6">
            <h3 className="text-lg font-medium py-4 border-b border-gray-200">
              Info
            </h3>
            <div
              className="flex justify-between items-center py-2 rounded-md mb-3 cursor-disabled hover:bg-gray-50 "
              // onClick={() => setShowUsernameModal(true)}
            >
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-sm">{username}</p>
              </div>
              <FaCircleChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="text-sm">
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <Input
                  type="text"
                  className="w-full text-sm p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm">
              <p className="text-sm text-gray-600 mb-1">About</p>
              <textarea
                className="w-full p-2 border rounded-md h-32 border-gray-200 outline-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleInfoUpdate}
              type="primary"
              loading={isUpdating}
              className="!text-white px-4 py-2 rounded-md !text-sm font-medium !mt-6"
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Contact & Shipping Information */}
      <ContactAndShipping />

      {/* Username Change Modal */}
      <Modal
        title="Change Username"
        open={showUsernameModal}
        onCancel={() => setShowUsernameModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowUsernameModal(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => {
              setUsername(username);
              setShowUsernameModal(false);
            }}
          >
            Save
          </Button>,
        ]}
        centered
      >
        <p className="text-xs text-gray-500 mb-4">
          Your new username will be visible to all users.
        </p>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
        />
      </Modal>

      {/* Photo Update Modal */}
      <Modal
        title="Update Photo"
        open={showPhotoModal}
        onCancel={() => setShowPhotoModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPhotoModal(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleInfoUpdate}>
            Save
          </Button>,
        ]}
        centered
      >
        <div className="flex flex-col items-center">
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            onChange={handleImageChange}
            beforeUpload={() => false}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                style={{ width: "100px" }}
              />
            ) : (
              <div className="w-[100px]">
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
          <p className="text-xs text-gray-500 !mt-2">Max file size: 2MB</p>
        </div>
      </Modal>
    </div>
  );
};

export default BasicDetailsSettingsSampler;
