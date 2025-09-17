import React, { useState } from "react";
import { Card, Avatar, Typography, Rate, Button, Modal } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { ShareSocial } from "react-share-social";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const FeedCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
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
          <Avatar
            size={40}
            src="https://pbs.twimg.com/profile_images/1186757121024462848/IhsPGxGB_400x400.jpg"
          />
          <div style={{ marginLeft: 10 }}>
            <Title level={5} style={{ margin: 0 }}>
              Micheal Scott <Text type="secondary">@Mike67 • 23mins ago</Text>
            </Title>
            <div className="flex items-center justify-center">
              <Rate
                disabled
                defaultValue={2}
                style={{ fontSize: 9, marginRight: 5 }}
              />
              <h1>2.0</h1>•
              <h1 className="!text-black !underline" style={{ marginLeft: 10 }}>
                Natural Glow Serum
              </h1>
              <h1 className="!ml-2 mt-1" style={{ color: "green" }}>
                $25.00
              </h1>
              <h1 className="!text-black !underline" style={{ marginLeft: 10 }}>
                • Electronics
              </h1>
            </div>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <Text>
        I've been using this serum for a month and the results are amazing! My
        skin looks more radiant and the texture has improved significantly.
        Totally worth the price!
      </Text>
      <div style={{ position: "relative" }}>
        <video
          src="https://cdn.pixabay.com/video/2022/04/02/112651-695204705_large.mp4"
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
          icon={like ? <FaHeart fill="red" /> : <CiHeart />}
        >
          <Text type="secondary">23</Text>
        </Button>
        <Button
          className="!text-[#6D7486]"
          onClick={() => {
            setShowCommentModal(true);
          }}
          type="text"
          icon={<CommentOutlined />}
        >
          6 comments
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
        position="center"
        visible={showCommentModal}
        onCancel={() => setShowCommentModal(false)}
        footer={null}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: 10 }}>
            <div className="flex items-start">
              <div className="!w-[40px] bg-gray-400 !h-[20px] mr-2 rounded-full" />
              <div>
                <Title level={5} style={{ margin: 0 }}>
                  Micheal Scott{" "}
                  <Text type="secondary">@Mike67 • 23mins ago</Text>
                </Title>
                <Text>
                  I've been using this serum for a month and the results are
                  amazing! My skin looks more radiant and the texture has
                  improved significantly. Totally worth the price!
                </Text>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <video
                src="https://cdn.pixabay.com/video/2022/04/02/112651-695204705_large.mp4"
                controls
                className="w-full rounded-3xl mt-4 overflow-hidden"
              />
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default FeedCard;
