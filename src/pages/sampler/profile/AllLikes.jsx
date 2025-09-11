import React from "react";
import { useGetMyLikesQuery } from "../../../Redux/sampler/profileApis";

const AllLikes = () => {
  const { data: likes } = useGetMyLikesQuery();
  const likesData = likes?.data?.result;
  return <div>AllLikes</div>;
};

export default AllLikes;
