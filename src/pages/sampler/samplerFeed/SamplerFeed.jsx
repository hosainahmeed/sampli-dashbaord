import React, { useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Tabs,
  Rate,
  Modal,
  Dropdown,
  Tooltip,
  Upload,
  Spin,
  Skeleton,
  Empty,
} from "antd";
import {
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  MoreOutlined,
  SendOutlined,
  EllipsisOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import followingInactiveLogo from "../../../assets/feedLogo/following.svg";
import followingActiveLogo from "../../../assets/feedLogo/followingActive.svg";
import newLogo from "../../../assets/feedLogo/new.svg";
import newActiveLogo from "../../../assets/feedLogo/newActive.svg";
import popularActiveLogo from "../../../assets/feedLogo/popularActive.svg";
import popularInActiveLogo from "../../../assets/feedLogo/popularInactive.svg";
import { useCategorySectionApisQuery } from "../../../Redux/sampler/categoryApis";
import {
  useCreateCommentMutation,
  useGetAllReviewQuery,
  useGetReviewerLikersQuery,
  useChangeLikesMutation,
  useGetReviewerCommentsQuery,
  usePostCommentLikesMutation,
  useGetCommentsRepliesQuery,
  usePostCommentRepliesMutation,
} from "../../../Redux/sampler/reviewApis";
import { useAddToCartMutation } from "../../../Redux/sampler/cartApis";
import { useGetProfileApisQuery } from "../../../Redux/sampler/profileApis";
import { usePostFollowUnfollowMutation } from "../../../Redux/sampler/followUnfollowApis";

const { TabPane } = Tabs;

const SamplerFeed = () => {
  const { data: categoryList } = useCategorySectionApisQuery();
  const [activeCategory, setActiveCategory] = useState("");

  const [changeFollowUnfollow] = usePostFollowUnfollowMutation();

  const { data: getMyProfile, isLoading: myProfileLoading } =
    useGetProfileApisQuery();

  const profileData = getMyProfile?.data;

  const [showRepliesForComment, setShowRepliesForComment] = useState(null);

  const { data: getCommentReplies } = useGetCommentsRepliesQuery(
    {
      id: showRepliesForComment,
    },
    {
      skip: !showRepliesForComment,
    }
  );

  const [createComments] = useCreateCommentMutation();
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [postCommentLike] = usePostCommentLikesMutation();
  const [reviewId, setReviewId] = useState("");
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState(false);
  const { data: getReviewerLikers, isLoading: likersLoading } =
    useGetReviewerLikersQuery({
      id: reviewId,
    });

  const [limit, setLimit] = useState(10);

  const {
    data: getReviewComments,
    isLoading: commentsLoading,
    refetch,
  } = useGetReviewerCommentsQuery({
    id: reviewId,
    limit,
  });
  const [reviewLikeUnlike] = useChangeLikesMutation();
  const [postReplyChat] = usePostCommentRepliesMutation();

  const users = getReviewerLikers?.data?.result;

  const [activeTab, setActiveTab] = useState("");

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [following, setFollowing] = useState({});

  const { data: reviewList, isLoading: reviewLoading } = useGetAllReviewQuery({
    category: activeCategory,
    following: activeTab == "following" ? true : undefined,
    sortBy: activeTab != "popular" ? undefined : "totalView",
    sortOrder: activeTab != "popular" ? undefined : "desc",
  });
  const posts = reviewList?.data?.data?.result;

  const handleLike = async (postId) => {
    await reviewLikeUnlike({ id: postId });
  };

  const handleCommentLike = async (commentId) => {
    console.log(commentId);
    try {
      await postCommentLike({ id: commentId });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId) => {
    try {
      await createComments({
        data: { text: commentText, review: postId },
      });

      setCommentText("");
      setReplyingTo(null);
    } catch (error) {}
  };

  const handleFollow = async (id) => {
    try {
      const res = await changeFollowUnfollow(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const [addCart, { isLoading }] = useAddToCartMutation();

  const [isModalOpenLike, setIsModalOpenLike] = useState(false);
  const showModalLike = (id) => {
    setReviewId(id);
    setIsModalOpenLike(true);
  };
  const handleOkLike = () => {
    setIsModalOpenLike(false);
  };
  const handleCancelLike = () => {
    setIsModalOpenLike(false);
  };

  const [followStatus, setFollowStatus] = useState(
    users?.reduce((acc, user) => ({ ...acc, [user?._id]: false }), {})
  );

  const toggleFollow = (userId) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }));
  };

  const handleAllComments = (id) => {
    setComments((prev) => !prev);
    setReviewId(id);
  };

  const handleClickRepliesChat = (commentId) => {
    console.log(commentId);
    if (showRepliesForComment === commentId) {
      setShowRepliesForComment(null); // Hide if already showing
    } else {
      setShowRepliesForComment(commentId); // Show replies for this comment
    }
  };

  const moreOptions = [
    { key: "save", label: "Save Post" },
    { key: "report", label: "Report Post" },
    { key: "mute", label: "Mute User" },
  ];

  const handleReply = async (commentId) => {
    try {
      await postReplyChat({ data: { text: replyText, parent: commentId } });
      setReplyText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="responsive-width !mt-2 !mb-20 ">
      <div className=" bg-white flex justify-between items-start gap-10 max-lg:flex-col">
        {/* left side */}
        <div className="p-4 w-1/3  max-lg:w-full">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-4 ">
              <Avatar size={64} src={`${profileData?.profile_image}`} />
              <div className="mt-3">
                <h2 className="text-lg font-semibold">{profileData?.name}</h2>
                <p className="text-gray-500 text-sm">
                  @{profileData?.username}
                </p>
              </div>
            </div>
            <Link to={"/sampler/my-profile"} className="mb-5">
              <Button type="default">My Profile</Button>
            </Link>
          </div>

          <div className="flex justify-between text-center">
            <div>
              <div className="font-semibold ">
                {profileData?.totalFollowers}
              </div>
              <div className="text-gray-500 ">Reviews</div>
            </div>
            <div>
              <div className="font-semibold  ">
                {profileData?.totalFollowing}
              </div>
              <div className="text-gray-500 ">Followers</div>
            </div>
            <div>
              <div className="font-semibold  ">
                {profileData?.totalReferralSales}
              </div>
              <div className="text-gray-500 ">Referrals</div>
            </div>
          </div>
        </div>

        <div>{}</div>

        {/* right side */}
        <div className="w-2/3 max-lg:w-full">
          {/* Feed Tabs */}
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="!mt-5">
            <TabPane
              tab={
                <div className="flex gap-2">
                  {activeTab === "" ? (
                    <img src={newActiveLogo} alt="new active" />
                  ) : (
                    <img src={newLogo} alt="new inactive" />
                  )}
                  <span>New</span>
                </div>
              }
              key=""
            />
            <TabPane
              tab={
                <div className="flex gap-2">
                  {activeTab === "following" ? (
                    <img src={followingActiveLogo} alt="following active" />
                  ) : (
                    <img src={followingInactiveLogo} alt="following inactive" />
                  )}
                  <span>Following</span>
                </div>
              }
              key="following"
            />

            <TabPane
              tab={
                <div className="flex gap-2">
                  {activeTab === "popular" ? (
                    <img src={popularActiveLogo} alt="popular active" />
                  ) : (
                    <img src={popularInActiveLogo} alt="popular inactive" />
                  )}
                  <span>Popular</span>
                </div>
              }
              key="popular"
            />
          </Tabs>

          {/* Category Pills */}
          <div className="flex gap-2 py-4 overflow-x-auto mb-3 ">
            {categoryList?.data?.map((category) => (
              <Button
                key={category?._id}
                type={activeCategory === category?._id ? "primary" : "default"}
                className="!rounded-full !py-5"
                onClick={() => setActiveCategory(category?._id)}
              >
                {category?.name}
              </Button>
            ))}
          </div>

          {/* Skeleton */}
          {reviewLoading && (
            <div className="h-screen">
              <div className="shadow-md border border-gray-200 rounded-2xl p-5 mb-5 w-full ">
                {/* Header */}
                <div className="flex justify-between mb-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton.Avatar active size="large" shape="circle" />
                    <div>
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 120 }}
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 60 }}
                        />
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 40 }}
                        />
                      </div>
                    </div>
                  </div>
                  <Skeleton.Button active size="small" shape="round" />
                </div>

                <Skeleton paragraph={{ rows: 2 }} active />

                <div className="flex justify-between items-center mt-4 w-full">
                  <div className="flex gap-4">
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                  </div>
                  <Skeleton.Button active size="small" shape="round" />
                </div>
              </div>
              <div className="shadow-md border border-gray-200 rounded-2xl p-5 mb-5 w-full ">
                {/* Header */}
                <div className="flex justify-between mb-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton.Avatar active size="large" shape="circle" />
                    <div>
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 120 }}
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 60 }}
                        />
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 40 }}
                        />
                      </div>
                    </div>
                  </div>
                  <Skeleton.Button active size="small" shape="round" />
                </div>

                <Skeleton paragraph={{ rows: 2 }} active />

                <div className="flex justify-between items-center mt-4 w-full">
                  <div className="flex gap-4">
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                    <Skeleton.Button active size="small" shape="round" />
                  </div>
                  <Skeleton.Button active size="small" shape="round" />
                </div>
              </div>
            </div>
          )}

          <div>
            {posts?.length == 0 && (
              <div className="h-screen">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
          {/* Feed Posts */}
          <div className="space-y-4">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="shadow-md border border-gray-200 rounded-2xl p-5"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={post?.reviewer?.profile_image} />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {post?.reviewer?.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {post?.reviewer?.username}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          }).format(new Date(post?.createdAt))}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <Rate
                          disabled
                          defaultValue={post?.rating}
                          className="!text-[16px] !text-[#FD8240] "
                        />
                        <span className="text-gray-500">{post?.rating}</span>
                        <span className="text-gray-500">•</span>
                        <span className=" underline underline-offset-4 cursor-pointer">
                          {post?.product?.name}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-green-500">
                          {post?.product?.price}
                        </span>
                        <span className=" underline underline-offset-4 cursor-pointer">
                          /{post?.category?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!post?.isMyReview && (
                    <div className="flex items-center gap-2">
                      <Button
                        type={post?.reviewer?.isFollow ? "default" : "primary"}
                        // ghost
                        onClick={() => handleFollow(post?.reviewer?._id)}
                      >
                        {post?.reviewer?.isFollow ? "Following" : "Follow"}
                      </Button>
                    </div>
                  )}
                </div>

                <p className="!my-5 text-gray-700 ">{post?.description}</p>

                {post?.video && (
                  <div
                    className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isLoadingVideo && (
                        <div className="loader absolute">
                          <p className="text-gray-500">Loading video...</p>
                        </div>
                      )}

                      <video
                        src={post?.video}
                        controls
                        preload="metadata"
                        className="absolute inset-0 w-full h-full"
                        onLoadedData={() => setIsLoadingVideo(false)}
                      ></video>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 text-gray-500">
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-gray-500 cursor-pointer"
                      onClick={() => handleLike(post?._id)}
                    >
                      {post?.isLike == true ? (
                        <HeartFilled className="!text-red-500" />
                      ) : (
                        <HeartOutlined />
                      )}
                      {post?.totalLikers}
                    </button>
                    <button
                      className="flex items-center gap-1 text-gray-500 cursor-pointer"
                      onClick={() => handleAllComments(post?._id)}
                    >
                      <MessageOutlined />
                      {post?.totalComments}
                    </button>
                    <button
                      className="flex items-center gap-1 text-gray-500"
                      onClick={() => handleShare(post)}
                    >
                      <ShareAltOutlined />
                      Share
                    </button>
                  </div>
                  <Link
                    to={`/sampler/shop/category/${post?.product?.name}/${post?.product?._id}`}
                    className="border px-5 py-2 rounded-md border-blue-500 text-blue-500 hover: cursor-pointer"
                    state={{
                      referral: {
                        reviewerId: post?.reviewer?._id,
                        reviewId: post?._id,
                        amount: post?.product?.price,
                      },
                    }}
                  >
                    Add to cart
                  </Link>
                </div>

                {post?.totalLikers > 0 && (
                  <div
                    className="flex items-center space-x-2 mb-2 cursor-pointer"
                    onClick={() => showModalLike(post?._id)}
                  >
                    {post?.likers &&
                      post?.likers.length > 0 &&
                      post?.likers?.slice(0, 5).map((user, index) => (
                        <Tooltip
                          key={index}
                          title={user.name}
                          placement="top"
                          className={index !== 0 ? "-ml-4" : ""}
                        >
                          <div className="relative">
                            <Avatar
                              src={user?.profile_image}
                              size={30}
                              className="border-2 border-white "
                            />
                            <HeartFilled className="absolute bottom-0 right-0 !text-red-500 bg-white rounded-full text-[7px] p-1" />
                          </div>
                        </Tooltip>
                      ))}
                    {users && users?.length > 5 && (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 font-semibold">
                        {`+${users?.length - 5}`}
                      </div>
                    )}
                  </div>
                )}

                {/* Comment Input */}
                <div className="my-4 flex items-center gap-2">
                  <Avatar size="small" src={post?.reviewer?.profile_image} />
                  <Input
                    placeholder={
                      replyingTo ? "Write a reply..." : "Write a comment..."
                    }
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    suffix={
                      <div className="flex items-center gap-2">
                        <SendOutlined
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleComment(post?._id)}
                        />
                      </div>
                    }
                    onPressEnter={() => handleComment(post?._id)}
                  />
                </div>

                {/* Comments Section */}
                <div className="space-y-4">
                  {comments &&
                    getReviewComments?.data?.result.map((comment) => (
                      <div key={comment._id} className="pl-8 space-y-2">
                        <div className="flex items-start gap-2">
                          <Avatar
                            size="small"
                            src={comment?.commentorProfileImage}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {comment?.commentorName}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "2-digit",
                                }).format(new Date(comment?.createdAt))}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {comment?.text}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <button
                                className="!text-xs !text-gray-500 cursor-pointer flex gap-1"
                                onClick={() => handleCommentLike(comment._id)}
                              >
                                {comment?.isMyLike ? (
                                  <HeartFilled className="!text-red-500 !text-sm" />
                                ) : (
                                  <HeartOutlined />
                                )}
                                {comment?.totalLike}
                              </button>

                              <button
                                className="!text-xs !text-gray-500 cursor-pointer"
                                onClick={() => {
                                  setReplyingTo(comment?._id);
                                  setReplyText("");
                                }}
                              >
                                Reply
                              </button>
                            </div>

                            {/* Reply Input Field - Only show for the comment being replied to */}
                            {replyingTo === comment?._id && (
                              <div className="mt-3 flex items-center gap-2">
                                <Avatar
                                  size="small"
                                  src={post?.reviewer?.profile_image}
                                />
                                <Input
                                  placeholder="Write a reply..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  suffix={
                                    <div className="flex items-center gap-2">
                                      <SendOutlined
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() =>
                                          handleReply(comment?._id)
                                        }
                                      />
                                    </div>
                                  }
                                  onPressEnter={() => handleReply(comment?._id)}
                                  autoFocus
                                />
                              </div>
                            )}

                            {/* Show replies button */}
                            {comment?.totalReplies > 0 && (
                              <div
                                className="cursor-pointer text-sm mt-5 hover:text-blue-500"
                                onClick={() =>
                                  handleClickRepliesChat(comment?._id)
                                }
                              >
                                {showRepliesForComment === comment?._id
                                  ? `Hide ${comment?.totalReplies} replies`
                                  : `See ${comment?.totalReplies} replies`}
                              </div>
                            )}

                            {/* Only show replies for the specific comment that was clicked */}
                            {showRepliesForComment === comment?._id &&
                              getCommentReplies?.data?.result?.length > 0 &&
                              getCommentReplies?.data?.result.map((reply) => (
                                <div
                                  key={reply._id}
                                  className="ml-8 mt-3 p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-start gap-2">
                                    <Avatar
                                      size="small"
                                      src={reply?.commentorProfileImage}
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {reply?.commentorName}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                          {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                          }).format(new Date(reply?.createdAt))}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        {reply?.text}
                                      </p>
                                      <div className="flex items-center gap-4 mt-1">
                                        <button
                                          className="!text-xs !text-gray-500 cursor-pointer flex gap-1"
                                          onClick={() =>
                                            handleCommentLike(reply._id)
                                          }
                                        >
                                          {reply?.isMyLike ? (
                                            <HeartFilled className="!text-red-500 !text-sm" />
                                          ) : (
                                            <HeartOutlined />
                                          )}
                                          {reply?.totalLike}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  {comments && (
                    <div
                      onClick={() => {
                        setLimit((limit) => limit + 10);
                        refetch();
                      }}
                      className="cursor-pointer text-sm mt-5 hover:text-blue-500 text-end"
                    >
                      {getReviewComments?.data?.meta?.total > limit
                        ? "Load More"
                        : ""}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Modal */}
        <Modal
          title="Share Post"
          open={showShareModal}
          onCancel={() => setShowShareModal(false)}
          footer={null}
          centered
        >
          <div className="!space-y-4">
            <Button block icon={<ShareAltOutlined />}>
              Share to Feed
            </Button>
            <Button block>Copy Link</Button>
            <Button block>Share via Message</Button>
          </div>
        </Modal>

        {/* like modal */}
        {!likersLoading && (
          <Modal
            title={`Liked (${users?.length})`}
            open={isModalOpenLike}
            onOk={handleOkLike}
            onCancel={handleCancelLike}
            okButtonProps={{ style: { display: "none" } }}
            cancelButtonProps={{ style: { display: "none" } }}
            centered
          >
            <div className="flex flex-col space-y-4 text-gray-500 scroll-y-auto overflow-auto h-[50vh] ">
              {users?.map((user) => (
                <div
                  key={user?.id}
                  className="flex justify-between items-center space-x-4"
                >
                  <div className="flex items-center !space-x-3">
                    <Avatar
                      src={user?.profile_image}
                      size={50}
                      className="border-2 border-white"
                    />
                    <div>
                      <div className="text-sm font-medium flex-grow">
                        {user?.name}
                      </div>
                      <div className="flex gap-3 justify-center items-center">
                        <div className="text-sm font-medium flex-grow">
                          @{user?.username}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-sm font-medium border border-blue-200 px-4 py-1 rounded-full text-blue-600 cursor-pointer"
                    onClick={() => handleFollow(user?._id)}
                  >
                    Follow
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SamplerFeed;
