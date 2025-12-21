import React, { useState, useCallback } from 'react';
import { Avatar, Typography, Skeleton, Button, Empty, Divider, Space, message } from 'antd';
import { LikeOutlined, MessageOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { convertDate } from '../../Redux/main/server';
import { useGetCommentsRepliesQuery } from '../../Redux/sampler/reviewApis';

const { Text } = Typography;

const CommentSection = ({ comments, loading }) => {
  const [expandedReplies, setExpandedReplies] = useState({});
  const [loadingReplies, setLoadingReplies] = useState({});
  const [repliesData, setRepliesData] = useState({});

  const { refetch: fetchReplies } = useGetCommentsRepliesQuery(
    { id: Object.keys(expandedReplies).find(id => expandedReplies[id]) },
    { 
      skip: !Object.values(expandedReplies).some(Boolean),
      refetchOnMountOrArgChange: true,
    }
  );

  const handleToggleReplies = useCallback(async (commentId) => {
    const isExpanding = !expandedReplies[commentId];
    
    if (isExpanding) {
      setLoadingReplies(prev => ({ ...prev, [commentId]: true }));
      try {
        const { data } = await fetchReplies({ id: commentId });
        if (data?.success) {
          setRepliesData(prev => ({
            ...prev,
            [commentId]: data.data.result || []
          }));
        }
      } catch (error) {
        message.error('Failed to load replies');
      } finally {
        setLoadingReplies(prev => ({ ...prev, [commentId]: false }));
      }
    }
    
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: isExpanding
    }));
  }, [expandedReplies, fetchReplies]);
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
                <Text type="secondary" className="text-xs">
                  {convertDate(comment.createdAt)}
                </Text>
              </div>
              <Text className="text-gray-800">{comment.text}</Text>
              <div className="flex items-center gap-4 mt-2">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<LikeOutlined />}
                  className="text-gray-600 hover:text-blue-500"
                >
                  {comment.totalLike || 0} {comment.totalLike === 1 ? 'Like' : 'Likes'}
                </Button>
                
                {comment.totalReplies > 0 && (
                  <Button
                    type="text"
                    size="small"
                    icon={
                      loadingReplies[comment._id] ? null : 
                      expandedReplies[comment._id] ? <UpOutlined /> : <DownOutlined />
                    }
                    loading={loadingReplies[comment._id]}
                    onClick={() => handleToggleReplies(comment._id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
                  >
                    {comment.totalReplies} {comment.totalReplies === 1 ? 'Reply' : 'Replies'}
                    {expandedReplies[comment._id] ? ' (Hide)' : ''}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Replies Section */}
          {expandedReplies[comment._id] && (
            <div className="ml-14 mt-2">
              <Divider className="my-2" />
              
              {loadingReplies[comment._id] ? (
                <div className="flex flex-col gap-2 pl-2">
                  {Array.from({ length: Math.min(3, comment.totalReplies) }).map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Skeleton.Avatar size="small" active />
                      <Skeleton.Input 
                        active 
                        size="small" 
                        style={{ 
                          width: ['80%', '70%', '90%'][i % 3],
                          height: '16px'
                        }} 
                      />
                    </div>
                  ))}
                </div>
              ) : repliesData[comment._id]?.length > 0 ? (
                <div className="space-y-3">
                  {repliesData[comment._id].map((reply) => (
                    <div 
                      key={reply?._id} 
                      className="flex gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Avatar 
                        size="small" 
                        src={reply?.commentorProfileImage} 
                        className="flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Text strong className="text-sm">{reply?.commentorName}</Text>
                          <Text type="secondary" className="text-xs">
                            {convertDate(reply?.createdAt)}
                          </Text>
                        </div>
                        <Text className="text-sm text-gray-800">{reply?.text}</Text>
                        <div className="flex items-center gap-4 mt-1">
                          <Button 
                            type="text" 
                            size="small" 
                            icon={<LikeOutlined />} 
                            className="text-xs text-gray-500 hover:text-blue-500"
                          >
                            {reply?.totalLike || 0} {reply?.totalLike === 1 ? 'Like' : 'Likes'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2">
                  <Text type="secondary" className="text-sm">No replies yet</Text>
                </div>
              )}
            </div>
          )}
        </div>
      )) : (
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={
            <Text type="secondary">No comments yet. Be the first to comment!</Text>
          }
          className="py-8"
        />
      )}
    </div>
  );
};

export default CommentSection;
