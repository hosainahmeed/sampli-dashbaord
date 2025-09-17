import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Rate,
  Button,
  Modal,
  Divider,
  Skeleton,
} from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { ShareSocial } from "react-share-social";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { convertDate } from "../../Redux/main/server";
import { useGetReviewerCommentsQuery } from "../../Redux/sampler/reviewApis";
import CommentSection from "./CommentSection";

const { Title, Text } = Typography;

const FeedCard = ({ content, reviewLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const { data: reviewerComments, isLoading: reviewerCommentsLoading } =
    useGetReviewerCommentsQuery(
      {
        id: selectedComment?._id,
      },
      { skip: !selectedComment?._id }
    );
  const style = {
    header: {
      borderLeft: `5px solid `,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      boxShadow: "inset 0 0 5px #999",
      borderRadius: 5,
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };
  return (
    <Card className="w-full rounded-md shadow-xl">
      <div className="flex-center-between mb-10">
        <div className="flex">
          <Avatar size={40} src={content?.reviewer?.profile_image} />
          <div style={{ marginLeft: 10 }}>
            <Title level={5} style={{ margin: 0 }}>
              {content?.reviewer?.name}{" "}
              <Text type="secondary">
                {content?.reviewer?.username} •{" "}
                {convertDate(content?.createdAt)}
              </Text>
            </Title>
            <div className="flex items-center justify-center">
              <Rate
                disabled
                defaultValue={content?.rating}
                style={{ fontSize: 9, marginRight: 5 }}
              />
              <Text>{content?.rating}</Text>•
              <Text
                className="!text-black !underline"
                style={{ marginLeft: 10 }}
              >
                {content?.product?.name}
              </Text>
              <Text className="!ml-2 mt-1" style={{ color: "green" }}>
                ${content?.product?.price}
              </Text>
              <Text
                className="!text-black !underline"
                style={{ marginLeft: 10 }}
              >
                • {content?.category?.name}
              </Text>
            </div>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <Text>{content?.description}</Text>
      <div style={{ position: "relative" }}>
        <video
          src={content?.video}
          controls
          className="w-full rounded-3xl mt-4 overflow-hidden"
        />
      </div>
      <div className="mt-4">
        <Button
          className="!text-[#6D7486]"
          onClick={() => {
            setLike(!like);
            like ? toast.error("Unliked") : toast.success("Liked");
          }}
          type="text"
          icon={content?.isLike ? <FaHeart fill="red" /> : <CiHeart />}
        >
          <Text type="secondary">{content?.totalLikers}</Text>
        </Button>
        <Button
          className="!text-[#6D7486]"
          onClick={() => {
            setSelectedComment(content);
            setShowCommentModal(true);
          }}
          type="text"
          icon={<CommentOutlined />}
        >
          {content?.totalComments} comments
        </Button>
        <Button
          className="!text-[#6D7486]"
          onClick={() => setShowModal(!showModal)}
          type="text"
          icon={<RiShareForwardLine />}
        >
          Share
        </Button>
        <Modal
          title="Share this post"
          position="center"
          visible={showModal}
          onCancel={() => setShowModal(!showModal)}
          footer={null}
        >
          <ShareSocial
            url="url_to_share.com"
            style={{
              ...style,
              copyContainer: {
                border: "none",
              },
            }}
            socialTypes={[
              "facebook",
              "twitter",
              "reddit",
              "linkedin",
              "whatsapp",
              "email",
            ]}
            onSocialButtonClicked={(data) => console.log(data)}
          />
        </Modal>
      </div>
      <Modal
        title="Comments"
        width={600}
        centered
        visible={showCommentModal}
        onCancel={() => setShowCommentModal(false)}
        footer={null}
      >
        <div className="flex">
          <Avatar size={40} src={selectedComment?.reviewer?.profile_image} />
          <div style={{ marginLeft: 10 }}>
            <Title level={5} style={{ margin: 0 }}>
              {selectedComment?.reviewer?.name}{" "}
              <Text type="secondary">
                {selectedComment?.reviewer?.username} •{" "}
                {convertDate(selectedComment?.createdAt)}
              </Text>
            </Title>
            <div className="flex items-center justify-center">
              <Rate
                disabled
                defaultValue={selectedComment?.rating}
                style={{ fontSize: 9, marginRight: 5 }}
              />
              <Text>{selectedComment?.rating}</Text>•
              <Text
                className="!text-black !underline"
                style={{ marginLeft: 10 }}
              >
                {selectedComment?.product?.name}
              </Text>
              <Text className="!ml-2 mt-1" style={{ color: "green" }}>
                ${selectedComment?.product?.price}
              </Text>
              <Text
                className="!text-black !underline"
                style={{ marginLeft: 10 }}
              >
                • {selectedComment?.category?.name}
              </Text>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: 10 }}>
            <div style={{ position: "relative" }}>
              <video
                src={selectedComment?.video}
                controls
                className="w-full rounded-3xl mt-4 overflow-hidden"
              />
            </div>
            <Text style={{ marginTop: 10 }}>
              {selectedComment?.description}
            </Text>
          </div>
        </div>
        <Divider />
        <div className=" h-[300px] scrollbar-hide overflow-y-scroll">
          <CommentSection
            comments={reviewerComments?.data?.result}
            loading={reviewerCommentsLoading}
          />
        </div>
      </Modal>
    </Card>
  );
};

export default FeedCard;
