import React, { useState, useCallback, memo } from 'react';
import {
    Modal,
    Avatar,
    Input,
    Button,
    Skeleton,
    Typography,
    Divider,
    Space,
    Dropdown
} from 'antd';
import {
    SendOutlined,
    HeartOutlined,
    HeartFilled,
    MessageOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { message } from 'antd';

import {
    useGetReviewerCommentsQuery,
    useCreateCommentMutation,
    usePostCommentLikesMutation,
    useDeleteCommentMutation,
} from '../../../Redux/sampler/reviewApis';
import CommentItem from './CommentItem';

const { Text } = Typography;

const CommentsModal = ({ visible, onClose, post }) => {
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [limit, setLimit] = useState(10);

    const {
        data: commentsData,
        isLoading: commentsLoading,
        refetch
    } = useGetReviewerCommentsQuery({
        id: post?._id,
        limit,
    }, {
        skip: !post?._id,
        refetchOnMountOrArgChange: true
    });

    const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
    const [postCommentLike] = usePostCommentLikesMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleSubmitComment = useCallback(async () => {
        if (!commentText.trim() || !post?._id) return;

        try {
            await createComment({
                data: {
                    text: commentText,
                    review: post._id,
                    ...(replyingTo && { parent: replyingTo })
                },
            }).unwrap();

            setCommentText('');
            setReplyingTo(null);
            refetch();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }, [commentText, post?._id, replyingTo, createComment, refetch]);

    const handleCommentLike = useCallback(async (commentId) => {
        try {
            await postCommentLike({ id: commentId }).unwrap();
            refetch();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    }, [postCommentLike, refetch]);

    const handleDeleteComment = useCallback(async (commentId) => {
        try {
            await deleteComment({ id: commentId }).unwrap();
            // Refetch comments after successful deletion
            refetch();
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment. Please try again.');
        }
    }, [deleteComment, refetch]);

    const renderSkeleton = () => (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                    <Skeleton.Avatar active size={40} />
                    <div className="flex-1">
                        <Skeleton.Input active style={{ width: 120, marginBottom: 8 }} />
                        <Skeleton.Input active style={{ width: '80%' }} />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Modal
            title={
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-semibold text-lg">Comments</span>
                        <Text type="secondary" className="ml-2">
                            • {post?.totalComments || 0}
                        </Text>
                    </div>
                    <Button type="text" icon={<MoreOutlined />} />
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
            className="comments-modal"
            bodyStyle={{ padding: '24px 0' }}
            destroyOnClose
        >
            {/* Comment Input */}
            <div className="sticky top-0 bg-white z-10 px-6 pb-4">
                <div className="flex gap-3">
                    <Avatar src={post?.reviewer?.profile_image} size={40} />
                    <div className="flex-1">
                        <Input
                            placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onPressEnter={handleSubmitComment}
                            className="rounded-full"
                            suffix={
                                <Button
                                    type="text"
                                    icon={<SendOutlined />}
                                    onClick={handleSubmitComment}
                                    disabled={!commentText.trim() || isCreating}
                                    loading={isCreating}
                                    className="!text-blue-500"
                                />
                            }
                            autoFocus
                        />
                        {replyingTo && (
                            <div className="mt-2 text-sm text-gray-500">
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => setReplyingTo(null)}
                                    className="!px-0"
                                >
                                    Cancel reply
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Divider className="!my-0" />

            {/* Comments List */}
            <div className="px-6 pt-4">
                {commentsLoading ? (
                    renderSkeleton()
                ) : commentsData?.data?.result?.length > 0 ? (
                    <div className="space-y-1">
                        {commentsData.data.result.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                onLike={handleCommentLike}
                                onReply={handleSubmitComment}
                                onDelete={handleDeleteComment}
                                isReplying={replyingTo === comment._id}
                                onStartReply={setReplyingTo}
                                currentUser={{ id: post?.reviewer?._id }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <MessageOutlined className="text-4xl" />
                        </div>
                        <Text type="secondary">No comments yet. Be the first to comment!</Text>
                    </div>
                )}

                {/* Load More */}
                {commentsData?.data?.meta?.hasMore && (
                    <div className="text-center mt-6">
                        <Button
                            type="link"
                            onClick={() => setLimit(prev => prev + 10)}
                            loading={commentsLoading}
                            className="!text-blue-500 font-medium"
                        >
                            Load more comments
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default memo(CommentsModal);