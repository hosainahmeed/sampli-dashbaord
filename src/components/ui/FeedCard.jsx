import React from "react";
import { Card, Avatar, Typography, Rate, Tag, Button } from "antd";
import {
  PlayCircleOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { BsThreeDots } from "react-icons/bs";

const { Title, Text } = Typography;

const FeedCard = () => {
  return (
    <Card className="w-full rounded-md shadow-xl">
      <div className="flex-center-between mb-10">
        <div className="flex">
          <Avatar
            size={40}
            src="https://s3-alpha-sig.figma.com/img/7f36/c473/8c30b8c2cb4b1e422e50c8bfb0c3152a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tfqMTk4GvOi5dEvl1Ohb-GZJi7c7wVVA60Q6z6mzwHm-c2aWOoiVkwKTV0Xgg9eE4W47Y4~5lOZcOUAjp-ksjbj5VoSYnGmLunCg739HOOPnWT5rqpvdZmnYio7h-jrvCnyElpQR-aiI0Jaljd8Dnxr9hhjLcJKV9YrGFq7~CtRMI8mcNmyZ6ACx23oNv71R2uAKzF2bzxON~agPw738H1MdvOygvpzpye-X1qoF0yp6USLneUUBBCHtBR7zdM871cLzSulDDQyzW-Q71LQJpPGzaqKi7sqij8c80W-ASZTQeYQ9GNn5i~-vL0GoG8ObsyHClRq~pH6yaBORI87WIw__"
          />
          <div style={{ marginLeft: 10 }}>
            <Title level={5} style={{ margin: 0 }}>
              Micheal Scott <Text type="secondary">@Mike67 • 23mins ago</Text>
            </Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rate
                disabled
                defaultValue={2}
                style={{ fontSize: 14, marginRight: 5 }}
              />
              <Text strong>5.0</Text>
              <Tag color="blue" style={{ marginLeft: 10 }}>
                Natural Glow Serum
              </Tag>
              <Text strong style={{ color: "green", marginLeft: 5 }}>
                $25.00
              </Text>
              <Text type="secondary" style={{ marginLeft: 10 }}>
                • Electronics
              </Text>
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
          src="/path-to-video.mp4"
          controls
          className="w-full rounded-3xl mt-4 overflow-hidden"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text type="secondary">23</Text>
        <Button type="text" icon={<CommentOutlined />}>
          6 comments
        </Button>
        <Button type="text" icon={<ShareAltOutlined />}>
          Share
        </Button>
      </div>
    </Card>
  );
};

export default FeedCard;
