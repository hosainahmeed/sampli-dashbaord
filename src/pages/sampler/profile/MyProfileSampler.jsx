import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaRegComment,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileReviewsVideo from "./ProfileReviewsVideo";
import { useGetProfileApisQuery } from "../../../Redux/sampler/profileApis";
import { Tabs } from "antd";
import { CiStar } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import AllLikes from "./allLikes";
import AllComments from "./AllComments";

const MyProfileSampler = () => {
  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2">
          <CiStar className=" text-2xl" /> Reviews
        </div>
      ),
      children: <ProfileReviewsVideo />,
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <FaRegComment className=" text-xl" /> Comments
        </div>
      ),
      children: <AllComments />,
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2">
          <AiOutlineLike className=" text-2xl" /> Liked
        </div>
      ),
      children: <AllLikes />,
    },
  ];
  const { data: profileData, isLoading } = useGetProfileApisQuery();
  const profile = profileData?.data;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="responsive-width !mb-32">
      <div className="mx-auto bg-white p-6 text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 ">
            <div>
              <img
                src={`${profile?.profile_image}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-center object-cover"
              />
            </div>
            <div className="leading-0">
              <p className="text-xl font-semibold">{profile?.name}</p>
              <p className="text-gray-500">@{profile?.username}</p>
              <p className="text-sm text-gray-500">
                {profile?.totalFollowers} followers •{" "}
                {profile?.totalFollowing} following
              </p>
            </div>
          </div>
          <Link
            to={"/sampler/settings/basic-details-settings-sampler"}
            className="border border-gray-200 !text-sm hover:bg-gray-100 cursor-pointer   px-4 py-2 rounded-lg "
          >
            Edit Profile
          </Link>
        </div>
        <p className="!mt-2 text-gray-700 text-sm">{profile?.bio}</p>
        <div className="flex items-center gap-2 text-2xl">
          {profile?.instagram && (
            <FaInstagram
              onClick={() => {
                window.open(
                  `https://www.instagram.com/${profile?.instagram}`,
                  "_blank"
                );
              }}
              className=" text-pink-500  cursor-pointer"
            />
          )}
          {profile?.facebook && (
            <FaFacebook
              onClick={() => {
                window.open(
                  `https://www.facebook.com/${profile?.facebook}`,
                  "_blank"
                );
              }}
              className=" text-blue-700 cursor-pointer"
            />
          )}
          {profile?.twitter && (
            <FaTwitter
              onClick={() => {
                window.open(
                  `https://www.twitter.com/${profile?.twitter}`,
                  "_blank"
                );
              }}
              className=" text-blue-500 cursor-pointer"
            />
          )}
          {profile?.youtube && (
            <FaYoutube
              onClick={() => {
                window.open(
                  `https://www.youtube.com/channel/${profile?.youtube}`,
                  "_blank"
                );
              }}
              className=" text-red-500 cursor-pointer"
            />
          )}
          {profile?.whatsapp && (
            <FaWhatsapp
              onClick={() => {
                window.open(`https://wa.me/${profile?.whatsapp}`, "_blank");
              }}
              className=" text-green-500 cursor-pointer"
            />
          )}
        </div>

        <div className="mt-10">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default MyProfileSampler;
