import { Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileApisMutation } from "../../../../Redux/sampler/profileApis";

const AddYourSocials = ({ prev }) => {
  const [form] = Form.useForm();
  const Navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileApisMutation();

  const handleFormSubmit = async (values) => {
    const hasAtLeastOneSocial = Object.values(values).some((val) =>
      val?.trim()
    );
    if (!hasAtLeastOneSocial) {
      toast.error("Please add at least one social media username.");
      return;
    }
    try {
      await updateProfile(values).unwrap();
      toast.success("Socials have been uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to update your socials");
      throw error;
    }
    console.log("Submitted Values:", values);
    Navigate("/sampler/campaign");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="p-6"
      requiredMark={false}
    >
      <div className="flex justify-between flex-col h-[500px] ">
        <div>
          <p className="pb-5 text-2xl text-center font-bold">
            Add your socials (OPTIONAL)
          </p>
          <div className="flex flex-col space-y-4">
            <Form.Item name="instagram" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillInstagram size={24} className="text-pink-600" />
                <Input placeholder="Instagram username" />
              </div>
            </Form.Item>
            <Form.Item name="twitter" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillTwitterCircle size={24} className="text-blue-400" />
                <Input placeholder="Twitter username" />
              </div>
            </Form.Item>
            <Form.Item name="youtube" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillYoutube size={24} className="text-red-600" />
                <Input placeholder="YouTube Channel" />
              </div>
            </Form.Item>
            <Form.Item name="tiktok" className="w-full">
              <div className="flex items-center space-x-3">
                <FaTiktok size={24} className="text-black" />
                <Input placeholder="TikTok Username" />
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-between text-[16px]">
          <button
            type="button"
            onClick={prev}
            className="cursor-pointer hover:!text-blue-500"
          >
            Back
          </button>
          <button type="submit" className="cursor-pointer hover:!text-blue-500">
            {isLoading ? "Uploading..." : "Next"}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default AddYourSocials;
