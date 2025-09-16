import React from "react";
import Navbar from "../../samplerLayout/SamplerLayout";
import { useGetProfileApisQuery } from "../../../../Redux/sampler/profileApis";

const HeaderSampler = () => {
  const { data: getMyProfile } = useGetProfileApisQuery();
  console.log(getMyProfile);
  return (
    <div>
      {/* <Navbar /> */}
      <h1 className="text-[32px]">Hi {getMyProfile?.data?.name}</h1>
      <p className="text-gray-600 text-md">
        {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date())}
      </p>
    </div>
  );
};

export default HeaderSampler;
