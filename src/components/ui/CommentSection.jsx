import React, { useState } from 'react';
import { Avatar, Typography, Skeleton, Button, Empty } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { convertDate } from '../../Redux/main/server';
import { useGetCommentsRepliesQuery } from '../../Redux/sampler/reviewApis';

const { Text } = Typography;

const CommentSection = ({ comments, loading }) => {
  const [openReplies, setOpenReplies] = useState(null);

  const { data: replies, isLoading: repliesLoading } = useGetCommentsRepliesQuery(
    { id: openReplies },
    { skip: !openReplies }
  );

  // Skeleton loader for comments
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton.Avatar active size="large" />
            <div className="flex flex-col flex-1 gap-2">
              <Skeleton.Input active size="small" style={{ width: '40%' }} />
              <Skeleton.Input active size="small" style={{ width: '100%' }} />
              <div className="flex gap-4">
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {comments?.length > 0 ? comments?.map((comment) => (
        <div key={comment._id} className="flex flex-col gap-2 border-b border-gray-100 pb-3">
          {/* Comment */}
          <div className="flex gap-3">
            <Avatar src={comment.commentorProfileImage} size="large" />
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <Text strong>{comment.commentorName}</Text>
                <Text type="secondary">{convertDate(comment.createdAt)}</Text>
              </div>
              <Text>{comment.text}</Text>
              <div className="flex items-center gap-4 mt-2">
                <Button type="text" size="small" icon={<LikeOutlined />}>
                  {comment.totalLike} Likes
                </Button>
                {comment.totalReplies > 0 && (
                  <Button
                    type="text"
                    size="small"
                    icon={<MessageOutlined />}
                    onClick={() =>
                      setOpenReplies(openReplies === comment._id ? null : comment._id)
                    }
                  >
                    {comment.totalReplies} Replies
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Replies */}
          {openReplies === comment._id && (
            <div className="ml-14 mt-2 flex flex-col gap-2">
              {repliesLoading ? (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: comment.totalReplies }).map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <Skeleton.Avatar size="small" active />
                      <Skeleton.Input active size="small" style={{ width: '80%' }} />
                    </div>
                  ))}
                </div>
              ) : (
                replies?.data?.result?.map((reply) => (
                  <div key={reply?._id} className="flex gap-2 bg-gray-50 p-2 rounded">
                    <Avatar size="small" src={reply?.commentorProfileImage} />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Text strong>{reply?.commentorName}</Text>
                        <Text type="secondary">{convertDate(reply?.createdAt)}</Text>
                      </div>
                      <Text>{reply?.text}</Text>
                      <div className="flex items-center gap-4 mt-2">
                        <Button type="text" size="small" icon={<LikeOutlined />}>
                          {reply?.totalLike} Likes
                        </Button>
                        <Button type="text" size="small" icon={<MessageOutlined />}>
                          {reply?.totalReplies} Replies
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No comments yet" />}
    </div>
  );
};

export default CommentSection;
