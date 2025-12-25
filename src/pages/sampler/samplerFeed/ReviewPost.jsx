import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Input,
  Tooltip,
  Typography,
  Rate,
  Space,
  Divider,
} from "antd";
import {
  ShareAltOutlined,
  HeartFilled,
  MessageOutlined,
} from "@ant-design/icons";

import Spinner from "../../../components/ui/Spinner";
import { renderImage } from "./renderImage";
import CommentsModal from "./CommentsModal";
import PostActions from "./PostActions";
import PostLikesPreview from "./PostLikesPreview";
import {
  useChangeLikesMutation,
  useGetReviewerLikersQuery,
} from "../../../Redux/sampler/reviewApis";
import PostLikerModal from "./PostLikerModal";

const { Title, Text } = Typography;

const ReviewPost = memo((props) => {
  const {
    post: initialPost,
    isFetching,
    onFollow,
    onShare,
    onPostAction,
    isFollowing
  } = props;

  const [post, setPost] = useState(initialPost);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [postId, setPostId] = useState(null);

  const [reviewLikeUnlike] = useChangeLikesMutation();
  const { data: likersData, isLoading: likersLoading } = useGetReviewerLikersQuery(
    {
      id: initialPost?._id,
    },
    {
      skip: !initialPost?._id,
    }
  );
  console.log(likersData)
  // Sync local state with props
  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const handleLike = useCallback(async () => {
    if (isLikeLoading || !post?._id) return;

    setIsLikeLoading(true);
    const previousState = { ...post };

    try {
      // Optimistic update
      setPost((prev) => ({
        ...prev,
        isLike: !prev.isLike,
        totalLikers: prev.isLike
          ? Math.max(0, prev.totalLikers - 1)
          : prev.totalLikers + 1,
      }));

      await reviewLikeUnlike({ id: post._id });
      onPostAction?.("like", post._id);
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert on error
      setPost(previousState);
    } finally {
      setIsLikeLoading(false);
    }
  }, [isLikeLoading, post, reviewLikeUnlike, onPostAction]);

  const handleShare = useCallback(() => {
    onShare?.(post);
  }, [post, onShare]);

  const handleFollow = useCallback(() => {
    onFollow?.(post.reviewer?._id);
  }, [post, onFollow]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: diffDays > 365 ? "numeric" : undefined,
    }).format(date);
  }, []);

  const renderProductInfo = () => (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Rate
        disabled
        value={post?.rating}
        allowHalf
        className="text-yellow-500"
        style={{ fontSize: 14 }}
      />
      <Text className="font-medium">{post?.rating}</Text>
      <Divider type="vertical" />
      <Text className="text-blue-600 hover:underline cursor-pointer">
        {post?.product?.name}
      </Text>
      <Divider type="vertical" />
      <Text className="text-green-600 font-semibold">
        ${parseFloat(post?.product?.price || 0).toFixed(2)}
      </Text>
    </div>
  );

  const renderVideo = () => {
    if (!post?.video) return null;

    return (
      <div className="relative rounded-xl overflow-hidden bg-black my-4">
        <video
          src={post.video}
          controls
          preload="metadata"
          className="w-full max-h-[500px]  aspect-video object-contain"
          controlsList="nodownload"
          playsInline
          poster={post?.thumbnail}
          onLoadedData={() => setIsVideoLoading(false)}
          onError={() => setIsVideoLoading(false)}
        >
          <track kind="captions" />
        </video>

        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Spinner size="large" />
          </div>
        )}
      </div>
    );
  };

  const renderImages = () => {
    if (!post?.images?.length) return null;

    return <div className="my-4">{renderImage(post.images)}</div>;
  };

  const renderAddToCart = () => (
    <Link
      to={`/sampler/shop/category/${encodeURIComponent(
        post?.product?.name || ""
      )}/${post?.product?._id}`}
      state={{
        referral: {
          reviewerId: post?.reviewer?._id,
          reviewId: post?._id,
          amount: post?.product?.price,
        },
      }}
      className="block"
    >
      <Button
        type="primary"
        className="flex items-center gap-2 hover:scale-105 transition-transform"
        size="large"
        shape="round"
      >
        <span className="font-medium">View Details</span>
      </Button>
    </Link>
  );

  return (
    <Card
      className="review-post-card !border-gray-200 !shadow-sm hover:!shadow-md transition-shadow duration-300"
      bodyStyle={{ padding: "16px 20px" }}
    >
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <Avatar
            src={post?.reviewer?.profile_image}
            size={56}
            className="border-2 border-white shadow-sm"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={`/profile/${post?.reviewer?.username}`}
                className="hover:underline"
              >
                <Title level={5} className="!mb-0 !text-gray-900">
                  {post?.reviewer?.name}
                </Title>
              </Link>
              <Text type="secondary" className="text-sm">
                @{post?.reviewer?.username}
              </Text>
              <Text type="secondary" className="text-sm">
                • {formatDate(post?.createdAt)}
              </Text>
            </div>

            {renderProductInfo()}

            <Text type="secondary" className="text-sm">
              in <span className="text-blue-600">{post?.category?.name}</span>
            </Text>
          </div>
        </div>

        <Space className="post-actions">
          {!post?.isMyReview && (
            <Button
              type={post?.reviewer?.isFollow ? "default" : "primary"}
              size="small"
              onClick={handleFollow}
              className="font-medium"
              loading={isFollowing}
            >
              {post?.reviewer?.isFollow ? "Following" : "Follow"}
            </Button>
          )}
        </Space>
      </div>

      {/* Post Content */}
      <div className="post-content mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post?.description}
        </p>

        {renderVideo()}
        {renderImages()}
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            onClick={() => setShowLikesModal(true)}
          >
            <HeartFilled className="text-red-500" />
            <span>{post?.totalLikers || 0}</span>
          </button>
          <button
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            onClick={() => setShowComments(true)}
          >
            <MessageOutlined />
            <span>{post?.totalComments || 0} comments</span>
          </button>
          <button
            className="flex items-center gap-1 hover:text-green-500 transition-colors"
            onClick={handleShare}
          >
            <ShareAltOutlined />
            <span>Share</span>
          </button>
        </div>

        <div className="text-xs text-gray-400">
          {post?.views ? `${post.views.toLocaleString()} views` : ""}
        </div>
      </div>

      {/* Post Actions */}
      <Divider className="!my-3" />
      <PostActions
        post={post}
        onLike={handleLike}
        onComment={() => setShowComments(true)}
        onShare={handleShare}
        isLikeLoading={isLikeLoading}
      />

      {/* Likes Preview */}
      {post?.totalLikers > 0 && (
        <PostLikesPreview
          id={post?._id}
          likers={likersData?.data?.result || []}
          totalLikers={post.totalLikers}
          onShowAll={(id) => {
            setPostId(id)
            setShowLikesModal(true);
          }}
          likersLoading={likersLoading}
        />
      )}

      {/* Comment Input */}
      <div className="mt-4 flex items-center gap-3">
        <Avatar
          src={post?.reviewer?.profile_image}
          size={36}
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <Input
            placeholder="Write a comment..."
            onClick={() => setShowComments(true)}
            readOnly
            className="rounded-full hover:bg-gray-50 cursor-pointer"
            suffix={
              <Button
                type="text"
                icon={<MessageOutlined />}
                className="!text-gray-400"
              />
            }
          />
        </div>
        {renderAddToCart()}
      </div>

      {/* Modals */}
      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        post={post}
      />
      <PostLikerModal
        visible={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        postId={postId}
      />

      {/* Add Likes Modal component here */}
    </Card>
  );
});

ReviewPost.displayName = "ReviewPost";

export default ReviewPost;