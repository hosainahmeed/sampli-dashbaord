import React, { useState } from "react";
import { Steps, Button, Modal, Rate, Tabs, Upload, Progress } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { MdArrowBack } from "react-icons/md";
import toast from "react-hot-toast";
import Dragger from "antd/es/upload/Dragger";
import ReviewsVideo from "./ReviewsVideo";
import { GoLinkExternal } from "react-icons/go";
import phone from "../../../../../../assets/phone.svg";
import contact from "../../../../../../assets/contact.svg";
import shipping from "../../../../../../assets/shipping.svg";
import { useGetSingleOfferCampaignQuery } from "../../../../../../Redux/sampler/campaignApis";
import Loader from "../../../../../loader/Loader";
import {
  useCreateReviewMutation,
  useCreateUploadApisMutation,
} from "../../../../../../Redux/sampler/videoUploadApis";

const { Step } = Steps;

const OfferOrderDetails = ({ setIsClicked, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [finalVideoUrl, setFinalVideoUrl] = useState(false);

  const { data: geSingleCampaignOffer, isLoading: loadingSingleOffer } =
    useGetSingleOfferCampaignQuery({
      id,
    });

  console.log(geSingleCampaignOffer);

  const [createPresignedUrl, { isLoading: uploadLoading }] =
    useCreateUploadApisMutation();
  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!rating || !description || !thumbnailUrl || !id) {
      toast.error("Please fill all required fields and upload a video");
      return;
    }
    try {
      const data = {
        fileType: videoFile.type,
        fileCategory: "review_video",
      };
      const presignedResponse = await createPresignedUrl({ data }).unwrap();
      console.log(presignedResponse);

      const presignedUrl = presignedResponse.uploadURL;
      const finalVideoUrl = `https://sampli-bucket101.s3.us-west-2.amazonaws.com/${presignedResponse.fileName}`;

      setFinalVideoUrl(finalVideoUrl);

      await uploadToS3(presignedUrl, videoFile, finalVideoUrl);

      if (!rating || !description || !finalVideoUrl || !thumbnailUrl || !id) {
        toast.error("Please fill all required fields and upload a video");
        return;
      }

      try {
        const formData = new FormData();

        formData.append("thumbnail", thumbnailUrl);
        const data = {
          campaignOfferId: id,
          description: description,
          rating: rating,
          video: finalVideoUrl,
        };

        formData.append("data", JSON.stringify(data));

        await createReview(formData).unwrap();
        setIsModalOpen(false);
        toast.success("Review submitted successfully!");

        setRating(0);
        setDescription("");
        setThumbnailUrl("");
        setVideoFile(null);
        setFinalVideoUrl("");
        setUploadProgress(0);
      } catch (error) {
        toast.error("Failed to submit review");
        console.error("Review submission error:", error);
      }
    } catch (error) {
      toast.error("Failed to upload video");
      console.error("Video upload error:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRating(0);
    setDescription("");
    setThumbnailUrl("");
    setVideoFile(null);
    setVideoUrl("");
    setUploadProgress(0);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleThumbnailChange = async (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const fileObj = info.file.originFileObj;
      if (fileObj) {
        const previewUrl = URL.createObjectURL(fileObj);
        setThumbnailUrl(previewUrl);
      }
    }

    if (info.file.status === "error") {
      console.error("Upload error:", info.file.error || info.file.response);
    }
  };

  const handleVideoUpload = (file) => {
    console.log(file);
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      toast.error("Please upload a video file!");
      return false;
    }

    const isLt1GB = file.size / 1024 / 1024 / 1024 < 1;
    if (!isLt1GB) {
      toast.error("Video must be smaller than 1GB!");
      return false;
    }

    setVideoFile(file);
    setUploadProgress(0);

    return false;
  };

  const uploadToS3 = async (presignedUrl, file, finalUrl) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const uploadWithProgress = () => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round(
                (event.loaded / event.total) * 100
              );
              setUploadProgress(percentComplete);
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
              resolve(xhr);
            } else {
              reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
          });

          xhr.addEventListener("error", () => {
            reject(new Error("Upload failed"));
          });

          xhr.addEventListener("abort", () => {
            reject(new Error("Upload aborted"));
          });

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      };

      const response = await uploadWithProgress();

      console.log(response);

      if (response.status !== 200) {
        throw new Error("Failed to upload to S3");
      }

      setIsUploading(false);
      setUploadProgress(100);
    } catch (error) {
      console.error("S3 upload error:", error);
      toast.error("Failed to upload to S3");
      setIsUploading(false);
      setUploadProgress(0);
      throw error;
    }
  };

  const videoUploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: handleVideoUpload,
    showUploadList: false,
    accept: "video/*",
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Item Details",
      children: (
        <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-sm text-gray-500">
                <strong className="text-black">Order date</strong>
                <div className="mt-1">
                  {geSingleCampaignOffer?.data?.createdAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      }).format(
                        new Date(geSingleCampaignOffer?.data?.createdAt)
                      )
                    : "-"}
                </div>
              </div>
              <div>
                <strong className="text-black text-sm">Status</strong>
                <div>
                  <span className="rounded-full">
                    {geSingleCampaignOffer?.data?.deliveryStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="text-sm text-gray-500">
                <strong className="text-black">Reward</strong>
                <div className="mt-1">
                  ${geSingleCampaignOffer?.data?.campaign?.amountForEachReview}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-start justify-between">
            <div className="flex gap-2">
              <img
                src={geSingleCampaignOffer?.data?.product?.images?.[0]}
                alt="Product"
                className="w-24 h-24 object-cover"
              />
              <div>
                <h3 className="text-md font-semibold !mb-4">
                  {geSingleCampaignOffer?.data?.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <strong className="text-black">
                    ${geSingleCampaignOffer?.data?.amount}
                  </strong>
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <button className="border flex items-center gap-2 text-nowrap !text-[14px] hover:bg-gray-100 cursor-pointer border-blue-500 px-3 py-1 !text-blue-500 rounded-md">
                  Track Item
                  <GoLinkExternal className="text-blue-700" />
                </button>
                <Button
                  className="!bg-blue-500 !text-white"
                  onClick={showModal}
                >
                  Upload Review
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold">Order History</h4>
            <Steps current={1} direction="vertical" className="mt-4">
              <Step
                title="Order reviewing"
                description="23, Oct 2023"
                icon={<ShoppingCartOutlined className="!text-green-500" />}
              />
              <Step
                title="Processing order"
                description="Pending"
                icon={<CheckCircleOutlined className="!text-green-500" />}
              />
              <Step
                title="Item shipped"
                description="Pending"
                icon={<CheckCircleOutlined />}
              />
              <Step
                title="Delivered"
                description="Pending"
                icon={<CheckCircleOutlined />}
              />
            </Steps>
          </div>

          <h4 className="font-semibold text-xl !mb-5">Shipping Information</h4>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-start gap-2">
              <img src={phone} alt="contact" className="w-[20px]" />
              <div>
                <h5 className="font-medium">Contact Information</h5>
                <p className="text-sm text-gray-500">Micheal@gmail.com</p>
                <p className="text-sm text-gray-500">+123 456 7890</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={shipping} alt="contact" className="w-[30px]" />
              <div>
                <h5 className="font-xl">Shipping Address</h5>
                <p className="text-sm text-gray-500">Maurice Swift</p>
                <p className="text-sm text-gray-500">
                  36 Moses A Ebitu road, SPG LEKKI-AGUNGI, Lagos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={contact} alt="contact" className="w-[30px]" />
              <div>
                <h5 className="font-xl">Shipping Method</h5>
                <p className="text-sm text-gray-500">Door Delivery</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Reviews",
      children: <ReviewsVideo showModal={showModal} />,
    },
  ];

  return (
    <div className="pb-10">
      <div
        className="text-gray-500 flex gap-1 cursor-pointer mt-1 mb-5 hover:text-gray-600"
        onClick={() => setIsClicked(false)}
      >
        <MdArrowBack />
        Back
      </div>

      {loadingSingleOffer ? (
        <div className="h-screen">
          <Loader />
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      )}

      <Modal
        title={<div className="text-xl">Submit review</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        confirmLoading={reviewLoading}
        centered
        okText={<div className="w-full">Submit Review</div>}
        width={600}
      >
        <p className="text-center font-bold text-xl !mt-5">
          Your Review Awaits
        </p>
        <p className="text-gray-500 text-center text-[14px]">
          Your review helps others make informed decisions and improves the
          product. Please share your honest opinion.
        </p>

        <p className="font-bold mt-4">Rating *</p>
        <div className="flex justify-center items-center">
          <Rate
            value={rating}
            onChange={setRating}
            style={{
              fontSize: 40,
              borderColor: "#D9D9D9",
            }}
          />
        </div>

        <p className="font-bold mt-4">Thumbnail</p>
        <div className="w-full">
          <Upload
            name="thumbnail"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleThumbnailChange}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="avatar"
                className="w-full h-full object-contain rounded-md"
                style={{ maxHeight: 200 }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
              </div>
            )}
          </Upload>
        </div>

        <div className="font-bold !mb-1 mt-4">Upload Video *</div>
        <Dragger {...videoUploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {videoFile ? `Selected: ${videoFile.name}` : "Upload video file"}
          </p>
          <p className="ant-upload-hint">
            MP4, MPEG-4, MOV - Max file size 1GB
          </p>
        </Dragger>

        {isUploading && (
          <div className="mt-4">
            <Progress
              percent={uploadProgress}
              status={uploadProgress === 100 ? "success" : "active"}
              showInfo={true}
            />
            <p className="text-center text-sm text-gray-500 mt-2">
              Uploading video... {uploadProgress}%
            </p>
          </div>
        )}

        {videoUrl && !isUploading && (
          <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 text-sm">
              ✅ Video uploaded successfully!
            </p>
          </div>
        )}

        <p className="font-bold !mt-4">Talk more about the product *</p>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="5"
          className="p-5 !mt-0 w-full border outline-none border-gray-200 rounded-2xl"
          placeholder="Write your review here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </Modal>
    </div>
  );
};

export default OfferOrderDetails;
